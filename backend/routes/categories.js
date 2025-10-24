const express = require('express');
const Category = require('../models/Category');
const Product = require('../models/Product');

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products by category
router.get('/:id/products', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id }).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
