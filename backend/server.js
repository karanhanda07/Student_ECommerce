const express = require('express');
const connectToMongoDB = require('./utils/connectToMongoDB');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());
// Middleware
app.use(bodyParser.json());

// MongoDB Connection
connectToMongoDB();

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
