"use client";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  async function fetchTasks() {
    const res = await fetch("https://my-api-production-9f28.up.railway.app/tasks");
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask() {
    if (!title) return;
    await fetch("https://my-api-production-9f28.up.railway.app/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, done: false }),
    });
    setTitle("");
    fetchTasks();
  }

  async function deleteTask(id: number) {
    await fetch(`https://my-api-production-9f28.up.railway.app/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  }

  return (
    <main style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Task Manager</h1>
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          style={{ flex: 1, padding: "8px", color: "black" }}
        />
        <button onClick={addTask} style={{ padding: "8px 16px" }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task: Task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
              borderBottom: "1px solid #333",
            }}
          >
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
  );
}
