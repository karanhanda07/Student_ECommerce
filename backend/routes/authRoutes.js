const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/auth', authController.auth);
router.post('/signup', authController.signup);
router.post('/verify', authController.verify);
router.post('/check-account', authController.checkAccount);

module.exports = router;