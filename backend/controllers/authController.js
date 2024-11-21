const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg';

const authController = {
    auth: async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ message: 'Invalid password' });
            } else {
                const loginData = { email, signInTime: Date.now() };
                const token = jwt.sign(loginData, jwtSecretKey);
                return res.status(200).json({ message: 'success', token });
            }
        } else {
            const hash = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hash });
            await newUser.save();

            const loginData = { email, signInTime: Date.now() };
            const token = jwt.sign(loginData, jwtSecretKey);
            return res.status(200).json({ message: 'success', token });
        }
    },

    signup: async (req, res) => {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hash });
        await newUser.save();

        const loginData = { email, signInTime: Date.now() };
        const token = jwt.sign(loginData, jwtSecretKey);
        return res.status(200).json({ message: 'success', token });
    },

    verify: (req, res) => {
        const tokenHeaderKey = 'jwt-token';
        const authToken = req.headers[tokenHeaderKey];

        try {
            const verified = jwt.verify(authToken, jwtSecretKey);
            if (verified) {
                return res.status(200).json({ status: 'logged in', message: 'success' });
            } else {
                return res.status(401).json({ status: 'invalid auth', message: 'error' });
            }
        } catch (error) {
            return res.status(401).json({ status: 'invalid auth', message: 'error' });
        }
    },

    checkAccount: async (req, res) => {
        const { email } = req.body;

        const user = await User.findOne({ email });

        res.status(200).json({
            status: user ? 'User exists' : 'User does not exist',
            userExists: !!user,
        });
    }
};

module.exports = authController;