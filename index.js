'use strict';

require('dotenv').config();
const app = require ('./lib/server.js');
const port = process.env.PORT;
const mongodb = process.env.MONGODB_URI;
// const singUpOrSignin = require('./lib/guessing-game.js');

app.start(port, mongodb);
// singUpOrSignin();


