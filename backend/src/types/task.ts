// backend/src/types/task.ts
export interface Task {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: string;
  completedAt?: string | null;
}

export interface NewTask {
  title: string;
  description?: string;
}
