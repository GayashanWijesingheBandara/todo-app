import React from 'react';
import { TaskCard } from './TaskCard';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (id: number) => Promise<void>;
  isLoading?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onCompleteTask, 
  isLoading = false 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="w-full max-w-md">
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No tasks yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Create your first task to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Tasks ({tasks.length}/5)
      </h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onCompleteTask}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};