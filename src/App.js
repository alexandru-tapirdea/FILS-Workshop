import './App.css';
import AddTodoForm from "./AddTodoForm"
import TodoList from './TodoList';
import React, { useState } from "react"
const data = [
  {
    title: "Test",
    category: "University",
    deadline: "2020-10-03"
  },
  {
    title: "Test 2",
    category: "Work",
    deadline: "2020-10-03"
  },
  {
    title: "Test 3",
    category: "Family",
    deadline: "2020-10-03"
  },
  {
    title: "Test 4",
    category: "Sport",
    deadline: "2020-10-03"
  }
];


function App() {
  const [todosList, setTodosList] = useState(data)
  return (
    <div className="app-container">
      <AddTodoForm setTodosList={setTodosList} todosList={todosList} />
      <TodoList todosList={todosList} setTodosList={setTodosList} />
    </div>
  );
}

export default App;
