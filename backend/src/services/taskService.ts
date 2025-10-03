// backend/src/services/taskService.ts
import pool from "../config/database";
import { Task, NewTask } from "../types/task";

// Get 5 most recent tasks
export const getRecentTasks = async (): Promise<Task[]> => {
  const query = `
    SELECT id, title, description, completed, created_at AS "createdAt", completed_at AS "completedAt"
    FROM task
    WHERE completed = false
    ORDER BY created_at DESC
    LIMIT 5
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// Get a task by ID
export const getTaskById = async (id: number): Promise<Task | null> => {
  const query = `
    SELECT id, title, description, completed, created_at AS "createdAt", completed_at AS "completedAt"
    FROM task
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};

// Create a new task
export const createTask = async (data: NewTask): Promise<Task> => {
  const query = `
    INSERT INTO task (title, description)
    VALUES ($1, $2)
    RETURNING id, title, description, completed, created_at AS "createdAt", completed_at AS "completedAt"
  `;
  const { rows } = await pool.query(query, [data.title, data.description || null]);
  return rows[0];
};

// Mark task as completed
export const markTaskCompleted = async (id: number): Promise<Task | null> => {
  const query = `
    UPDATE task
    SET completed = true, completed_at = NOW()
    WHERE id = $1
    RETURNING id, title, description, completed, created_at AS "createdAt", completed_at AS "completedAt"
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};

// Simple DB health check
export const checkDatabaseConnection = async (): Promise<string> => {
  try {
    await pool.query("SELECT 1");
    return "connected";
  } catch (error) {
    return "disconnected";
  }
};
