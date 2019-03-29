// Import packages
const express = require('express');

// App
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/server.routes'))


const port = '3001';

// Starting server
app.listen(port);
console.log("Listening on port: "+port);

//Export for testing
module.exports = app;