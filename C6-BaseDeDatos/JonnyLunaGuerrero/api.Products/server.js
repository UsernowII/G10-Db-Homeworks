//const express = require('express')
//const app = express()
const app = require('./src/app');
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});