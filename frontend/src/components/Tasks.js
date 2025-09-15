import React, { useState, useEffect } from "react";
import API from "../services/api";

function Tasks({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();
    if (!content) return;
    try {
      const res = await API.post("/tasks", { content });
      setTasks([...tasks, res.data]);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle task
  const toggleTask = async (id, completed) => {
    try {
      const res = await API.put(`/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>My To-Do List</h2>
      <button onClick={onLogout}>Logout</button>
      <form onSubmit={addTask}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              className={task.completed ? "completed" : ""}
              onClick={() => toggleTask(task._id, task.completed)}
            >
              {task.content}
            </span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
