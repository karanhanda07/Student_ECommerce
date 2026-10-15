const Product = require('../Models/Product');
const jwt = require('jsonwebtoken');
// Create a product
const createProduct = async (req, res) => {
    try {
        // Read the JWT from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];

        // Reject requests without a token
        if (!token) {
            return res.status(401).json({ message: 'Login required' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { name, price, description, image } = req.body;

        const product = new Product({
            name,
            price,
            description,
            image,
            seller: decoded.userId // User ID obtained from the verified JWT
        });

        await product.save();

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({ message: 'Failed to create product.' });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: 'Failed to get products.' });
    }
};
// Get one product using its MongoDB ID
const getProductById = async (req, res) => {
    try {
        // Read the product ID from the URL
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Send the product back to React
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product ID.' });
    }
};
module.exports = { createProduct, getProducts, getProductById };