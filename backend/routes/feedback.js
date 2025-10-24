const express = require('express');
const jwt = require('jsonwebtoken');
const Feedback = require('../models/Feedback');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Submit feedback
router.post('/', verifyToken, async (req, res) => {
  const { message } = req.body;
  try {
    const feedback = new Feedback({ user: req.user.id, message });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all feedback (admin)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'name email');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
