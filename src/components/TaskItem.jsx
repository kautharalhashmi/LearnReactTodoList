export default function TaskItem({ task, onToggle }) {
  return (
   <div
  className={`flex justify-between items-center border rounded p-3 transition-colors duration-200 ${
    task.done
      ? "bg-gray-800 text-gray-400 line-through border-gray-700"
      : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
  }`}
>
  <span>
    {task.text}{" "}
    <span className="text-xs text-gray-500 font-light">({task.category})</span>
  </span>
  <button
    onClick={() => onToggle(task.id)}
    className={`text-sm text-pink-400 font-semibold transition-colors duration-200 ${
      task.done ? "text-yellow-400 hover:text-yellow-300" : "text-pink-600 hover:text-pink-500"
    }`}
  >
    {task.done ? "Undo" : "Done"}
  </button>
</div>

  );
}
