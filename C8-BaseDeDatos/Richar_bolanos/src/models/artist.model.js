import { DataTypes } from "sequelize";
import { connection } from "../db/sequelize.js";

export const Artist = connection.define('artist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
