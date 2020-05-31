// import superagent so that we can make a "GET" request
const superagent = require('superagent');

// import util (built-in package) so that we can make fs functions
// into Promise based functions instead of callback based. This lets
// us use async/await, which is nice!
const util = require('util');

// import fs (built-in package) so that we can create and save the
// music file
const fs = require('fs');

// instead of using fs.writeFile (which uses callbacks), we're going
// to promisify it, which allows us to use async/await keywords with
// this function
const writeFile = util.promisify(fs.writeFile);

// Now we create an audio player using node-mp3-player
const { createAudio } = require('node-mp3-player');
const Audio = createAudio();

// This is our main async function that is being called in this app
const playMusic = async (song) => {
    // node-mp3-player only works with downloaded files, so we can't
    // just give it a URL. So, first we're going to attempt to download
    // the file using the downloadMusic() function we've defined below
    // console.log("here");
    // await downloadMusic(
    //     song.title,
    //     song.preview,
    // );
    await downloadMusic(
      'test',
      'http://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
  );

    // Once the file has been downloaded, we can reference it and try to play
    const myFile = await Audio(`${__dirname}/mp3-downloads/test.mp3`);
    await myFile.play();
};

// This is our main async function for downloading an mp3 file from the internet
// The parameter name is going to be the name of our mp3 file
// The parameter url is where we can find that file on the web
const downloadMusic = async (name, url) => {
    // first, we create a placeholder empty file within our directory
    // specifically, in the mp3-downloads subdirectory
    // console.log("name", name);
    // console.log("dirName", __dirname);
    let file = fs.createWriteStream(`${__dirname}/mp3-downloads/${name}.mp3`);
    // console.log("file", file);
    // Now, we get the mp3 file data (as a Buffer) from the url using
    // superagent. Response.body should now be a buffer of data representing
    // the music file
    let response = await superagent.get(url).buffer(true).set('Content-Type', 'text/plain');
    let musicFile = await Buffer.from(response.text);
    // console.log("response", response);
    // console.log(Buffer.from(musicFile));
    console.log(response.body);
    // console.log(response.text);
    console.log(url);

    // We now write the Buffer data to the placeholder file we created
    await writeFile(`${__dirname}/mp3-downloads/${name}.mp3`, musicFile);
};

// This kicks everything off!
// playMusic();

module.exports = playMusic;