import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
//import { Artist, Song } from '../models/index.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       
  process.env.DB_USER,       
  process.env.DB_PASSWORD,   
  {
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT,  
    dialect: 'postgres',
    logging: false,        
  }
);

const syncDb = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDb();

export default sequelize;
