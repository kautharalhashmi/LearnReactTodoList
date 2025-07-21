// Main application component for a Todo List app
// It includes a Navbar, TodoList, and CategoryFilter components
// The app allows users to add tasks, filter by category, and toggle task completion




//Imports React and the useState hook to manage state (tasks and selected category).
//Imports the child components to compose the UI: Navbar, Task list, and Category filter.

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import CategoryFilter from "./components/CategoryFilter";

import './index.css'; // 👈 Import Tailwind CSS here

// Predefined tasks to load when the app starts (used as default state).
const initialTasks = [
  { id: 1, text: "Buy groceries", category: "Personal", done: false },
  { id: 2, text: "Finish React project", category: "Work", done: false },
    { id: 3, text: "Laravel", category: "Learning", done: false },
      { id: 4, text: "Shopping", category: "Others", done: false },
];

// Category options that users can filter by.
const categories = ["All", "Personal", "Work","Learning", "Others"];



// Defines the main functional component App.
function App() {

  // Declares the tasks state to hold the list of tasks, initialized with initialTasks.
  const [tasks, setTasks] = useState(initialTasks);
  // Holds the selected category for filtering tasks, default is "All"
  const [selectedCategory, setSelectedCategory] = useState("All");


  // Function to add a new task. Takes task text and category.
  const addTask = (text, category) => {
    const newTask = {
      id: Date.now(),          // Unique ID based on timestamp
      text,                    // Task description
      category,                // Chosen category
      done: false              // New tasks start as incomplete
    };
    setTasks([newTask, ...tasks]); // Adds the new task to the top of the list
  };

  // Toggles the done status of a task by matching id. Uses map() to return a new array.
  const toggleDone = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };
// Filters the tasks by selected category. If “All” is selected, show all tasks.
  const filteredTasks = selectedCategory === "All"
    ? tasks
    : tasks.filter(task => task.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-2xl mx-auto">
        <CategoryFilter 
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <TodoList 
          tasks={filteredTasks}
          onToggle={toggleDone}
          onAdd={addTask}
        />
      </div>
    </>
  );
}
//Exports the App component so it's used in main.jsx.
export default App;
