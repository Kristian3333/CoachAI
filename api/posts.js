// api/posts.js
const express = require('express');
const dbConnect = require('../lib/dbConnect');
const Goal = require('../models/Goal');

const router = express.Router();
router.use(bodyParser.json());
router.use(express.json()); 

router.get('/goals', async (req, res) => {
    try {
        await dbConnect(); // Ensure database connection
        const goals = await Goal.find(); // Fetch all goals
        res.status(200).json(goals); // Send goals as JSON
    } catch (error) {
        console.error('Error retrieving goals:', error); // Log detailed error
        res.status(500).send('Error retrieving goals'); // Send error response
    }
});

router.post('/posts', (req, res) => {
    console.log(req.body); // Replace with actual database handling logic or further processing
    res.status(200).json({ message: "Data received successfully!" });
});

module.exports = router;