"use client";

import { useState } from "react";
import { useTask } from "../context/TaskContext";

export default function TaskForm() {
  const [text, setText] = useState("");
  const { addTask } = useTask();

  const handleAdd = () => {
    addTask(text);
    setText("");
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
        onClick={handleAdd}
        className="bg-blue-500 text-white px-3 rounded"
      >
        Add
      </button>
    </div>
  );
}
