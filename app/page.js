"use client";

import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    const res = await fetch("/api");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white shadow-lg shadow-slate-700 dark:bg-black p-6 rounded-xl w-96">
        <h1 className="text-xl font-bold mb-4">Task Manager</h1>

        <TaskForm fetchTasks={fetchTasks} />

        <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <span>{remainingTasks} tasks remaining</span>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className="hover:text-blue-500"
            >
              All
            </button>

            <button
              onClick={() => setFilter("active")}
              className="hover:text-blue-500"
            >
              Active
            </button>

            <button
              onClick={() => setFilter("completed")}
              className="hover:text-blue-500"
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
