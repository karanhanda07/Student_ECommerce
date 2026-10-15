const express = require('express');
const {
    signup,
    login,
    verifyAdmin,
    getUsers,
    deleteUser
} = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/signup', signup);

// Log in an existing user
router.post('/login', login);

// Return success after admin verification
router.get('/verify-admin', verifyAdmin, (req, res) => {
    res.status(200).json({ message: 'Admin verified successfully.' });
});
// Return registered users (admin only)
router.get('/users', verifyAdmin, getUsers);
router.delete('/users/:id', verifyAdmin, deleteUser);
module.exports = router;