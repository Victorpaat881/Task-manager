"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Task } from "../types/task";

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  filter: string;
  setFilter: (filter: string) => void;
  remainingTasks: number;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");

  // Ambil data
  const fetchTasks = async () => {
    const res = await fetch("/api");
    const data: Task[] = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
    };

    loadTasks();
  }, []);

  // Tambah task
  const addTask = async (text: string) => {
    if (!text) return;

    await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    fetchTasks();
  };

  // Toggle
  const toggleTask = async (task: Task) => {
    await fetch("/api", {
      method: "PUT",
      body: JSON.stringify({
        id: task.id,
        completed: !task.completed,
      }),
    });

    fetchTasks();
  };

  // Delete
  const deleteTask = async (id: number) => {
    await fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    fetchTasks();
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const remainingTasks = tasks.filter((t) => !t.completed).length;

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        toggleTask,
        deleteTask,
        filter,
        setFilter,
        remainingTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used inside TaskProvider");
  return context;
};
