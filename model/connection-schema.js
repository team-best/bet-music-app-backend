'use strict';

//This will be the mongoose schema for connection, 
//represent the allowed data and it's type
//And will be the socket.Id 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new mongoose.Schema ({
    connection: {type: String, required: true},
    user: {type: Schema.Types.ObjectId},
});

module.exports = mongoose.model('connection', connectionSchema);