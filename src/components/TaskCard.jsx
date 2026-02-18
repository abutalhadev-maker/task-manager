export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div style={{ border: "1px solid gray", margin: 8, padding: 8 }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      <small>Priority: {task.priority}</small>
      <br />

      <small>Due: {task.dueDate || "No date"}</small>

      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
