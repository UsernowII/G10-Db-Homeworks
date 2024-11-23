const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Artist = require('./models/Artist');
const Song = require('./models/Song');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

sequelize.sync({ force: false }).then(() => {
  console.log('Database connected!');
});

app.use('/artists', require('./routes/artists'));
app.use('/songs', require('./routes/songs'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
