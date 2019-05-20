// Import packages
const express = require('express');
const path = require('path');
var cors = require("cors");

// App
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/server.routes'));

//Static file declaration
app.use(express.static(path.join(__dirname, 'Team13-front/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'Team13-front/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'Team13-front/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/Team13-front/public/index.html'));
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})

//Export for testing
module.exports = app;