"use client";

import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white shadow-lg shadow-slate-700 dark:bg-black p-6 rounded-xl w-96">
        <h1 className="text-xl font-bold mb-4">Task Manager</h1>

        <TaskForm fetchTasks={fetchTasks} />

        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
}
