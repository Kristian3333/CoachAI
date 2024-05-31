// ES Module imports
import express from 'express';
import dbConnect from '../lib/dbConnect.js';
import Goal from '../models/Goal.js';

const router = express.Router();

// Use express.json() middleware for parsing JSON bodies
router.use(express.json());

// GET route
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

// POST route
router.post('/posts', async (req, res) => {
    try {
        await dbConnect();
        const newGoal = new Goal(req.body);
        const savedGoal = await newGoal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        console.error('Error saving new goal:', error);
        res.status(500).send('Failed to save goal');
    }
});

// Export the router
export default router;