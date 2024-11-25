import { DataTypes } from "sequelize";
import { connection } from "../db/sequelize.js";

export const Song = connection.define('song', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    duration: {
        type: DataTypes.INTEGER, // En segundos
        allowNull: true,
    },
    coverUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    timestamps: false,
});

