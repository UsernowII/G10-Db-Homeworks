const { Router, request } = require('express')
const { Productos } = require('./Datos')
const router = Router(); 

router.get('/Productos', (req, res) => {
    res.json(Productos);
  });

  router.get('/Productos/:id', (req, res) => {
    const id= parseInt(req.params.id)
    const Producto = Productos.find(Producto=> Producto.id === id);
    if (!Producto) return res.status(404).send('Este Producto No Existe');
    res.json(Producto);
  });

  router.post('/Productos', (req, res) => {
    console.log(req.body)        
    const {id, name, price, category, description} = req.body

if (!req.body.id || !req.body.name || !req.body.price || !req.body.category || !req.body.description) {
  return res.status(400).send('Debe Ingresar los datos completos');
}

    if(isNaN(id) || isNaN(price)){
        return res.status(404).json({message: 'El Precio y el Id son numéricos'})
    }

        const Producto = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description
      };
    

  Productos.push(Producto);
  res.status(201).json(Producto) 
});


router.put('/Productos/:id', (req, res) => {

    const id= parseInt(req.params.id)
    const producto = Productos.find(producto => producto.id === id);
    if (!producto) return res.status(404).json({message:'Este Producto NO existe'});
  
    producto.id = req.body.id;
    producto.name = req.body.name;
    producto.price = req.body.price;
    producto.category = req.body.category;
    producto.description = req.body.description
  
    res.status(200).json(producto);
  });


  router.delete('/Productos/:id', (req, res) => {
    const id= parseInt(req.params.id)
    const indiceProducto = Productos.findIndex(producto => producto.id === id);
    console.log(`El Indice del Producto es${indiceProducto}`)
    if (indiceProducto === -1) return res.status(404).send('El Producto NO existe');
    const borrar = Productos.splice(indiceProducto, 1);
    res.json(borrar[0]);
  });

  module.exports = router;
