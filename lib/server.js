'use strict';

// Esoteric Resources
const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('../route/user-route.js')
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';


//Server Instantiation
const app = express();
app.use(cors());
app.use(express.urlencoded())

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

MongoClient.connect(url, (err, db) => {
  if(err){
    console.error('something is going on');
  }
  let dbName = db.db('401midterm-app')
  dbName.collection('usernames').find({}).toArray(function(err, result){
    if(err){
      console.error('2errro')
    }
    console.log(result)
    db.close();
  })
})

app.use(userRoute);


module.exports = {

      server: app, 
      start: startServer
};


