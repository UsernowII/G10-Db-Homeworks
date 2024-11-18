import { DataTypes } from "sequelize";
import { connection } from "../../db/sequelize.js";
import { Document } from "./document.model.js";

export const Person = connection.define("person", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
  },
},{
    timestamps: false,
}
);
// Relación Uno-a-Muchos
Artist.hasMany(Song, {
  foreignKey: "artistId",
  sourceKey: "id",
  as: "songs", // Alias para facilitar consultas
});

Song.belongsTo(Artist, {
  foreignKey: "artistId",
  targetKey: "id",
  as: "artist", // Alias para facilitar consultas
});

export { Artist, Song };