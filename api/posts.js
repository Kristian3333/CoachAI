// api/posts.js
const express = require('express');
const dbConnect = require('../lib/dbConnect');
const Goal = require('../models/Goal');

const router = express.Router();

router.get('/goals', async (req, res) => {
    await dbConnect();
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving posts');
    }
});

router.post('/goals', async (req, res) => {
    await dbConnect();
    try {
        const newPost = new Post(req.body);
        await newPost.save();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving post');
    }
});

module.exports = router;