const express = require("express");

const router = require("./src/routes/movieRoutes");
const sequelize = require("./src/db/sequelize");
const { port } = require("./src/config/env");

async function main() {

    const app = express();

    app.use(express.json());


    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    app.get("/", function (req, res) {
        res.send("Hello World");
    });

    app.use(router);

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}

main();
