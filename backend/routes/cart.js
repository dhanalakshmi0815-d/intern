const express = require('express');
const jwt = require('jsonwebtoken');

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

// Simple in-memory cart (for demo; use DB in production)
let carts = {};

// Get cart
router.get('/', verifyToken, (req, res) => {
  const cart = carts[req.user.id] || [];
  res.json(cart);
});

// Add to cart
router.post('/', verifyToken, (req, res) => {
  const { productId, quantity } = req.body;
  if (!carts[req.user.id]) carts[req.user.id] = [];
  const cart = carts[req.user.id];
  const item = cart.find(i => i.productId === productId);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  res.json(cart);
});

// Update cart
router.put('/:productId', verifyToken, (req, res) => {
  const { quantity } = req.body;
  const cart = carts[req.user.id] || [];
  const item = cart.find(i => i.productId === req.params.productId);
  if (item) {
    item.quantity = quantity;
  }
  res.json(cart);
});

// Remove from cart
router.delete('/:productId', verifyToken, (req, res) => {
  const cart = carts[req.user.id] || [];
  carts[req.user.id] = cart.filter(i => i.productId !== req.params.productId);
  res.json(carts[req.user.id]);
});

module.exports = router;
