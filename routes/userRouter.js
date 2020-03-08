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
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
})

// Updating one
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name !== "" && req.body.email !== ""){
        res.user.name = req.body.name
        res.user.email = req.body.email
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser)
    } catch (err){
        res.status(400).json({ message: err })
    }
})

// Deleting one
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.remove()
        res.json({ message: "User has been removed" })
    } catch (err){
        res.status(500).json(err)
    }
})

async function getUser(req, res, next){
    let user;
    try{
        user = await User.findById(req.params.id);
        if (user == null){
            return res.status(404).json({ message: 'User not found' })
        }
    } catch (err) {
        res.status(501).json({message: err.message})
    }
    res.user = user;
    next();
}


module.exports = router;