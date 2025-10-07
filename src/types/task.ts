export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string[];
}