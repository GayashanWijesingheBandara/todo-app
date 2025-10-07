import React from "react";
import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow flex justify-between items-center">
      <div>
        <h3 className="text-md font-semibold">{task.title}</h3>
        {task.description && (
          <p className="text-gray-600 text-sm">{task.description}</p>
        )}
        <p className="text-xs text-gray-400">
          Created: {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>

      {!task.completed && (
        <button
          onClick={() => onComplete(task.id)}
          className="px-4 py-1 border rounded-lg hover:bg-gray-200"
        >
          Done
        </button>
      )}
    </div>
  );
};

export default TaskCard;
