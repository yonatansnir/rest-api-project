const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts);
    } catch (err){
        res.json({ message: err.message })
    }
})

// Get all user's posts by id
router.get('/user/:id', (req, res) => {
    const id = req.params.id;
    Post.find({userId: id})
    .then(posts => {
        res.json(posts);
    })
    .catch(err => res.json(err));
})

// Post a new post
router.post('/', async (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body
    })
    try{
        const newPost = await post.save()
        res.json(newPost);
    } catch(err) {
        res.json({ message: err.message })
    }
})

// Get specific post
router.get('/:id', getPost, (req, res) => {
    res.json(res.post);
})

// Updating post
router.patch('/:id', getPost, (req, res) => {
    if (req.body.title != ""){
        res.post.title = req.body.title;
    }
    res.post.save()
    .then(updatedPost => res.json(updatedPost))
    .catch(err => res.json(err));
})

// deleting post
router.delete('/:id', getPost, (req, res) => {
    res.post.remove()
    .then(() => res.json({message: 'post has been removed'}))
    .catch((err) => res.json(err))
})

// deleteing all user's post
router.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    Post.deleteMany({userId: id})
    .then(() => res.json({message: 'all users post deleted'}))
    .catch(err => res.json(err));
})

async function getPost(req, res, next){
    let post;
    try{
        post = await Post.findById(req.params.id);
        if (post == null){
            return res.json({ message: 'Post not found' })
        }
    } catch (err){
        res.json(err)
    }
    res.post = post;
    next();
}

module.exports = router;