import express from 'express';
import sequelize from './config/database.js';
import artistRoutes from "./routes/artists.js";
import songRoutes from "./routes/songs.js";
import bodyParser from 'body-parser';
import './models/index.js';
//import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json());

/*
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected!');
});
*/
app.use("/api/artists", artistRoutes);
app.use("/api/songs", songRoutes);

sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

//app.use(routes);
/*
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/