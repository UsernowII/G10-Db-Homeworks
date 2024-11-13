const express = require ('express');
const port = process.env.PORT || 3000;
const app = express() 
const router = require('./RutaProductos')


app.use(express.json());


app.get ('/', function(req,res){
    res.send('Esto es una prueba mas')
});

app.use(router)

app.listen(port, () =>{
    console.log(`El Servidor esta corriendo en  http://localhost:${port}/`)
}
)