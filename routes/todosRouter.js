const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    } catch (err){
        res.status(500).json(err);
    }
})

// Get all user todo by userId
router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const todos = await Todo.find({userId: id});
        res.json(todos);
    } catch (err){
        res.json(err);
    }
})

// Create new Todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        userId: req.body.userId,
        title: req.body.title,
    })
    try {
        const newTodo = await todo.save()
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// Get specific todo
router.get('/:id', getTodo, (req, res) => {
    res.json(res.todo)
})

// Updatind todo
router.patch('/:id', getTodo, async (req, res) => {
    if (req.body.completed === true){
        res.todo.completed = true;
    }
    try{
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (err){
        res.json({ message: err.message })
    }
})

// deleteing one
router.delete('/:id', getTodo, async (req, res) => {
    try{
        await res.todo.remove();
        res.json({ message: "task has been removed!"})
    } catch (err){
        res.json({ message: err.message })
    }
})

async function getTodo(req, res, next){
    let todo;
    try{
        todo = await Todo.findById(req.params.id);
        if (todo == null){
            return res.json({message: 'task not found'})
        }
    } catch (err){
        res.json({ message: err })
    }
    res.todo = todo;
    next();
}

module.exports = router;