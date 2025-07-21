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

### App.jsx 

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
```
