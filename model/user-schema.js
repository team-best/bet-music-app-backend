'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},

});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);

});
userSchema.methods.comparePassword = function(password) {
    return  bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

module.exports = mongoose.model('username', userSchema);
