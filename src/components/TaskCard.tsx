import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
import { Task } from '../types/task';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => Promise<void>;
  isLoading?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, isLoading = false }) => {
  const handleComplete = async () => {
    try {
      await onComplete(task.id);
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full bg-gray-100 hover:bg-gray-50 transition-colors">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate mb-1">
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {task.description}
            </p>
            <p className="text-xs text-gray-500">
              Created: {formatDate(task.created_at)}
            </p>
          </div>
          <Button
            onClick={handleComplete}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="shrink-0 bg-white hover:bg-gray-50 border-gray-300"
          >
            {isLoading ? 'Completing...' : 'Done'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};