
'use strict';

require('dotenv').config();
const app = require ('./lib/server.js');
const port = process.env.PORT;
const mongodb = process.env.MONGODB_URI;


app.start(port, mongodb);



