'use strict';

// Esoteric Resources
const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');


//Server Instantiation
const app = express();
app.use(cors());

const startServer = (port, mongodb) => {
  let option = {

    useNewUrlParser: true,
    useUnifiedTopology: true,

  };
  mongoose.connect(mongodb, option);
  app.listen(port, () => {
    console.log('Server is Up and Running on :', port)
  });
};


module.exports = {

      server: app, 
      start: startServer
};


