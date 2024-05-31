// sendMessage.js
import dotenv from 'dotenv';
import OpenAI from 'openai';
import dbConnect from '../lib/dbConnect';  // Assuming dbConnect is in `lib/dbConnect`
import Goal from '../models/Goal';  // Assuming Goal is a mongoose model

// Load environment variables from the .env file
dotenv.config();

// Initialize the OpenAI client with the API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Define the function to handle the API route
export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ message: "No message provided." });
    }

    try {
        await dbConnect();

        // Retrieve the first two goals from the database
        const goals = await Goal.find().limit(2);

        if (goals.length < 2) {
            return res.status(404).json({ message: "Not enough goals found in the database." });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `You are a helpful assistant. Address the user as Ruru. Your objectives are to ensure Ruru has achieved these goals: 1. ${goals[0].description}, 2. ${goals[1].description}. Once these objectives are complete, ask him if he would like to go to a rave.` },
                { role: "user", content: userMessage }
            ]
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};