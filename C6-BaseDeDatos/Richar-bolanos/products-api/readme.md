# Products API

Esta es una API REST diseñada para gestionar una lista de productos. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los productos. La API está construida utilizando Node.js y Express.

## Cómo Funciona la Aplicación

### Estructura de la Aplicación

La aplicación está estructurada de la siguiente manera:

- **package.json**: Contiene las dependencias del proyecto y scripts de configuración.
- **server.js**: Es el archivo principal que inicia el servidor y define las rutas de la API.
- **README.md**: Este archivo, que proporciona información sobre la aplicación.

### Rutas de la API

La API expone varias rutas para interactuar con los productos. A continuación se describen las rutas disponibles:

1. **GET /products**

   - **Descripción**: Devuelve la lista de todos los productos.
   - **Respuesta**: Un array de objetos de productos, cada uno con sus propiedades (id, name, price, category, description).

2. **GET /products/:id**

   - **Descripción**: Devuelve un producto específico por su ID.
   - **Parámetros**: `id` - ID del producto que se desea obtener.
   - **Respuesta**: Un objeto de producto correspondiente al ID proporcionado.

3. **POST /products**

   - **Descripción**: Agrega un nuevo producto a la lista.
   - **Cuerpo de la solicitud**: Debe enviar un objeto JSON con los campos `name`, `price`, `category`, y `description`.
   - **Respuesta**: El objeto del nuevo producto creado, incluyendo su ID.

4. **PUT /products/:id**

   - **Descripción**: Actualiza un producto existente por su ID.
   - **Parámetros**: `id` - ID del producto que se desea actualizar.
   - **Cuerpo de la solicitud**: Debe enviar un objeto JSON con los campos que se desean actualizar.
   - **Respuesta**: El objeto del producto actualizado.

5. **DELETE /products/:id**
   - **Descripción**: Elimina un producto por su ID.
   - **Parámetros**: `id` - ID del producto que se desea eliminar.
   - **Respuesta**: Un código de estado 204, indicando que la eliminación fue exitosa.

### Ejemplo de Uso

Para probar la API, puedes usar herramientas como [Postman](https://www.postman.com/) o `curl`. A continuación se presentan ejemplos de cómo interactuar con la API.

1. **Obtener todos los productos**:

   ```bash
   curl -X GET http://localhost:3000/products

   curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "Smartphone", "price": 500, "category": "Electronics", "description": "A latest model smartphone"}'

   curl -X PUT http://localhost:3000/products/1 -H "Content-Type: application/json" -d '{"name": "Updated Laptop", "price": 1200, "category": "Electronics", "description": "An updated high performance laptop"}'

   curl -X DELETE http://localhost:3000/products/1
   ```
