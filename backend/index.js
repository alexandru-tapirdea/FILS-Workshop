const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require('fs');
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));


let tasks = []
app.get("/task/getAll", (req, res) => {
    res.json(tasks.map(x => x));
});

const saveToDataBase = []

app.post("/task/createTask", (req, res) => {

    let itemIds = tasks.map(x => x.id)
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    const toDo = {
        id: newId,
        task: req.body.task,
        deadline: req.body.deadline,
        priority: req.body.priority,
        category: req.body.category,
    }

    tasks.push(toDo);

    fs.writeFile('tasks.txt', JSON.stringify(tasks, 2, null) + "\n", function (err) {
        if (err) return console.log(err);
    });

    res.redirect("/task/getAll");
});


app.delete("/task/delete/:id", (req, res) => {
    let found = tasks.find((task) => {
        return task.id === parseInt(req.params.id)
    });
    if (found) {
        tasks.splice(found, 1);

        const readFile = fs.readFileSync('tasks.txt', 'utf8', function (err, data) {
            return data;
        });
        const parsedData = JSON.parse(readFile);
        let foundParsedData = parsedData.find((x) => {
            return x.id === parseInt(req.params.id)
        });
        if (foundParsedData) {
            parsedData.splice(foundParsedData, 1)
            fs.writeFile('tasks.txt', JSON.stringify(parsedData, 2, null), function (err) {
                if (err) return console.log(err);
            });
        }
    }
    res.redirect("/task/getAll");
})


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);