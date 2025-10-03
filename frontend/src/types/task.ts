export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface NewTask {
  title: string;
  description?: string;
}
