import pool from '../database/connection';
import { Task, CreateTaskRequest, TaskResponse } from '../types/task';

export class TaskModel {
  static async getRecentTasks(limit: number = 5): Promise<TaskResponse[]> {
    const query = `
      SELECT id, title, description, completed, created_at
      FROM tasks 
      WHERE completed = false 
      ORDER BY created_at DESC 
      LIMIT $1
    `;
    
    const result = await pool.query(query, [limit]);
    return result.rows.map(row => ({
      ...row,
      created_at: row.created_at.toISOString()
    }));
  }

  static async createTask(taskData: CreateTaskRequest): Promise<TaskResponse> {
    const query = `
      INSERT INTO tasks (title, description, completed, created_at)
      VALUES ($1, $2, false, NOW())
      RETURNING id, title, description, completed, created_at
    `;
    
    const result = await pool.query(query, [taskData.title, taskData.description]);
    const task = result.rows[0];
    
    return {
      ...task,
      created_at: task.created_at.toISOString()
    };
  }

  static async completeTask(id: number): Promise<boolean> {
    const query = `
      UPDATE tasks 
      SET completed = true 
      WHERE id = $1 AND completed = false
      RETURNING id
    `;
    
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }

  static async getTaskById(id: number): Promise<TaskResponse | null> {
    const query = `
      SELECT id, title, description, completed, created_at
      FROM tasks 
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return null;
    
    const task = result.rows[0];
    return {
      ...task,
      created_at: task.created_at.toISOString()
    };
  }
}