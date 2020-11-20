const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

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
    const tasksList = await readFromFile('tasks.json');
    res.json(tasksList);
});

app.post("/tasks/createTask", async (req, res) => {
    let itemIds = uuidv4();
    const tasksList = await readFromFile('tasks.json');

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
        isCompleted: false
    }

    tasksList.push(toDo);
    writeFile('tasks.json', tasksList);

    res.status(201).send(tasksList);
});

app.put("/tasks/setstatus/:id", async (req, res) => {
    const tasksList = await readFromFile('tasks.json');


    const filterTask = tasksList.findIndex(task => task.id === req.params.id);


    if (filterTask === -1) {
        res.status(404).send({
            error: "Task Not found!"
        });
    }

    tasksList[filterTask].isCompleted = true;

    await writeFile('tasks.json', tasksList);

    res.status(200).send(tasksList[filterTask]);
})

app.delete("/tasks/delete/:id", async (req, res) => {
    try {
        const tasksList = await readFromFile('tasks.json');

        let found = tasksList.find((task) => task.id === req.params.id);

        if (!found) {
            res.status(404).send({
                error: "Task Not found!"
            });
        }

        const arrayWithoutDeletedTask = tasksList.filter(task => task.id !== req.params.id);
        await writeFile('tasks.json', arrayWithoutDeletedTask);

        res.status(200).send(found);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);