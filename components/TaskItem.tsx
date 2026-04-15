"use client";

import { Task } from "../types/task";
import { useTask } from "../context/TaskContext";

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const { toggleTask, deleteTask } = useTask();

  return (
    <li className="flex justify-between items-center mb-2 p-2 rounded hover:bg-gray-100 transition">
      <span
        onClick={() => toggleTask(task)}
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-400" : "hover:text-blue-500"
        }`}
      >
        {task.text}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:scale-110 transition"
      >
        X
      </button>
    </li>
  );
}
