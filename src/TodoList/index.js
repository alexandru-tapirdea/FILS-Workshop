import React from 'react';
import TodoItem from "../TodoItem"
import "./TodoList.css"


const TodoList = ({ todosList, setTodosList }) => {
    return (
        <div className="list-container">
            {todosList.length > 0 ? todosList.map(todo => <TodoItem key={Math.random()} todo={todo} todosList={todosList} setTodosList={setTodosList} />)
                : <div>Yeeey! Nothing left TO DO !</div>}
        </div >

    );
};

export default TodoList;