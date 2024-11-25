import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Artist from './artist.js';  // Importa el modelo Artist

const Song = sequelize.define('Song', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  coverUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Establecer relación entre Song y Artist
Song.belongsTo(Artist, { foreignKey: 'artistId' });

export default Song;
