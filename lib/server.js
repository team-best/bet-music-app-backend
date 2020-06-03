'use strict';

// Esoteric Resources
const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('../route/user-route.js');
const generateSwagger = require('../docs/swagger.js');



//Server Instantiation
const app = express();
app.use(cors());
app.use(express.urlencoded())
app.use(express.json());
generateSwagger(app);



app.get('/', (req, res, next) => {
  res.send('<body bgcolor="#42A0AD"><h1>HomePage <br> <h2>Midterm Project — Song Guessing Game </h2><h3 style="color: #f0e9e9;">Create an app that will allow a user to guess the correct title and artist from a snippet of song. The user can guess the artist of the song. If the user failed to answer correctly, the app will give the user the correct answer.</h3><br><h4 style="color: #1f1a1a;">Author: <br> Blandine Dasilveira <br> Eyob Tamir <br>Sue Duclos<br> Thomas Tilahun</h4>')

});

const startServer = (port, mongodb) => {
  let option = {

    useNewUrlParser: true,
    useUnifiedTopology: true,

  };
  mongoose.connect(mongodb, option);
  app.listen(port, () => {

  });
  mongoose.set('useCreateIndex', true);
};

app.use(userRoute);


module.exports = {

      server: app, 
      start: startServer
};


