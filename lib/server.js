'use strict';

// Esoteric Resources
const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const morgan = require('morgan');
const superagent = require('superagent');

// const config = require('../config/db');
const userRoutes = require('../api/routes/music-route.js');
const spotifyRoute = require('../api/routes/spotify-route.js');
const Music = require('../api/model/music-schema.js');



//Server Instantiation
const app = express();
app.use(cors());

//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));



// define home route

app.get('/', (req, res, next) => {
  console.log('here');
  res.send('Homepage');
});


app.use(spotifyRoute);
app.use('/user', userRoutes);








// app.get('/music', (request, response) => {

//   let title = request.query.title;
//   let artist = request.query.artist;
  // let {latitude, longitude} = request.query;

//   const url = `https://api.deezer.com/chart/${title},${artist}`;

//   superagent.get(url)
//     .then(data => {
//       const playMusic = data.body.data.map(day => {
//         return new Music();
//       });
//       response.status(200).send(playMusic);
//       console.log('good', request.body);
//     })
//     .catch(() => {
//       errorHandler('If you did not get result. Please, try again', request, response);
//     });

// });


// function errorHandler(string, response) {
//   response.status(500).send(string);
// }




const startServer = (port, mongodb) => {
  let option = {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

  };

  mongoose.connect(mongodb, option);

  app.listen(port, () => {
    console.log('Server is Up and Running on :', port);
  });
};


module.exports = {

  server: app,
  start: startServer,
};


