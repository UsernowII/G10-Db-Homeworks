const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 1000,
    category: "Electronics",
    description: "A high performance laptop"
  },
  {
    id: 2,
    name: "Coffee Mug",
    price: 10,
    category: "Kitchenware",
    description: "A ceramic coffee mug"
  }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

app.post('/products', (req, res) => {
  const { name, price, category, description } = req.body;

  if (!name || !price || !category || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    description
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, category, description } = req.body;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (!name || !price || !category || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  product.name = name;
  product.price = price;
  product.category = category;
  product.description = description;

  res.json(product);
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});