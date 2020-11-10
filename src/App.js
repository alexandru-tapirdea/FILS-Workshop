import './App.css';
import AddTodoForm from "./AddTodoForm"
import TodoList from './TodoList';
import React, { useEffect, useState } from "react";
// const data = [
//   //   {
//   //     title: "Test",
//   //     category: "University",
//   //     deadline: "2020-10-03"
//   //   },
//   //   {
//   //     title: "Test 2",
//   //     category: "Work",
//   //     deadline: "2020-10-03"
//   //   },
//   //   {
//   //     title: "Test 3",
//   //     category: "Family",
//   //     deadline: "2020-10-03"
//   //   },
//   //   {
//   //     title: "Test 4",
//   //     category: "Sport",
//   //     deadline: "2020-10-03"
//   //   }
// ];


function App() {
  const [todosList, setTodosList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/task/getAll", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      // console.log(await response.json())
      const data = await response.json();
      setTodosList(data);
    }

    fetchData();
  }, [])


  return (
    <div className="app-container">
      <AddTodoForm setTodosList={setTodosList} todosList={todosList} />
      <TodoList todosList={todosList} setTodosList={setTodosList} />
    </div>
  );
}

export default App;
