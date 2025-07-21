export default function Navbar() {
  return (
<nav className="bg-gray-800 px-6 py-4 shadow-lg flex items-center justify-between">
  <div className="text-white text-2xl font-bold tracking-tight">
    My To-Do List
  </div>
  <div className="hidden sm:flex space-x-6 text-white text-sm font-medium">
    <a href="#" className="hover:text-gray-400 transition duration-200">Home</a>
    <a href="#" className="hover:text-gray-400 transition duration-200">About</a>
  </div>
</nav>


  );
}
