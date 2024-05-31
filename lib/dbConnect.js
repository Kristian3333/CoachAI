// lib/dbConnect.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

const connection = {}; // This object will cache the connection.

async function dbConnect() {
    // Check if we have connection to our database
    if (connection.isConnected) {
        return;
    }

    // Connecting to our database
    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;