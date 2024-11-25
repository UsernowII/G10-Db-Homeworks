import { Sequelize } from 'sequelize';
import env from './config/env.js';
import dotenv from 'dotenv';


const sequelize = new Sequelize(
    env.databaseDB,  // Nombre de la base de datos
    env.usernameDB,   // Usuario
    env.passwordDB,   // Contraseña
    {
      host: env.hostDB,      // Host de la base de datos
      port: env.portDB,      // Puerto
      dialect: env.dialectDB, // Dialecto PostgreSQL
      logging: false,        // Desactiva el logging de las consultas SQL en consola
    }
  );
  
  export default sequelize;