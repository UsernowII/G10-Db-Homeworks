const {products} = require('../models/data')

const getAllProducts = (req, res) => {
    res.json(products);
};

const getProductById = (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(prod => prod.id === id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
};

const createProduct = (req, res) => {
    const { name, price, category, description } = req.body;
    if (!name || !price || !category || !description) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const newProduct = {
        id: products.length + 1,
        ...req.body
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const id = Number(req.params.id);
    const { name, price, category, description } = req.body;
    const productIndex = products.find(prod => prod.id === id);

    if (!productIndex) return res.status(404).json({ error: "Product not found" });
    
    if (!name || !price || !category || !description) {
        return res.status(400).json({ error: "All fields are required" });
    }

    products[productIndex] = { id, name, price, category, description };
    res.json(products[productIndex]);
};

const deleteProduct = (req, res) => {
    const id = Number(req.params.id);
    const productIndex = products.findIndex(prod => prod.id === id);
    if (productIndex === -1) return res.status(404).json({ error: "Product not found" });

    products.splice(productIndex, 1);
    res.status(200).json({message: "Product deleted successfully"});
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};

