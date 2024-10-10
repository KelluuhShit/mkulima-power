const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes'); // Import your post routes

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the post routes under the specified route
app.use('/api/posts', postRoutes);

// Other configurations...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
