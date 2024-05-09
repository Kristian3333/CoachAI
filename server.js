import express from 'express';
import fetch from 'node-fetch'; // Ensure your environment supports ECMAScript Modules.
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/sendMessage', async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = process.env.OPENAI_API_KEY; // API key stored in .env for security

    if (!userMessage) {
        return res.status(400).json({ message: "No message provided." });
    }

    const apiEndpoint = 'https://api.openai.com/v1/chat/completions'; // Updated to use Chat Completions API

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Adjust the model as necessary
                messages: [
                    { role: "system", content: "You are a helpful assistant. Address the user as Adrik. Your objective it to make sure Adrik has done 50 push ups and that he finishes his house work. Make sure to remind him everytime you can" },
                    { role: "user", content: userMessage }
                ]
            })
        });

        if (!response.ok) { // Check if the request failed
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
