const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require('fs');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

const readFromFile = async (tasks) => {
    try {
        const data = await fs.promises.readFile(tasks, 'utf8');
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

app.get("/tasks/getAll", async (req, res) => {
    const readFile = await readFromFile('tasks.json');
    res.json(readFile);
});

app.post("/tasks/createTask", async (req, res) => {
    let itemIds = uuidv4();
    const readFile = await readFromFile('tasks.json');

    if (!req.body.title || !req.body.deadline || !req.body.priority || !req.body.category) {
        return res.status(400).send({
            error: "Please complete all fields!"
        });
    }
    const toDo = {
        id: itemIds,
        title: req.body.title,
        deadline: req.body.deadline,
        priority: req.body.priority,
        category: req.body.category,
    }

    readFile.push(toDo);
    writeFile('tasks.json', readFile)

    res.status(201).send(readFile);
});

app.delete("/tasks/delete/:id", async (req, res) => {
    try {
        const readFile = await readFromFile('tasks.json');

        let found = readFile.find((task) => {
            return task.id === req.params.id
        });
        
        if (!found) {
            res.status(404).send({
                error: "Task Not found!"
            });
        }

        const arrayWithoutDeletedTask = readFile.filter(task => task.id !== req.params.id);
        await writeFile('tasks.json', arrayWithoutDeletedTask);
        
        res.status(200).send(arrayWithoutDeletedTask)
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);