export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
  <div className="mb-6 flex gap-2 flex-wrap">
  {categories.map(cat => (
    <button
      key={cat}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition duration-200 ${
        selected === cat
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
      }`}
      onClick={() => onSelect(cat)}
    >
      {cat}
    </button>
  ))}
</div>

  );
}
