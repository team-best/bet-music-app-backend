
'use strict';

require('dotenv').config();
const app = require ('./lib/server.js');
const port = process.env.PORT;
const mongodb = process.env.MONGODB_URI;
const userSchema = require('./model/user-schema.js');
const ReadUserModel = require('./model/user-model.js');

const readUser = new ReadUserModel(userSchema);

app.start(port, mongodb);
const rl = require('readline');
const chalk = require('chalk');

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
        return findName[i];
      }
      else{
        console.log('wrong user name or password please try again');
      }

    }

    prompt.close();
  });
});




prompt.on('close', function() {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});
