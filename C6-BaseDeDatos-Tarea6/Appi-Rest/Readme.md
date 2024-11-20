API de Productos
Esta es una API sencilla para gestionar un catálogo de productos. Puedes realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con un archivo JSON como base de datos.

Requisitos
Asegúrate de tener instalado lo siguiente:

Node.js (versión 16 o superior)
npm (incluido con Node.js)
Instalación
Clona el repositorio en tu máquina local:


git clone <URL_DEL_REPOSITORIO>
Navega al directorio del proyecto:

cd <NOMBRE_DEL_DIRECTORIO>
Instala las dependencias necesarias:

npm install
Archivo data.json
Crea un archivo llamado data.json en la raíz del proyecto. Este archivo actuará como la base de datos. Por ejemplo, puedes empezar con este contenido inicial:


[]
Ejecución del proyecto
Inicia el servidor:

node <nombre_del_archivo_principal>.js
Verás el mensaje:
yaml

Escucho en el puerto 3001
La API estará disponible en http://localhost:3001.

Endpoints
1. Bienvenida
URL: /
Método: GET
Descripción: Retorna un mensaje de bienvenida.
Respuesta:

"Bienvenido"
2. Obtener todos los productos
URL: /products
Método: GET
Descripción: Retorna una lista de todos los productos.
Respuesta de ejemplo:

[
  {
    "id": 1,
    "name": "Producto A",
    "price": 100,
    "category": "Categoría X",
    "description": "Descripción del producto"
  }
]
3. Obtener un producto por ID
URL: /products/:id
Método: GET
Descripción: Retorna un producto específico por su ID.
Respuesta de ejemplo:

{
  "id": 1,
  "name": "Producto A",
  "price": 100,
  "category": "Categoría X",
  "description": "Descripción del producto"
}
4. Agregar un producto
URL: /products
Método: POST
Descripción: Agrega un nuevo producto.
Cuerpo de ejemplo:

{
  "name": "Producto Nuevo",
  "price": 200,
  "category": "Categoría Y",
  "description": "Descripción del nuevo producto"
}
Respuesta de ejemplo:

{
  "id": 2,
  "name": "Producto Nuevo",
  "price": 200,
  "category": "Categoría Y",
  "description": "Descripción del nuevo producto"
}
5. Actualizar un producto
URL: /products/:id
Método: PUT
Descripción: Actualiza un producto existente.
Cuerpo de ejemplo:

{
  "price": 250
}
Respuesta de ejemplo:
json
Copiar código
{
  "message": "Product update successfully"
}
6. Eliminar un producto
URL: /products/:id
Método: DELETE
Descripción: Elimina un producto por su ID.
Respuesta de ejemplo:

{
  "message": "Product update successfully"
}
Pruebas
Para probar la API, puedes usar herramientas como Postman o cURL.

Ejemplo usando cURL:


curl -X GET http://localhost:3001/products
Errores comunes
Archivo data.json no encontrado:

Solución: Crea el archivo data.json en la raíz del proyecto.
ID no encontrado:

Mensaje de error: "Product not found"
Solución: Asegúrate de que el ID que proporcionas existe en la base de datos.
Campos obligatorios faltantes:

Mensaje de error: "Missing required fields"
Solución: Proporciona los campos name, price, category y description en el cuerpo de la solicitud.