import express from 'express';
import asyncHandler from 'express-async-handler';
import User from './userModel';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register User
async function registerUser(req, res) {
    try {
        await User.create(req.body);
        res.status(201).json({ success: true, msg: 'User successfully created.' });
    } catch (error) {
        res.status(400).json({ success: false, msg: 'Unable to create user.', error: error.message });
    }
}

// Authenticate User
async function authenticateUser(req, res) {
    try {
        const user = await User.findByUserName(req.body.username);
        if (!user) {
            return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
        }

        const isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            const token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, token: 'BEARER ' + token });
        } else {
            res.status(401).json({ success: false, msg: 'Wrong password.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error.', error: error.message });
    }
}

// POST route for Register/Create and Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ success: false, msg: 'Username and password are required.' });
    }
    if (req.query.action === 'register') {
        await registerUser(req, res);
    } else {
        await authenticateUser(req, res);
    }
}));

// GET route to list all users (for testing purposes only)
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}));

export default router;
