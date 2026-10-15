const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

// Signup
const signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role || 'user'
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'Login successful',
            token,
            role: user.role || 'user'
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
// Verify that the logged-in user is an admin
const verifyAdmin = async (req, res, next) => {
    // Read the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        // Verify the token signature and expiration
        const decoded = jwt.verify(token, SECRET_KEY);

        // Find the user in MongoDB using the ID from the token
        const user = await User.findById(decoded.userId);

        // Check the user's CURRENT role in the database
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access denied.' });
        }
        // Store the logged-in admin's ID on the request object
        req.userId = user._id.toString();
        next(); // Allow the request to continue to getUsers
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
// Get all registered users without their passwords
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Could not load users'
        });
    }
};
// Delete a user by their MongoDB ID
const deleteUser = async (req, res) => {
    try {
        // Get the user ID from the URL
        const { id } = req.params;

        // Prevent the admin from deleting their own account
        if (id === req.userId) {
            return res.status(403).json({
                message: 'You cannot delete your own account.'
            });
        }

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.status(200).json({
            message: 'User deleted successfully.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Could not delete user.'
        });
    }
};
module.exports = { signup, login, verifyAdmin, getUsers, deleteUser };