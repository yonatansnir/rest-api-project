const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body
    })
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err){
        res.status(400).json(err)
    }
})

module.exports = router;