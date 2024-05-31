// api/posts.js
const express = require('express');
const dbConnect = require('../lib/dbConnect');
const Goal = require('../models/Goal');

const router = express.Router();

router.get('/goals', async (req, res) => {
    await dbConnect();
    try {
        const goals = await Goal.find();
        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving goals');
    }
});

router.post('/goals', async (req, res) => {
    await dbConnect();
    try {
        const newGoal = new Goal(req.body);
        await newGoal.save();
        // Redirect to main.html after successful save
        res.redirect('/main.html');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving goal');
    }
});

module.exports = router;