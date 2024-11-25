const { Sequelize } = require('sequelize');
const env = require('../config/env');

const { database } = env;

const sequelize = new Sequelize(database.name, database.username, database.password, {
    host: database.host,
    dialect: database.dialect,
});

sequelize.query(`
    CREATE TABLE IF NOT EXISTS Artists (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        bio TEXT,
        photoUrl VARCHAR(100)
    );`).then(() => console.log('Tabla de artistas creada'))
    .catch(err => console.error('Error al crear la tabla de artistas:', err));

sequelize.query(`
        CREATE TABLE IF NOT EXISTS Songs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(100),
            artistId INTEGER REFERENCES artists (id),
            releaseYear INTEGER,
            duration INTEGER,
            coverUrl VARCHAR(100)
        );
        `).then(() => console.log('Tabla de canciones creada'))
    .catch(err => console.error('Error al crear la tabla de canciones:', err));

module.exports = sequelize;
