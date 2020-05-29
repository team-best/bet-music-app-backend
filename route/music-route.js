'use strict';

const express = require('express');
const superagent = require('superagent');
const router = express.Router();




router.get('/song', (req, res) => {

  let title = req.body.title;
  let artist = req.body.artist;
  let preview= req.body.preview;


  const url = `https://api.deezer.com/chart/`;




  superagent.get(url)
    .then(data => {
      // verify array has link
      const songToPlay = data.body.tracks.data.map(songFile => {
        return new Song(songFile);
      });


      res.status(200).send(songToPlay);
      let newSong =  songToPlay[Math.floor(Math.random()*songToPlay.length)];
      console.log('magic', newSong);

    })

    .catch(() => {
      errorHandler('If you did not get result. Please, try again', res);
    });

});



function Song (thissongData) {
  this.name = thissongData.artist.name;
  this.title = thissongData.title;
  this.preview = thissongData.preview;

}



function errorHandler(string, res) {
  res.send(string);
}



module.exports = router;
