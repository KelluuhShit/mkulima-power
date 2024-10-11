const express = require('express');
const cors = require('cors'); // Import CORS
const path = require('path'); // Import path to handle directory paths
const postRoutes = require('./routes/postRoutes'); // Ensure the path to your post routes is correct
const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
    origin: 'http://localhost:3001', // Allow this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    credentials: true, // Allow credentials (if needed)
    optionsSuccessStatus: 200 // For legacy browser support
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with specified options
app.use(express.json()); // Parse incoming JSON requests
app.use('/api/posts', postRoutes); // Mount the post routes under /api/posts

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Mkulima Power API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
