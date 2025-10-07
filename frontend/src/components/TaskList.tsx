import React from "react";
import { Task } from "../types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete }) => {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={onComplete} />
        ))
      )}
    </div>
  );
};

export default TaskList;
