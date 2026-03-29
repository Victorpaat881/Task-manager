"use client";

import TaskItem from "./TaskItem";

export default function TaskList({ tasks, fetchTasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
    </ul>
  );
}
