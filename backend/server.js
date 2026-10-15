const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const app = express();
const productRoutes = require('./routes/productRoutes');

// Enable CORS
app.use(cors());

// Middleware
// Allow small Base64 images in JSON requests
app.use(express.json({ limit: '5mb' }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
// Register the product API endpoints
app.use('/api/products', productRoutes);
// Start server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
