import { Task, CreateTaskRequest, ApiResponse } from '../types/task';

// Mock data for demo purposes since backend is not running
const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Buy books',
    description: 'Buy books for next school year',
    completed: false,
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 2,
    title: 'Clean home',
    description: 'Need to clean the bed room',
    completed: false,
    created_at: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 3,
    title: 'Takehome assignment',
    description: 'Finish the mid-term assignment',
    completed: false,
    created_at: new Date(Date.now() - 900000).toISOString()
  },
  {
    id: 4,
    title: 'Play Cricket',
    description: 'Play the soft ball cricket match on next Sunday',
    completed: false,
    created_at: new Date(Date.now() - 600000).toISOString()
  },
  {
    id: 5,
    title: 'Help Saman',
    description: 'Saman need help with his software project',
    completed: false,
    created_at: new Date(Date.now() - 300000).toISOString()
  }
];

let taskIdCounter = 6;
let currentTasks = [...mockTasks];

class ApiService {
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getTasks(): Promise<Task[]> {
    await this.delay(300); // Simulate network delay
    return currentTasks.filter(task => !task.completed).slice(0, 5);
  }

  async createTask(task: CreateTaskRequest): Promise<Task> {
    await this.delay(500); // Simulate network delay
    
    const newTask: Task = {
      id: taskIdCounter++,
      title: task.title,
      description: task.description,
      completed: false,
      created_at: new Date().toISOString()
    };
    
    currentTasks.unshift(newTask);
    return newTask;
  }

  async completeTask(id: number): Promise<void> {
    await this.delay(300); // Simulate network delay
    
    const taskIndex = currentTasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      currentTasks[taskIndex].completed = true;
    }
  }
}

export const apiService = new ApiService();