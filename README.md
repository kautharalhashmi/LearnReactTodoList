# LearnReactTodoList

### 1- Prerequisites 
###### - HTML, CSS, JavaScript (ES6+) 
###### - Basics of Node.js and npm.

### 2- Install Node.js and npm
```bash
npm create vite@latest my-todolist --template react
cd my-app
npm install
npm run dev

```
###  3- Understand Project Structure
```bash
My-todolist/
├── public/
├── src/
│   ├── App.jsx        # Main component
│   ├── index.js       # Entry point
│   └── components/    # Your custom components Nav, TodoList and CategoryFilter , ...

```

### 5- Learn React Basics
##### Start editing App.jsx or App.js.
##### 📘 Learn these concepts first:
	•	JSX – HTML in JavaScript
	•	Components – Reusable UI pieces
	•	Props – Data passed to components
	•	State – Internal data of components
	•	Events – Clicks, form handling
	•	Hooks – useState, useEffect, etc.

| Concept       | What It Is                        | Example Code                          | Purpose                              |
| ------------- | --------------------------------- | ------------------------------------- | ------------------------------------ |
| **JSX**       | HTML inside JavaScript            | `<h1>Hello</h1>`                      | Build UI with HTML-like syntax       |
| **Component** | Reusable UI block                 | `function Header() { return <h1 /> }` | Create modular, reusable parts       |
| **Props**     | Data passed to components         | `<Greeting name="Alex" />`            | Share data from parent to child      |
| **State**     | Internal data of a component      | `useState(0)`                         | Store and update local values        |
| **Events**    | User interaction (clicks, input)  | `onClick={() => ...}`                 | Handle actions like clicks or typing |
| **Hooks**     | Special functions (e.g. useState) | `useEffect(() => {...}, [])`          | Add logic to functional components   |


## Navbar.jsx

<img width="1191" height="59" alt="Screenshot 2025-07-21 at 1 55 06 PM" src="https://github.com/user-attachments/assets/c5ee9002-bc28-48e2-b9ef-7162b10e7e0e" />

```jsx
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
```



## CategoryFilter.jsx

<img width="1191" height="59" alt="Screenshot 2025-07-21 at 1 53 39 PM" src="https://github.com/user-attachments/assets/8f383d4a-35e8-402f-8360-8b5f4c727528" />

```jsx
// This component displays buttons to filter tasks by category (e.g. All, Work, Personal)
// Props:
// - categories: an array of category names
// - selected: the currently selected category
// - onSelect: function to update the selected category when a button is clicked

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    // A flex container that wraps buttons and adds spacing
    <div className="mb-6 flex gap-2 flex-wrap">
      
      {/* Loop through each category and create a button */}
      {categories.map(cat => (
        <button
          key={cat} // React needs a unique key for each item in a list

          // Use Tailwind CSS classes for styling
          className={`
            px-4 py-1.5         // Padding (left-right and top-bottom)
            rounded-full        // Makes the button pill-shaped
            text-sm font-medium // Small-medium sized text
            transition duration-200 // Smooth transition for hover effect

            // If this button matches the selected category,
            // make it dark with white text. Otherwise, light gray.
            ${selected === cat
              ? "bg-gray-800 text-white"                // Selected button styles
              : "bg-gray-100 text-gray-800 hover:bg-gray-200" // Unselected + hover effect
            }
          `}
          
          // When the button is clicked, call onSelect with this category
          onClick={() => onSelect(cat)}
        >
          {/* Display the category name on the button */}
          {cat}
        </button>
      ))}

    </div>
  );
}


```



## TodoList.jsx


<img width="1191" height="68" alt="Screenshot 2025-07-21 at 2 00 03 PM" src="https://github.com/user-attachments/assets/e9c0cbfe-455b-4e24-96bf-0cc431f5c632" />

```jsx
// Import React's useState hook to manage local input form state
import { useState } from "react";

// Import the TaskItem component to display each individual task
import TaskItem from "./TaskItem";

// Main component that handles the task input form and renders the list of tasks
export default function TodoList({ tasks, onToggle, onAdd }) {

  // Local state to track the text input for the new task
  const [newTask, setNewTask] = useState("");

  // Local state to track the selected category for the new task
  const [newCategory, setNewCategory] = useState("Personal");

  // Function that runs when the ➕ button is clicked
  const handleAdd = () => {
    // Make sure the input is not just empty spaces
    if (newTask.trim() !== "") {
      // Call the onAdd function from the parent (App) with the new task data
      onAdd(newTask, newCategory);

      // Clear the input field after adding the task
      setNewTask("");
    }
  };

  return (
    <div>
      {/* === Add Task Form === */}
      <div className="flex gap-3 mb-6">
        
        {/* Text input for the new task description */}
        <input
          value={newTask} // Controlled input bound to newTask state
          onChange={(e) => setNewTask(e.target.value)} // Update newTask as the user types
          placeholder="Add new task"
          className="border border-gray-400 rounded-md px-3 py-2 flex-grow text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Dropdown to choose a category for the new task */}
        <select
          value={newCategory} // Controlled input bound to newCategory state
          onChange={(e) => setNewCategory(e.target.value)} // Update newCategory on selection
          className="border border-gray-400 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        >
          {/* Options for categories */}
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Learning">Learning</option>
          <option value="Others">Others</option>
        </select>

        {/* Button to add the new task */}
        <button
          onClick={handleAdd} // Calls handleAdd when clicked
          className="bg-gray-800 text-white rounded-md px-4 py-2 hover:bg-gray-800 transition"
          aria-label="Add task"
        >
          ➕
        </button>
      </div>

      {/* === Task List Display === */}
      <div className="space-y-3">
        {/* Loop through tasks and render each one with TaskItem */}
        {tasks.map((task) => (
          <TaskItem 
            key={task.id}       // Unique key for each task (required by React)
            task={task}         // Pass the task object to the TaskItem
            onToggle={onToggle} // Pass the toggle function so TaskItem can mark done/undone
          />
        ))}
      </div>
    </div>
  );
}


```


## TaskItem.jsx

<img width="1191" height="238" alt="Screenshot 2025-07-21 at 1 59 37 PM" src="https://github.com/user-attachments/assets/f6833049-5aa0-4655-98b5-6848dbd387ba" />

```jsx
// This component renders a single task item
// Props:
// - task: an object with properties like text, category, done, id
// - onToggle: function to toggle this task's "done" state

export default function TaskItem({ task, onToggle }) {
  return (
    // Container for the task with dynamic styles based on task.done
    <div
      className={`flex justify-between items-center border rounded p-3 transition-colors duration-200 
        ${
          task.done
            // If task is done: darker background, grayed out text, strikethrough, darker border
            ? "bg-gray-800 text-gray-400 line-through border-gray-700"
            // If not done: white background, normal text, hover effect
            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
        }`}
    >

      {/* Task text and category label */}
      <span>
        {task.text}{" "}
        {/* Show category in lighter, smaller text */}
        <span className="text-xs text-gray-500 font-light">
          ({task.category})
        </span>
      </span>

      {/* Toggle button for marking as done/undo */}
      <button
        onClick={() => onToggle(task.id)} // Calls the toggle function with task ID

        // Change button color based on whether the task is done
        className={`text-sm font-semibold transition-colors duration-200
          ${
            task.done
              ? "text-yellow-400 hover:text-yellow-300" // Yellow for undo
              : "text-pink-600 hover:text-pink-500"     // Pink for done
          }`}
      >
        {/* Button label: shows 'Undo' if done, otherwise 'Done' */}
        {task.done ? "Undo" : "Done"}
      </button>
    </div>
  );
}
```
### App.jsx 
<img width="1191" height="462" alt="Screenshot 2025-07-21 at 2 00 56 PM" src="https://github.com/user-attachments/assets/7ee91748-32b4-457b-b00e-679954ad87e9" />


##### Purpose:
##### Main component where app state is managed and components are composed.
##### the main part of a simple Todo List app using React. It lets users:
	•	Add new tasks with categories
	•	See tasks filtered by category (e.g., Personal, Work)
	•	Mark tasks as done or undone
##### It uses components to organize the app UI and state to keep track of tasks and the selected category.

### Step 1: Imports and Initial Setup
##### React and useState: React is the library we use to build the UI. useState is a hook (special function) that lets us store and update data in our app.
##### We import three child components:
	•	Navbar — usually the top navigation bar.
	•	TodoList — displays the list of tasks.
	•	CategoryFilter — allows filtering tasks by category.
##### Tailwind CSS is imported for styling (not shown here but controls the look of the app).

### Step 2: Initial Data
##### initialTasks is an array of task objects to start with when the app loads.
	•	Each task has:
	•	id — unique number to identify the task
	•	text — description of the task
	•	category — which group the task belongs to
	•	done — whether the task is completed (true/false)
##### categories is an array listing all the filter options users can pick.

### Step 3: The Main App Component
##### App is the main functional component of our React app — think of it as the root container.
```jsx
function App() {} // inside it make yours

```

### Step 4: Managing State with useState
```jsx
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedCategory, setSelectedCategory] = useState("All");
```
#####
	•	tasks holds the current list of tasks. Initially, it’s set to initialTasks.
	•	setTasks is a function to update tasks.
	•	selectedCategory holds the currently selected filter category (default: "All").
	•	setSelectedCategory updates which category is selected.
Why state? React re-renders UI automatically when state changes, so updating these states updates what the user sees.

### Step 5: Adding New Tasks
```jsx
 const addTask = (text, category) => {
    const newTask = {
      id: Date.now(), // generates a unique ID based on the current time
      text,           // the task text passed to the function
      category,       // the chosen category passed to the function
      done: false     // new tasks start as not done
    };
    setTasks([newTask, ...tasks]); // Add new task to the front of the list
  };
```
###### This function lets you add a new task.
###### Date.now() creates a unique ID using the current timestamp.
###### setTasks adds the new task to the beginning of the existing tasks array.
###### The ...tasks syntax copies the old tasks (spread operator) to keep them while adding the new one on top.

### Step 6: Toggling Task Completion
```jsx
  const toggleDone = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };
```
This function switches a task's done status between true and false.
It uses .map() to go through all tasks:

	•	If a task’s id matches the given id, it returns a new task object with the opposite done value.
	•	Otherwise, it returns the task unchanged.
 
This way, the tasks state is updated immutably (without modifying the original array directly).

### Step 7: Filtering Tasks by Category
```jsx
  const filteredTasks = selectedCategory === "All"
    ? tasks
    : tasks.filter(task => task.category === selectedCategory);
```

If the user selects "All", show all tasks.

Otherwise, filter the tasks array to only include tasks matching the selected category.

This filtered list is what will be shown in the TodoList.


### Step 8: Rendering the UI

```jsx
  return (
    <>
      <Navbar />  //shows the navigation bar.
      <div className="p-4 max-w-2xl mx-auto">
        <CategoryFilter 
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
//renders category buttons and allows the user to change the filter.
//categories is the list of filter options.
//onSelect is a callback function to update the selected category.
        <TodoList 
          tasks={filteredTasks}
          onToggle={toggleDone}
          onAdd={addTask}
        />
// shows the list of tasks (filtered).
//tasks is the filtered array.
// onToggle is passed to toggle task completion when clicked.
// onAdd is used to add new tasks.      </div>
    </>
  );
}
```
###
### Step 9: Exporting the Component
```jsx
export default App;
```

