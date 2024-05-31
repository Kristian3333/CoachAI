// /api/storeGoals.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        // Here you can integrate with a database or another storage system
        console.log('Received goal:', req.body.goal); // For demonstration

        // Responding that the goal was stored successfully
        res.status(200).json({ status: 'Success', message: 'Goal stored' });
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}