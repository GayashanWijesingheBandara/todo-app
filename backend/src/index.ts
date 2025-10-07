// import express from "express";

// const app = express();
// app.use(express.json());

// app.get("/api/health", (req, res) => {
//   res.json({ status: "ok" });
// });

// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });




// backend/src/index.ts
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Health check root endpoint
app.get("/", (_req: Request, res: Response) => {
  res.send({ message: "To-Do App Backend is running!" });
});

// Task API routes
app.use("/api", taskRoutes);

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
