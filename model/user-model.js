'use strict';

// Internal Resources
const schema = require('./user-schema');
const Model = require('./model');

//A Class for the user collection in our DB
class User extends Model {
    constructor () {
        super(schema);
    }
}

module.exports = User;
