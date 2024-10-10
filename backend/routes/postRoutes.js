// routes/postRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path'); // Import the path module
const db = require('../config/db');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        const userId = req.body.userId; // Get user ID from request body
        const timestamp = Date.now(); // Get current timestamp
        const newFilename = `${userId}_${timestamp}${path.extname(file.originalname)}`; // Rename file
        cb(null, newFilename); // Use the new filename
    },
});

const upload = multer({ storage });

// File upload endpoint
router.post('/create', upload.single('image'), (req, res) => {
    const { text } = req.body;
    const userId = req.body.userId; // Ensure you get userId from request body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Use the uploaded image URL

    // Store the post data in the database
    db.query('INSERT INTO posts (user_id, text, image_url) VALUES (?, ?, ?)', [userId, text, imageUrl], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Post created successfully' });
    });
});

module.exports = router;
