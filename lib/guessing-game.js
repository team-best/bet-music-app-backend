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

// global variable
let findName;

const singUpOrSignin = () => {
  prompt.question(chalk.hex('#DEADED').bold('Do you want to signUP? Enter yes or no '), function (sign) {
      if(sign === 'y' || sign === 'yes'){
        signUPUser()
      }else{
        guessingGame()
      }
  })
}

const signUPUser = () => {
  prompt.question('User name:',async function(name) {
    prompt.question('password:',async function(password) {
      let addUserName = await readUser.create({username: name, password: password})
      if(addUserName !== false){
        playGuessingGame();
      }else {
        singUpOrSignin();
      } 
    })
  })
}

const guessingGame = () => {
  console.log('Please Sign-in')
  prompt.question(chalk.yellow('User name:'), async function(name) {

       findName = await readUser.read({username: name});
       if(findName.length === 0){
         console.log('Incorrect user name or password. Please try again.');
         guessingGame();
        }else {
         guessingGamePassword()
         
       }
    });
    
  }
  
const guessingGamePassword = () => {
    prompt.question(chalk.yellow('Password:'), async function(password) {
      for(let i = 0; i < findName.length; i++){
        let isSame = await findName[i].comparePassword(password);
          
    
      if(isSame){
        playGuessingGame (); 
      } 
    else console.log('Incorrect user name or password. Please try again.');
    }
      playGuessingGame();
  });
};

 
const playGuessingGame = () => {
  prompt.question(chalk.yellow('Do you want to play Music Guessing Game? Enter yes or no: '), async function(res){
    if(res !== 'yes' && res !== 'y'){
      prompt.close();
      }
      await getRandomSong()

  });
}
prompt.on('close', function() {
  console.log('\nThank you for playing !!!');
  process.exit(0);
});

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const getRandomSong = async () => {
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
  
  const options = [song, wrongArtistOne, wrongArtistTwo];

  let randomOne = getRandomInt(3);
  let randomTwo = getRandomInt(3);
  let randomThree = getRandomInt(3);
  while(randomOne === randomTwo || randomOne === randomThree || randomTwo === randomThree) {
    randomTwo = getRandomInt(3);
    randomThree = getRandomInt(3);
  }

  let a = options[randomOne];
  let b = options[randomTwo];
  let c = options[randomThree];

  let correctAnswer = null;
  if(a === song){
    correctAnswer = 'a';
  }
  if(b === song){
    correctAnswer = 'b';
  }
  if(c === song){
    correctAnswer = 'c';
  }
  
  await getSong(song);
  songQuestion(a, b, c, correctAnswer);
}

const songQuestion = (a, b, c, correctAnswer) => {
  console.log(chalk.green('Who is the Artist of this song? Choose: A, B, or C '));
    prompt.question(chalk.yellow(`A: ${a.artist.name}, B: ${b.artist.name}, C: ${c.artist.name}  `),

    function(response){
      response.toLowerCase();
      if(response !== correctAnswer) {
        tryAgainQuestion(correctAnswer);
      }
      else {
        console.log(chalk.green('You are correct!'));
        playAgainQuestion()
      };
    })
  }
 
  const tryAgainQuestion = (correctAnswer) => {
    prompt.question(chalk.yellow('Try Again!  '), 
          function(responseTwo) {
            responseTwo.toLowerCase();
            if(responseTwo !== correctAnswer) {
              console.log(chalk.yellow(`Sorry Wrong Again! The correct artist is ${correctAnswer}.`)); 
              playAgainQuestion();
            }
            else {
              console.log(chalk.green('You are correct!'));
              playAgainQuestion()
            };
          }
        )
  }

  const playAgainQuestion = () => {
    prompt.question(chalk.yellow('Do you want to play again? Enter y or n:  '), 
  
    function(responsePlayAgain) {
      if(responsePlayAgain !== 'yes' && responsePlayAgain !== 'y') {
        prompt.close();
      }
      else {
        getRandomSong();
      }
    });
  }


module.exports = singUpOrSignin;