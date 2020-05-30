
'use strict';

require('dotenv').config();
const app = require ('./lib/server.js');
const port = process.env.PORT;
const mongodb = process.env.MONGODB_URI;
const userSchema = require('./model/user-schema.js');
const ReadUserModel = require('./model/user-model.js');

const readUser = new ReadUserModel(userSchema);

app.start(port, mongodb);
const superAgent = require('superagent');
const rl = require('readline');
const chalk = require('chalk');
const { createAudio } = require('node-mp3-player');
const Audio = createAudio();

const prompt = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});


console.log(chalk.bold('please provide your user name and password to sign-in'));

prompt.question(chalk.blue('User name:'), function(name) {


  prompt.question(chalk.blue('password:'), async function(password) {

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
    prompt.question(chalk.blue('Do you want to play the song'), async function(res){
        if(res === 'yes' || 'y'){
          await getRandomSong()
        }
        prompt.close();
    });
    
  });
});




prompt.on('close', function() {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});

async function getRandomSong(){
  let url = `https://api.deezer.com/chart/`;
  let res = await superAgent.get(url);
  let song = res.body.tracks.data[0];
  
  console.log('song', song.preview);
  const myFile = await Audio(`${__dirname}/test.mp3`);
 
  await myFile.play()
  
}