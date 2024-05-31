import express from 'express';
import path from 'path';
import postsRouter from './api/posts.js';
import sendMessageRouter from './api/sendMessage.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// API routes
app.use('/api/posts', postsRouter);
app.use('/api/sendMessage', sendMessageRouter);

// Serve static files from 'pages' directory
app.use(express.static('pages'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});