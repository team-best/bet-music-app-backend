'use strict';
const superagent = require('superagent');
const util = require('util');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

const { createAudio } = require('node-mp3-player');
const Audio = createAudio();
const MP3Cutter = require('mp3-cutter');

const playMusic = async (song) => {
    await downloadMusic(
        song.title,
        song.preview,
    );

    await MP3Cutter.cut({
        src: `${__dirname}/mp3-downloads/${song.title}.mp3`,
        target: `${__dirname}/mp3-downloads/${song.title}-1.mp3`,
        start: 0,
        end: 7
    });
    
    const myFile = await Audio(`${__dirname}/mp3-downloads/${song.title}-1.mp3`);
    myFile.play();
};

const downloadMusic = async (name, url) => {
    fs.createWriteStream(`${__dirname}/mp3-downloads/${name}.mp3`);
    let response = await superagent.get(url);
    let musicFile = response.body;

    await writeFile(`${__dirname}/mp3-downloads/${name}.mp3`, musicFile);
};

module.exports = playMusic;