// backend/src/routes/taskRoutes.ts
import { Router } from "express";
import * as taskController from "../controllers/taskController";

const router = Router();

// Health check
router.get("/health", taskController.healthCheck);

// Get 5 most recent tasks
router.get("/tasks", taskController.getTasks);

// Get a single task by ID
router.get("/tasks/:id", taskController.getTaskById);

// Create a new task
router.post("/tasks", taskController.createTask);

// Mark task as completed
router.patch("/tasks/:id/complete", taskController.completeTask);

export default router;
