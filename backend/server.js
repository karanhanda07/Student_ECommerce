const express = require('express');
const cors = require('cors');
const { connectToMongoDB } = require('./utils/connectToMongoDB');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic home route for the API
app.get('/', (_req, res) => {
    res.send('Auth API.\nPlease use POST /auth, POST /signup & POST /verify for authentication');
});

// Connect to MongoDB
connectToMongoDB();

// Use the auth routes
app.use('/', authRoutes);

app.listen(3080, () => {
    console.log('Server is running on http://localhost:3080');
});