# Documentación del Proyecto: API de Biblioteca de Música

### Índice
1.	Introducción
2.	Requisitos
3.	Configuración Inicial
4.	Modelo de Base de Datos
5.	Rutas de la API
6.	Manejo de Errores
7.	Pruebas
8.	Futuras Mejoras


## Introducción

La API de Biblioteca de Música es una aplicación backend desarrollada en Node.js utilizando Express y Sequelize para gestionar canciones y artistas en una base de datos PostgreSQL. Proporciona operaciones CRUD completas para ambas entidades.

## Requisitos
- Node.js v16 o superior
- PostgreSQL v13 o superior
- NPM o Yarn como gestor de paquetes
- Librerías utilizadas:
  - express
  - sequelize
  - pg y pg-hstore
  - dotenv
  - cors
  - nodemon (para desarrollo)

## Configuración inicial

## 1. Clona el repositorio
```bash
  git clone <url-del-repositorio>
  cd project-root
```

## 2. Instala las dependencias

```bash
  npm install
```

## 3. Configura las variables de entorno

  Crea un archivo .env en la raíz del proyecto con la siguiente estructura:

```.env
  DB_HOST=localhost
  DB_NAME=music_library
  DB_USER=tu_usuario
  DB_PASSWORD=tu_contraseña
  DB_PORT=5432
```

## 4. Configura la base de datos

  1. Accede a PostgreSQL utilizando pgAdmin, CLI, o tu herramienta favorita.
  2. Crea la base de datos necesaria:
  
      ```sql
        CREATE DATABASE music_library;
      ```

  3. Verifica la conectividad desde el proyecto configurado ejecutando el archivo de sincronización (index.js o directamente en el seed script).

## 5. Sincronoza el modelo

En app.js, asegúrate de sincronizar el modelo con la base de datos:

```javascript
  const sequelize = require('./config/database');

  sequelize.sync({ force: true })
    .then(() => console.log('Base de datos sincronizada.'))
    .catch(err => console.error('Error al sincronizar la base de datos:', err));
```

## 6. LLena la Base de Datos con datos iniciales

Ejecuta el script seed.js para poblar la base de datos con datos iniciales:

   ```bash
   node seed.js
   ```
Este script sincroniza las tablas y añade datos de prueba.

## Modelo de Base de Datos

### Tabla artist 

```markdown
| Campo     | Tipo          | Descripción                     |
|-----------|---------------|---------------------------------|
| id        |INTEGER (PK)   | Identificador único del artista |
| name	    |VARCHAR        | Nombre del artista              |
| bio       |TEXT           | Biografía del artista           |
| photoUrl  |VARCHAR        | URL de la foto del artista      |
```

### Tabla: Songs

```markdown
| Campo       | Tipo          | Descripción                               |
|-------------|---------------|-------------------------------------------|
| id          | INTEGER (PK)  | Identificador único de la canción         |
| title	      | VARCHAR       | Título de la canción                      |
| artistId    | INTEGER (FK)  | Identificador del artista (clave foránea) |
| releaseYear | INTEGER       | Año de lanzamiento de la canción          |
| duration    |	INTEGER       | Duración de la canción en segundos        |
| coverUrl    | VARCHAR       |URL de la portada del álbum                |

```

## 7. Ejecuta el Servidor
Inicia el servidor de desarrollo con el siguiente comando:

   ```bash
   npm start
   ```

Si utilizas nodemon para recargar automáticamente los cambios en el código:

   ```bash
   npm run dev
   ```

El servidor estará disponible por defecto en http://localhost:3000.

## Rutas de API
		
### Canciones

- POST /songs : Crea una nueva canción.
- GET /songs : Obtiene todas las canciones.
- PUT /songs/:id : Actualiza una canción existente.
- DELETE /songs/ : Elimina una canción.

### Artistas

- POST /artists : Crea un nuevo artista.
- GET /artists : Obtiene todos los artistas.
- PUT /artists/ : Actualiza un artista existente.
- DELETE /artists/ : Elimina un artista.


## Manejo de Errores
1. **Errores de validación:** La API retorna un estado 400 con un mensaje claro si los datos enviados no cumplen con los requisitos.
2. **Errores de no encontrado:** Si un recurso no existe, la API retorna un estado 404 con un mensaje apropiado.
3. **Errores internos del servidor:** La API retorna un estado 500 si ocurre un error inesperado.

## Pruebas
Puedes usar herramientas como Postman o Thunder Client para probar las rutas de la API. Configura los métodos HTTP (GET, POST, PUT, DELETE) y verifica las respuestas.


## 8. Prueba los Endpoints
Utiliza una herramienta como Postman o thunder Client para probar las rutas de la API. Los ejemplos de endpoints son:

### Artistas:

- GET /artists: Lista todos los artistas.

  ![GET 1](./images/get1.png "respuesta a GET No. 1")



- POST /artists: Crea un artista. (Envía datos JSON en e l cuerpo de la solicitud).

### Canciones:
- GET /songs: Lista todas las canciones.
- POST /songs: Crea una canción vinculada a un artista.

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

agregar las imagenes





Ruta: GET /products

Descripción: Devuelve la lista completa de productos.

Respuesta:

![GET 1](./images/get1.png "respuesta a GET No. 1")


#### Obtener un producto por ID

Ruta: GET /products/:id

Descripción: Devuelve un producto específico.

Respuesta:

![GET 2](./images/get2.png "respuesta a GET No. 2")



#### Crear un nuevo producto

Ruta: POST /products

Descripción: Crea un nuevo producto.

Body:

```json
{
  "name": "Gaming Mouse",
  "price": 60,
  "category": "Electronics",
  "description": "RGB gaming mouse with programmable buttons"
}

```

Respuesta:

![POST 1](./images/post1.png "respuesta a POST No. 1")

de Respuesta:

![POST 2](./images/post2.png "respuesta a POST No. 2")

#### Actualizar un producto

Ruta: PUT /products/:id

Descripción: Actualiza un producto existente, en este ejemplo se actualiza el precio del producto creado en el punto anterior a 100.

Body:

```json
{
  "name": "Gaming Mouse",
  "price": 100,
  "category": "Electronics",
  "description": "RGB gaming mouse with programmable buttons"
}

```

![PUT 1](./images/put1.png "respuesta a PUT No. 1")

Respuesta:

![PUT 2](./images/put2.png "respuesta a PUT No. 2")

#### Eliminar un producto
Ruta: DELETE /products/:id

Descripción: Elimina un producto por su ID.

Respuesta:

![DELETE 1](./images/delete1.png "respuesta a DELETE No. 1")

Cuando se intenta eliminar un producto inexistente esta es la respuesta.

![DELETE 2](./images/delete2.png "respuesta a DELETE No. 2")

## JONNY LUNA GUERRERO



