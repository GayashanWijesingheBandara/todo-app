// backend/src/controllers/taskController.ts
import { Request, Response } from "express";
import * as taskService from "../services/taskService";

// Get 5 most recent tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getRecentTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const task = await taskService.getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTask = await taskService.createTask({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mark task as completed
export const completeTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedTask = await taskService.markTaskCompleted(id);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error completing task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Health check endpoint
export const healthCheck = async (_req: Request, res: Response) => {
  try {
    const dbStatus = await taskService.checkDatabaseConnection();
    res.status(200).json({ status: "ok", database: dbStatus });
  } catch (error) {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
};
