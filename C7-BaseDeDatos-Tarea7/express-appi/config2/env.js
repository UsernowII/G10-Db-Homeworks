import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const env = {
  usernameDB: process.env.DB_USERNAME,  // Usuario de la base de datos
  passwordDB: process.env.DB_PASSWORD,  // Contraseña de la base de datos
  hostDB: process.env.DB_HOST,          // Host de la base de datos
  databaseDB: process.env.DB_DATABASE,  // Nombre de la base de datos
  portDB: process.env.DB_PORT,          // Puerto de la base de datos
  dialectDB: process.env.DB_DIALECT,    // Dialecto de la base de datos (PostgreSQL)
};

export default env;

  