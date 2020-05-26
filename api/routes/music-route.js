'use strict';

const express = require('express');
const router = express.Router();


const Music = require('../model/music-schema.js');




router.get('/allMusics', async (req, res) => {
  try {
    let music = await Music.find();
    res.status(200).json(music);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/newMusic', async (req, res) => {
  try {
    const music = new Music({
      title:req.body.title,
      artist:req.body.artist,
      music:req.file,
    });

    let newMusic = await music.save();
    res.status(200).send({ data: newMusic });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.delete('/deleteMusic', async (req, res) => {
  try {
    const id = req.params.musicId;
    let result = await Music.remove({ _id: id });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;
