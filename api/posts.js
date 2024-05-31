// api/posts.js
const express = require('express');
const dbConnect = require('../lib/dbConnect');
const Goal = require('../models/Goal');  // Correctly imported as Goal

const router = express.Router();

router.get('/goals', async (req, res) => {
    await dbConnect();
    try {
        const goals = await Goal.find();  // Changed from Post.find() to Goal.find()
        res.status(200).json(goals);  // Changed from posts to goals
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving goals');  // Changed from posts to goals
    }
});

router.post('/goals', async (req, res) => {
    await dbConnect();
    try {
        const newGoal = new Goal(req.body);  // Changed from new Post to new Goal
        await newGoal.save();
        res.status(201).send('Goal saved successfully');  // Added success message and changed status to 201
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving goal');  // Changed from post to goal
    }
});

module.exports = router;