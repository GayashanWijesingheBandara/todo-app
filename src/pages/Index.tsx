import React, { useState, useEffect, useCallback } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { Task, CreateTaskRequest } from '../types/task';
import { apiService } from '../services/api';
// import { useToast } from './hooks/use-toast';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
// import { Button } from './ui/button';
// import { Alert, AlertDescription } from './ui/alert';
import { useToast } from '../hooks/use-toast';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const fetchedTasks = await apiService.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks';
      setError(errorMessage);
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (taskData: CreateTaskRequest) => {
    setIsCreating(true);
    try {
      const newTask = await apiService.createTask(taskData);
      setTasks(prevTasks => [newTask, ...prevTasks.slice(0, 4)]);
      toast({
        title: "Success",
        description: "Task created successfully!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create task';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const handleCompleteTask = async (id: number) => {
    setIsCompleting(true);
    try {
      await apiService.completeTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      toast({
        title: "Success",
        description: "Task completed successfully!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete task';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    fetchTasks();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-md w-full space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          <Button onClick={handleRetry} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Todo Application
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently and stay organized
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex-shrink-0">
            <TaskForm 
              onSubmit={handleCreateTask} 
              isLoading={isCreating}
            />
          </div>
          
          <div className="flex-shrink-0">
            <TaskList 
              tasks={tasks} 
              onCompleteTask={handleCompleteTask}
              isLoading={isCompleting}
            />
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Full Stack Todo Application - @Gayashan</p>
        </footer>
      </div>
    </div>
  );
}