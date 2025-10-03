// backend/src/models/taskModel.ts
import { Task, NewTask } from "../types/task";
import pool from "../config/database";

export async function getAllTasks() {
  const result = await pool.query("SELECT * FROM task ORDER BY created_at DESC LIMIT 5");
  return result.rows;
}


/**
 * TaskModel handles raw database queries related to the `task` table.
 * It's used by the taskService to separate DB logic from business logic.
 */
export const TaskModel = {
  async getRecent(limit = 5): Promise<Task[]> {
    const query = `
      SELECT id, title, description, completed, created_at AS "createdAt", completed_at AS "completedAt"
      FROM task
      WHERE completed = false
      ORDER BY created_at DESC
      LIMIT $1
    `;
    const { rows } = await pool.query(query, [limit]);
    return rows;
  },

  async getById(id: number): Promise<Task | null> {
    const query = `
      SELECT id, title, description, completed, created_at AS "createdAt", completed_at AS "completedAt"
      FROM task
      WHERE id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  },

  async create(task: NewTask): Promise<Task> {
    const query = `
      INSERT INTO task (title, description)
      VALUES ($1, $2)
      RETURNING id, title, description, completed, created_at AS "createdAt", completed_at AS "completedAt"
    `;
    const { rows } = await pool.query(query, [task.title, task.description || null]);
    return rows[0];
  },

  async markCompleted(id: number): Promise<Task | null> {
    const query = `
      UPDATE task
      SET completed = true, completed_at = NOW()
      WHERE id = $1
      RETURNING id, title, description, completed, created_at AS "createdAt", completed_at AS "completedAt"
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }
};
