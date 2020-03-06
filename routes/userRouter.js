const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Getting All
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch (err){
        res.status(500).json(err)
    }
})

// Creating one
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode
    })
    try{
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err });
    }
})

// Getting one
router.get('/:id', (req, res) => {
    res.send(req.params.id);
})

// Updating one
router.patch('/:id', (req, res) => {
    
})

// Deleting one
router.delete('/:id', (req, res) => {
    
})


module.exports = router;