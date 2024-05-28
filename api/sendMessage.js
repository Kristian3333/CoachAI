<<<<<<< HEAD
import { json } from 'express';
=======
>>>>>>> e75c6bc ('clean')
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
<<<<<<< HEAD
system_message = "You are a helpful assistant. Address the user as Ruru. Your objective it to make sure Ruru has bought a cow for the father of Imma. Once this objective is complete ask him if he would like to go to a rave"
export default async (req, res) => {
    if (req.method === 'POST') {
        const userMessage = req.body.message;
        const apiKey = process.env.OPENAI_API_KEY;
=======
const system_message = "You are a helpful assistant. Address the user as Ruru. Your objective it to make sure Ruru has bought a cow for the father of Imma. Once this objective is complete ask him if he would like to go to a rave";
// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export default async (req, res) => {
    if (req.method === 'POST') {
        const userMessage = req.body.message;
>>>>>>> e75c6bc ('clean')

        if (!userMessage) {
            return res.status(400).json({ message: "No message provided." });
        }

<<<<<<< HEAD
        const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: system_message },
                        { role: "user", content: userMessage }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log(JSON.stringify(data)); 
            res.json({ reply: data.choices[0].message.content });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "Internal Server Error" });
=======
        try {
            const completion = await openai.chatCompletion.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: system_message },
                    { role: "user", content: userMessage }
                ],
                // Additional settings can be adjusted here, like temperature, etc.
            });

            res.json({ reply: completion.choices[0].message.content });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
>>>>>>> e75c6bc ('clean')
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
<<<<<<< HEAD
};
=======
};
>>>>>>> e75c6bc ('clean')
