export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}