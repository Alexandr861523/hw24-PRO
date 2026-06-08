const express = require('express');
const router = express.Router();

let todos = require('../data/todos').default;


router.get('/', (req, res) => {
    res.json(todos);
});


router.get('/:id', (req, res) => {

    const todo = todos.find(
        item => item.id === Number(req.params.id)
    );

    if (!todo) {
        return res.status(404).json({
            message: 'Todo not found'
        });
    }

    res.json(todo);
});


router.post('/', (req, res) => {

    const newTodo = {
        id: Date.now(),
        title: req.body.title
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});


router.put('/:id', (req, res) => {

    const todo = todos.find(
        item => item.id === Number(req.params.id)
    );

    if (!todo) {
        return res.status(404).json({
            message: 'Todo not found'
        });
    }

    todo.title = req.body.title;

    res.json(todo);
});


router.delete('/:id', (req, res) => {

    todos = todos.filter(
        item => item.id !== Number(req.params.id)
    );

    res.json({
        message: 'Todo deleted'
    });
});

module.exports = router;