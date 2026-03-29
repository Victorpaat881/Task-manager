"use client";

export default function TaskItem({ task, fetchTasks }) {
  const toggleTask = async () => {
    await fetch("/api", {
      method: "PUT",
      body: JSON.stringify({
        id: task.id,
        completed: !task.completed,
      }),
    });

    fetchTasks();
  };

  const deleteTask = async () => {
    await fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({ id: task.id }),
    });

    fetchTasks();
  };

  return (
    <li className="flex justify-between items-center mb-2 p-2 rounded hover:bg-gray-100 transition">
      <span
        onClick={toggleTask}
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.text}
      </span>

      <button
        onClick={deleteTask}
        className="text-red-500 hover:text-red-700 transition"
      >
        X
      </button>
    </li>
  );
}
