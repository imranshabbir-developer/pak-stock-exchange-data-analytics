import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 sm:mb-6 gap-3 sm:gap-2">
            <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 shrink-0" />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">404 Page Not Found</h1>
            </div>
          </div>

          <p className="mt-4 text-sm sm:text-base text-muted-foreground text-center sm:text-left mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
