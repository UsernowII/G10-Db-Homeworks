import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { sequelize } from './index.js';
import Song from './Song.js';


export const Artist = sequelize.define('Artist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});

Artist.associate = (models) => {
    Artist.hasMany(models.Song, { foreignKey: "artistId", as: "Songs" });
};

Song.associate = (models) => {
  Song.belongsTo(models.Artist, { foreignKey: "artistId", as: "Artist" });
};


