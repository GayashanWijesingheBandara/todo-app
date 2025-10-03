import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Task, NewTask } from "./types/task";
import { getRecentTasks, createTask, markTaskCompleted } from "./services/api";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const data = await getRecentTasks();
      setTasks(data.slice(0, 5)); // show only 5
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (task: NewTask) => {
    const newTask = await createTask(task);
    setTasks((prev) => [newTask, ...prev].slice(0, 5));
  };

  const handleCompleteTask = async (id: number) => {
    const updatedTask = await markTaskCompleted(id);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedTask } : t))
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-2">Todo Application</h1>
      <p className="text-gray-600 mb-8">
        Manage your tasks efficiently and stay organized
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Left Side - Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Right Side - Recent Tasks */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            Recent Tasks ({tasks.length}/5)
          </h2>
          <TaskList tasks={tasks} onComplete={handleCompleteTask} />
        </div>
      </div>
    </div>
  );
};

export default App;
