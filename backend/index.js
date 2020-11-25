const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');

const app = express();
//app == our express app and use diffrient methoeds by express 
const port = 3000;

//Cors origin resource sharing 
//iti permite sau nu, aceseara domeniul tau de pe alt domeniu 
//si pentru porturi diferite
//why using cors ? 
//security / for safety / because it's external api 
app.use(cors());

app.use(bodyParser.json());

//explain what dose bodyparse and urlencoded do with postman  and why we are using it 
app.use(bodyParser.urlencoded({ extended: true }));

//explain about async await and why we are using it 

const readFromFile = async (todo) => {
    try {
        const data = await fs.promises.readFile(todo);
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }

}

const writeFile = async (filePath, dataToWrite) => {
    try {
        const data = await fs.promises.writeFile(filePath, JSON.stringify(dataToWrite, null, 2));
        return data;
    }
    catch (error) {
        throw error;
    }
}

const readFromTodos = async (filename) => {
    const readFile = await fs.promises.readFile(filename);
    return JSON.parse(readFile);
}
app.get("/todos/getAll", async (req, res) => {
    try {
        const getAllTodos = await readFromTodos('todos.json');
        return res.json(getAllTodos)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/todos/getAll", async (req, res) => {
    const todosList = await readFromFile('todos.json');
    res.json(todosList);
});

app.post("/todos/createTodo", async (req, res) => {
    let todoIds = uuidv4();
    const todosList = await readFromFile('todos.json');

    if (!req.body.title || !req.body.deadline || !req.body.priority || !req.body.category) {
        return res.status(400).send({
            error: "Please complete all fields!"
        });
    }
    const toDo = {
        id: todoIds,
        title: req.body.title,
        deadline: req.body.deadline,
        priority: req.body.priority,
        category: req.body.category,
        isCompleted: false
    }

    todosList.push(toDo);
    writeFile('todos.json', todosList);

    res.status(201).send(todosList);
});

app.put("/todos/setstatus/:id", async (req, res) => {
    const todosList = await readFromFile('todos.json');


    const filterTodo = todosList.findIndex(todo => todo.id === req.params.id);


    if (filterTodo === -1) {
        res.status(404).send({
            error: "ToDo Not found!"
        });
    }
    if (todosList[filterTodo].isCompleted === false) {
        todosList[filterTodo].isCompleted = true;
    } else {
        todosList[filterTodo].isCompleted = false;
    }

    await writeFile('todos.json', todosList);

    res.status(200).send(todosList[filterTodo]);
})

app.delete("/todos/delete/:id", async (req, res) => {
    try {
        const todosList = await readFromFile('todos.json');

        let found = todosList.find((todo) => todo.id === req.params.id);

        if (!found) {
            res.status(404).send({
                error: "ToDo Not found!"
            });
        }

        const arrayWithoutDeletedTodo = todosList.filter(todo => todo.id !== req.params.id);
        await writeFile('todos.json', arrayWithoutDeletedTodo);

        res.status(200).send(found);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);