const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

// @route GET /api/auth
// @desc Check if user is logged in
// @access public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: 'User not found' });
        return res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: 'false',
            message: 'Internal server error',
        });
    }
});

// @route POST /api/auth/register
// @desc Register user
// @access public

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing username/ password' });
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username });

        if (user)
            return res
                .status(400)
                .json({ success: false, message: 'User already exists' });

        // All good
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET,
        );

        res.json({
            success: true,
            message: 'User created successfully',
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: 'false',
            message: 'Internal server error',
        });
    }
});

// @route POST /api/auth/login
// @desc Login user
// @access public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing username/ password' });
    }

    try {
        // Check existing user
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({
                success: false,
                messsage: 'Incorrect username or password',
            });

        // Username exists
        const validPassword = argon2.verify(user.password, password);
        if (!validPassword)
            return res.status(400).json({
                success: false,
                messsage: 'Incorrect username or password',
            });

        // All good
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
        );
        res.json({ success: true, message: 'Login successfully', accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: 'false',
            message: 'Internal server error',
        });
    }
});

module.exports = router;
