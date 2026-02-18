import { createContext, useContext, useEffect, useState } from "react";
import { loadData, saveData } from "../utils/storage";

const TaskContext = createContext();

const defaultBoard = {
  todo: [],
  doing: [],
  done: [],
};

export const TaskProvider = ({ children }) => {
  const [board, setBoard] = useState(() =>
    loadData("board", defaultBoard)
  );

  const [logs, setLogs] = useState(() =>
    loadData("logs", [])
  );

  useEffect(() => saveData("board", board), [board]);
  useEffect(() => saveData("logs", logs), [logs]);

  const addLog = (msg) => {
    setLogs((prev) => [msg, ...prev.slice(0, 9)]);
  };

  const addTask = (col, task) => {
    setBoard((p) => ({
      ...p,
      [col]: [...p[col], task],
    }));
    addLog("Task created");
  };
  
  const editTask = (col, updatedTask) => {
  setBoard((p) => ({
    ...p,
    [col]: p[col].map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    ),
  }));

  addLog("Task edited");
};

  const deleteTask = (col, id) => {
  if (!confirm("Delete task?")) return;

  setBoard((p) => ({
    ...p,
    [col]: p[col].filter((t) => t.id !== id),
  }));

  addLog("Task deleted");
};


  const moveTask = (from, to, task) => {
    deleteTask(from, task.id);
    addTask(to, task);
    addLog("Task moved");
  };

  const resetBoard = () => {
    if (confirm("Reset board?")) {
      setBoard(defaultBoard);
      setLogs([]);
    }
  };

  return (
    <TaskContext.Provider
      value={{ board, addTask, deleteTask, moveTask, editTask, logs, resetBoard }}

    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
