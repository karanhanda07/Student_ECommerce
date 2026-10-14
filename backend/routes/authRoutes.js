const express = require('express');
const { signup, login, verifyAdmin } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/signup', signup);

// Log in an existing user
router.post('/login', login);

// Check whether the logged-in user is an admin
router.get('/verify-admin', verifyAdmin);

module.exports = router;