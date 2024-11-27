import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Artist = sequelize.define('Artist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Artist;
