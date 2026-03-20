import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import gameRoutes from "./routes/games.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API Routes
app.use("/api/games", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Specific 404 for API routes to avoid falling through to index.html
app.use("/api/*", (req, res) => {
    res.status(404).json({ message: `API route not found: ${req.originalUrl}` });
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve frontend in production
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// Catch-all route to serve index.html for React Router
app.get("*", (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    res.sendFile(indexPath);
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// Start server conditionally (for local development)
// Vercel serverless functions do not use app.listen()
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

// Export the Express API for Vercel serverless execution
export default app;
