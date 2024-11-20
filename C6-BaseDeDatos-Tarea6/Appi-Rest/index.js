import { error } from "console";
import express from "express";
import fs from "fs";
import bodyParser from "body-parser"
import { parse } from "url";



const app = express();
app.use(bodyParser.json());
const port= 3001;


const readData=()=>{
    try{
        const data = fs.readFileSync("./data.json")
        return JSON.parse(data);
    }catch (erro){
        console.log(error)
    }
}


// writeData para escribir
const writeData = (data) =>{
    try{
        fs.writeFileSync("./data.json",JSON.stringify(data))
    }catch (error){
        console.log(error)
    };
}


// obtener todos los productos
app.get("/",(req,res)=>{
    res.send("Bienvenido")
});

// obtener todos los datos
app.get("/products",(req,res)=>{
    const data = readData();
    res.json(data)
})


// obtener un dato por id
app.get("/products/:id",(req,res)=>{
    const data = readData();
    const id = parseInt(req.params.id)
    const product = data.find((product)=>product.id===id)

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.json(product)
})

// agregar un producto
app.post("/products",(req,res)=>{
    const data = readData();
    const { name, price, category, description } = req.body

    if (!name || !price || !category || !description) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
        name,
        price,
        category,
        description,
    };
    data.push(newProduct);

    writeData(data);
    res.status(201).json(newProduct);
})
// ****
// actuializar
app.put("/products/:id",(req,res)=>{
    const data = readData();
    const body= req.body
    const id = parseInt(req.params.id)
    const productIndex= data.findIndex((product)=> product.id===id)
    data[productIndex]= {
        ...data[productIndex],
        ...body,
    }    
    writeData(data);
    res.json({message: "Product update sucessfully"})
})

// eliminar
app.delete("/products/:id",(req,res)=>{
    const data = readData();
    const id = parseInt(req.params.id)
    const productIndex= data.findIndex((product)=> product.id===id)

    if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found" });
    }

    data.splice(productIndex,1)
    writeData(data)
    res.json({message: "Product update sucessfully"})
})



app.listen(port, ()=>{
    console.log("Escucho en el puerto 3001")
});

