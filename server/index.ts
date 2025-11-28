import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Initialize the app asynchronously
let appInitialized = false;
let initPromise: Promise<void> | null = null;

async function initializeApp() {
  if (appInitialized) return;
  if (initPromise) return initPromise;
  
  initPromise = (async () => {
    appInitialized = true;

    await registerRoutes(httpServer, app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      // Log error for debugging (don't expose sensitive info in production)
      if (process.env.NODE_ENV === "production") {
        log(`Error ${status}: ${message}`, "error");
      } else {
        log(`Error ${status}: ${message}`, "error");
        console.error(err);
      }

      res.status(status).json({ 
        message: process.env.NODE_ENV === "production" 
          ? "An error occurred" 
          : message 
      });
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }
  })();
  
  return initPromise;
}

// Only start the server if not on Vercel
// Vercel will handle the serverless function invocation
if (!process.env.VERCEL) {
  (async () => {
    await initializeApp();

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || "5000", 10);
    
    // Use cross-platform compatible listen syntax
    // Windows doesn't support reusePort option or binding to 0.0.0.0 with options object
    // Using simple port binding works on all platforms and binds to all interfaces
    httpServer.listen(port, () => {
      log(`serving on http://localhost:${port}`);
    });

    // Handle server errors
    httpServer.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        log(`Port ${port} is already in use`, "error");
        process.exit(1);
      } else {
        log(`Server error: ${err.message}`, "error");
        throw err;
      }
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      log('SIGTERM received, shutting down gracefully');
      httpServer.close(() => {
        log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      log('SIGINT received, shutting down gracefully');
      httpServer.close(() => {
        log('Server closed');
        process.exit(0);
      });
    });
  })();
} else {
  // On Vercel, initialize the app but don't start the server
  initializeApp().catch(console.error);
}

// Export app for Vercel serverless functions (after initialization setup)
export { app };
