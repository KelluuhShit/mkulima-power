const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('../config/db'); // Use the pool
const fs = require('fs');

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        const userId = req.body.userId;
        const timestamp = Date.now();
        const newFilename = `${userId}_${timestamp}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage });

// File upload endpoint
router.post('/create', upload.single('image'), (req, res) => {
    const { text, userId } = req.body;

    // Check if userId and text are provided
    if (!userId || !text) {
        return res.status(400).json({ error: 'User ID and text are required' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Store the post data in the database
    pool.query('INSERT INTO posts (user_id, text, image_url) VALUES (?, ?, ?)', [userId, text, imageUrl], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log the error
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Post created successfully', postId: result.insertId });
    });
});

// Route to fetch all posts
router.get('/', (req, res) => {
    pool.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results); // Return the fetched posts
    });
});

module.exports = router;
