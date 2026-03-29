"use client";

import { useState } from "react";

export default function TaskForm({ fetchTasks }) {
  const [text, setText] = useState("");

  const addTask = async () => {
    if (!text) return;

    await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchTasks();
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tambah task..."
      />

      <button
        onClick={addTask}
        className="bg-blue-500 hover:bg-blue-600 transition text-white px-3 rounded"
      >
        Add
      </button>
    </div>
  );
}
