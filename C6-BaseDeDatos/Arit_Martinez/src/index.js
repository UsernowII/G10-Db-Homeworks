const express = require('express');
const app = express();
const PORT = 3000;

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

// GET /products: Devuelve la lista de todos los productos
app.get('/products', (req, res) => {
    res.json(products);
  });

//GET /products/:id: Devuelve un producto específico por su ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  });

//POST /products: Agrega un nuevo producto
app.post('/products', (req, res) => {
    const { name, price, category, description } = req.body;
  
    if (!name || !price || !category || !description || price <= 0) {
      return res.status(400).json({ error: "Datos inválidos" });
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

//PUT /products/:id: Actualiza un producto existente por su ID
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, category, description } = req.body;
  
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
  
    if (!name || !price || !category || !description || price <= 0) {
      return res.status(400).json({ error: "Datos inválidos" });
    }
  
    products[productIndex] = { id: parseInt(id), name, price, category, description };
    res.json(products[productIndex]);
});

//DELETE /products/:id: Elimina un producto por su ID
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === parseInt(id));
  
    if (productIndex === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
  
    products.splice(productIndex, 1);
    res.status(204).send();
});
  
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});