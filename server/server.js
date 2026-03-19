import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import gameRoutes from "./routes/games.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { connectDb } from "./lib/connectDb.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  if (!req.url.startsWith("/api")) {
    return next();
  }

  try {
    await connectDb();
    next();
  } catch (err) {
    console.error("Database connection failed:", err.message);
    res.status(500).json({
      message: "Database connection failed",
      error: err.message,
    });
  }
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/games", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/*", (req, res) => {
  res.status(404).json({ message: `API route not found: ${req.originalUrl}` });
});

const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  const indexPath = path.join(distPath, "index.html");
  res.sendFile(indexPath);
});

if (process.env.NODE_ENV !== "production") {
  connectDb()
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err.message))
    .finally(() => {
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    });
}

export default app;
