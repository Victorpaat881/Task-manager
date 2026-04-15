"use client";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useTask } from "../context/TaskContext";

export default function Home() {
  const { filter, setFilter, remainingTasks } = useTask();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h1 className="text-xl font-bold mb-4">Task Manager</h1>

        <TaskForm />

        <div className="flex justify-between items-center mb-3 text-sm">
          <span>{remainingTasks} tasks remaining</span>

          <div className="flex gap-2">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 rounded ${
                  filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <TaskList />
      </div>
    </div>
  );
}
