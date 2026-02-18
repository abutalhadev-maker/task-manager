import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, initialData, onCancel }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    tags: "",
  });

  // for edit mode
  useEffect(() => {
    if (initialData) setTask(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!task.title.trim()) {
    alert("Title is required");
    return;
  }

  onSubmit({
    ...task,
    id: initialData?.id || crypto.randomUUID(),
    tags: task.tags.split(",").map((t) => t.trim()),
    createdAt: initialData?.createdAt || new Date(),
  });
};


  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid gray",
        padding: 12,
        marginBottom: 20,
      }}
    >
      <h3>{initialData ? "Edit Task" : "Create Task"}</h3>

      {/* Title */}
      <input
        name="title"
        placeholder="Title (required)"
        value={task.title}
        onChange={handleChange}
      />
      <br />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />
      <br />

      {/* Priority */}
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <br />

      {/* Due Date */}
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <br />

      {/* Tags */}
      <input
        name="tags"
        placeholder="tags (comma separated)"
        value={task.tags}
        onChange={handleChange}
      />
      <br />

      <button type="submit">
        {initialData ? "Update Task" : "Add Task"}
      </button>

      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
