import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Song = sequelize.define('Song', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artistId: {
      type: DataTypes.INTEGER,
      references: {
        model: Artist,
        key: 'id',
      },
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coverUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });





