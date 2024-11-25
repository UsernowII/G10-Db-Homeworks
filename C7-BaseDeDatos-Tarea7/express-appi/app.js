import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db.js';
import artistRoutes from './routes/artists.js';
import songRoutes from './routes/songs.js';

dotenv.config();  // Carga las variables de entorno

const app = express();
const PORT = 3031;

app.use(express.json());  // Para que el servidor maneje solicitudes JSON

// Usar las rutas de artistas y canciones
app.use(artistRoutes);
app.use(songRoutes);

// Conectar a la base de datos y sincronizar los modelos
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    await sequelize.sync();  // Sincroniza los modelos con la base de datos
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
