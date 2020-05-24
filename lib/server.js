'use strict';

require('dotenv').config();

const express = require ('express');
const app = express();
const cors = require('cors');
app.use(cors());


const startServer = (port) => {
  app.listen(port, () => {
    console.log('Server is up and running on port', port);
  });
};


module.exports = {server: app, start: startServer};


