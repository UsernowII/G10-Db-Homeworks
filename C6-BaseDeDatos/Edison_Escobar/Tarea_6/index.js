import http from 'http';
import 'dotenv/config'; 

const port = process.env.PORT;
// Arreglo en memoria para los productos
let products = [
    { id: 1, name: 'Laptop', price: 1000, category: 'Electronics', description: 'A high performance laptop' },
    { id: 2, name: 'Coffee Mug', price: 10, category: 'Kitchenware', description: 'A ceramic coffee mug' },
];

// Función para obtener el cuerpo de la solicitud (req)
const getRequestData = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
};

// Crear el servidor
const server = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json"); // Establecer el contenido como JSON

    // Utilizamos switch para manejar las rutas
    switch (true) {
        // Obtener todos los productos (GET)
        case req.url === "/products" && req.method === "GET":
            res.writeHead(200);
            res.end(JSON.stringify(products));
            break;

        // Obtener un producto por ID (GET)
        case req.url.startsWith("/products/") && req.method === "GET":
            const id = parseInt(req.url.split("/")[2]);
            const product = products.find(p => p.id === id);
            if (product) {
                res.writeHead(200);
                res.end(JSON.stringify(product));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: "Product not found" }));
            }
            break;

        // Agregar un nuevo producto (POST)
        case req.url === "/products" && req.method === "POST":
            try {
                const body = await getRequestData(req);
                const { name, price, category, description } = JSON.parse(body);
                
                if (!name || !price || !category || !description || price <= 0) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: "Invalid input data" }));
                } else {
                    const newProduct = {
                        id: products.length + 1,
                        name,
                        price,
                        category,
                        description,
                    };
                    products.push(newProduct);
                    res.writeHead(201);
                    res.end(JSON.stringify(newProduct));
                }
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Server error" }));
            }
            break;

        // Actualizar un producto existente (PUT)
        case req.url.startsWith("/products/") && req.method === "PUT":
            try {
                const idToUpdate = parseInt(req.url.split("/")[2]);
                const productIndex = products.findIndex(p => p.id === idToUpdate);

                if (productIndex === -1) {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: "Product not found" }));
                } else {
                    const body = await getRequestData(req);
                    const { name, price, category, description } = JSON.parse(body);

                    if (!name || !price || !category || !description || price <= 0) {
                        res.writeHead(400);
                        res.end(JSON.stringify({ error: "Invalid input data" }));
                    } else {
                        products[productIndex] = { id: idToUpdate, name, price, category, description };
                        res.writeHead(200);
                        res.end(JSON.stringify(products[productIndex]));
                    }
                }
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Server error" }));
            }
            break;

        // Eliminar un producto (DELETE)
        case req.url.startsWith("/products/") && req.method === "DELETE":
            const idToDelete = parseInt(req.url.split("/")[2]);
            const productIndexToDelete = products.findIndex(p => p.id === idToDelete);

            if (productIndexToDelete === -1) {
                res.writeHead(404);
                res.end(JSON.stringify({ error: "Product not found" }));
            } else {
                const deletedProduct = products.splice(productIndexToDelete, 1);
                res.writeHead(200);
                res.end(JSON.stringify(deletedProduct[0]));
            }
            break;

        // Manejo de rutas no encontradas
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Error 404: Not found');
            break;
    }
});

// Iniciar el servidor en el puerto indicado
server.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
