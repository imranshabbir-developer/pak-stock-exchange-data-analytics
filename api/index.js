// Vercel serverless function entry point
// This file is used by Vercel to serve the Express app
const { app } = require('../dist/index.cjs');

// Vercel expects a handler function that receives (req, res)
// The Express app can be used directly as a handler
// The app will auto-initialize when imported (it checks for VERCEL env var)
// Express app is compatible with Vercel's serverless function format
module.exports = app;

