import { useState } from "react";
import TaskItem from "./TaskItem";

export default function TodoList({ tasks, onToggle, onAdd }) {
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("Personal");

  const handleAdd = () => {
    if (newTask.trim() !== "") {
      onAdd(newTask, newCategory);
      setNewTask("");
    }
  };

  return (
  <div>
  <div className="flex gap-3 mb-6">
    <input
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      placeholder="Add new task"
      className="border border-gray-400 rounded-md px-3 py-2 flex-grow text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
    />
    <select
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
      className="border border-gray-400 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
    >
      <option value="Personal">Personal</option>
      <option value="Work">Work</option>
       <option value="Learning">Learning</option>
      <option value="Others">Others</option>
    </select>
    <button
      onClick={handleAdd}
      className="bg-gray-800 text-white rounded-md px-4 py-2 hover:bg-gray-800 transition"
      aria-label="Add task"
    >
      ➕
    </button>
  </div>

  <div className="space-y-3">
    {tasks.map((task) => (
      <TaskItem key={task.id} task={task} onToggle={onToggle} />
    ))}
  </div>
</div>

  );
}
