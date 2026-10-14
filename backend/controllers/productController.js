const Product = require('../Models/Product');

// Create a product
const createProduct = async (req, res) => {
    try {
        const { name, price, description, image } = req.body;

        const product = new Product({
            name,
            price,
            description,
            image
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