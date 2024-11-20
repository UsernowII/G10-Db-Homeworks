const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');


app.use(express.json()); 
app.use('/products', productRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
