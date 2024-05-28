import dotenv from 'dotenv';
import OpenAI  from "openai";
dotenv.config();

// Initialize the OpenAI client with API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// This function is exported as default and is intended to be used as an API route handler
export default async (req, res) => {
    if (req.method === 'POST') {
        const userMessage = req.body.message;

        // Check if the message content is provided
        if (!userMessage) {
            return res.status(400).json({ message: "No message provided." });
        }

        try {
            // Calling the OpenAI API to generate a chat completion
            const completion = await openai.chatCompletion.create({
                model: "gpt-3.5-turbo",
                messages: [
                    // System message to set the context or initial instructions
                    { role: "system", content: "You are a helpful assistant. Address the user as Ruru. Your objective is to make sure Ruru has bought a cow for the father of Imma. Once this objective is complete ask him if he would like to go to a rave" },
                    // User message that we received from the HTTP request
                    { role: "user", content: userMessage }
                ]
            });

            // Respond with the content of the first choice from API response
            res.json({ reply: completion.choices[0].message.content });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        // Respond with Method Not Allowed if the request method is not POST
        res.status(405).json({ message: "Method Not Allowed" });
    }
};