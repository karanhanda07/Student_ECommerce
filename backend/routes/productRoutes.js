const express = require('express');
const { createProduct, getProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
// Get a single product by ID
router.get('/:id', getProductById);
module.exports = router;