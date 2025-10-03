import { Task, NewTask } from "../types/task";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Fetch 5 most recent tasks
export const getRecentTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

// Create new task
export const createTask = async (task: NewTask): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
};

// Mark task complete
export const markTaskCompleted = async (id: number): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Failed to complete task");
  return response.json();
};
