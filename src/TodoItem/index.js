import React, { useState } from 'react';
import {
    Card, CardText, CardBody, CardFooter,
    CardTitle, Button
} from 'reactstrap';

import "./TodoItem.css"

const TodoItem = ({ todo, setTodosList, todosList }) => {
    console.log(todo)
    const [status, setStatus] = useState(false);
    const getButtonText = () => status ? 'Mark as NOT done' : "Mark as done";
    const markAsDone = (event) => {
        setStatus(!status);
        event.target.parentElement.parentElement.classList.toggle("done");
    }

    const deleteTodo = () => {
        setTodosList(todosList.filter(todoItem => todoItem.title !== todo.title))
    }

    return (
        <>
            <Card className={`todo ${todo.category}`}>
                <CardBody>
                    <CardTitle className="title">{todo.task}</CardTitle>
                    <CardText>Category: {todo.category}</CardText>
                    <CardText className="hight">Priority: {todo.priority}</CardText>
                    <Button color="success custom-btn" onClick={markAsDone}>{getButtonText()}</Button>
                    {/* <Button color="info">Edit</Button> */}
                    <Button color="danger custom-btn" onClick={deleteTodo}>Delete</Button>

                </CardBody>
                <CardFooter>{todo.deadline}</CardFooter>
            </Card>
        </>
    );
};

export default TodoItem;