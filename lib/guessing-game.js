'use strict';

const superAgent = require('superagent');
const rl = require('readline');
const chalk = require('chalk');
const { createAudio } = require('node-mp3-player');
const Audio = createAudio();

const getSong = require('./get-song.js');
const userSchema = require('../model/user-schema.js');
const ReadUserModel = require('../model/user-model.js');
const readUser = new ReadUserModel(userSchema);

const prompt = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(chalk.green('Please provide your user name and password to sign-in'));

function guessingGame() {
  prompt.question(chalk.yellow('User name:'), function(name) {


    prompt.question(chalk.yellow('password:'), async function(password) {
  
      let findName = await readUser.read({username: name});
  
      for(let i = 0; i<findName.length; i++){
        let isSame = await findName[i].comparePassword(password);
  
        if(isSame){
         
        }
        else{
  
          console.log('wrong user name or password please try again');
          return
        }
        
      }
      prompt.question(chalk.yellow('Do you want to play Music Guessing Game?'), async function(res){
        if(res !== 'yes' && res !== 'y'){
          console.log('res', res);
          prompt.close();
          }
          await getRandomSong()
    
      });
      
    });
  });
}

prompt.on('close', function() {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function getRandomSong(){
  let url = `https://api.deezer.com/chart/`;
  let res = await superAgent.get(url);
  let randomTrack = getRandomInt(10);
  let randomTrackTwo = getRandomInt(10);
  let randomTrackThree = getRandomInt(10);
  while(randomTrack === randomTrackTwo || randomTrack === randomTrackThree ||randomTrackTwo === randomTrackThree) {
    randomTrackTwo = getRandomInt(10);
    randomTrackThree = getRandomInt(10);
  }
  
  let song = res.body.tracks.data[randomTrack];
  let wrongArtistOne = res.body.tracks.data[randomTrackTwo];
  let wrongArtistTwo = res.body.tracks.data[randomTrackThree];
  
  console.log('song', song.preview);
  // const myFile = await Audio(`${__dirname}/test.mp3`);
 
  // await myFile.play()
  await getSong(song);

//   prompt.question(chalk.yellow(`Who is the Artist of this song? A: ${wrongArtistOne.artist.name}, B: ${wrongArtistTwo.artist.name}, C: ${song.artist.name}`),

//   function(res){
//     if(res !== song.artist.name) {
//       prompt.question(chalk.yellow('Try Again!'), function)
//       prompt.close();
//     }
//   })
}


module.exports = guessingGame;