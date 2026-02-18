import { DragDropContext } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import ActivityLog from "../components/ActivityLog";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


export default function Dashboard() {
  const { board, addTask, deleteTask, moveTask, editTask, logs, resetBoard } = useTasks();

  const [editingTask, setEditingTask] = useState(null);
const [editingColumn, setEditingColumn] = useState(null);
const [search, setSearch] = useState("");
const [priorityFilter, setPriorityFilter] = useState("");
const [sortDue, setSortDue] = useState(false);


  const { logout } = useAuth();

  const processTasks = (tasks) => {
  let t = [...tasks];

  if (search)
    t = t.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  if (priorityFilter)
    t = t.filter((task) => task.priority === priorityFilter);

  if (sortDue)
    t.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  return t;
};

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const source = result.source.droppableId;
    const dest = result.destination.droppableId;

    const task = board[source][result.source.index];
    moveTask(source, dest, task);
  };

  return (
    <div>
    <div>
      <button onClick={logout}>Logout</button>

      <input
      placeholder="Search by title"
      onChange={(e) => setSearch(e.target.value)}
    />

    <select onChange={(e) => setPriorityFilter(e.target.value)}>
      <option value="">All Priority</option>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>

    <button onClick={() => setSortDue(!sortDue)}>
      Sort by Due Date
    </button>

      <h1>Task Board</h1>

      <button onClick={resetBoard}>Reset Board</button>
      
      <TaskForm
  initialData={editingTask}
  onCancel={() => setEditingTask(null)}
  onSubmit={(task) => {
    if (editingTask) {
      editTask(editingColumn, task);
      setEditingTask(null);
    } else {
      addTask("todo", task);
    }
  }}
/>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: 20 }}>
          {Object.entries(board).map(([col, tasks]) => (
            <Column
  key={col}
  name={col}
  tasks={processTasks(tasks)}
  onDelete={deleteTask}
  setEditingTask={setEditingTask}
  setEditingColumn={setEditingColumn}
/>

          ))}
        </div>
      </DragDropContext>

      <ActivityLog logs={logs} />
    </div>
    </div>
  );
}
