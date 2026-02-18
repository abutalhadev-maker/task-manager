# Task Board Application

## 🚀 Live Demo
[Add your deployed URL here]

## 📌 Objective
A Task Board application with static authentication, task management, drag & drop functionality, and local storage persistence.

---

## ✨ Features

### Authentication
- Static login (intern@demo.com / intern123)
- Remember me functionality
- Protected routes
- Logout support

### Task Board
- Fixed columns: Todo, Doing, Done
- Create / Edit / Delete tasks
- Drag and drop tasks between columns
- Search tasks by title
- Filter by priority
- Sort by due date
- Reset board option

### Persistence
- Data stored in localStorage
- Safe handling of missing data
- State persists across refresh

### Activity Log
- Track task created
- Track task edited
- Track task moved
- Track task deleted

---

## 🛠 Tech Stack
- React (Vite)
- React Router
- Context API (State Management)
- React Beautiful DnD
- LocalStorage

---

## 🧠 Architecture Decisions

### State Management
Used Context API to manage authentication and board state globally.

### Storage
localStorage used for persistence without backend.

### Component Design
Reusable components:
- TaskCard
- Column
- ActivityLog

---

## ⚙️ Setup Instructions

```bash
git clone <repo-url>
cd task-board
npm install
npm run dev


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
