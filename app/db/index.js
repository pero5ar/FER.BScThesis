'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);
//const Mongoose = require('mongoose').connect(config.dbURI);

//Log an error if the connection fails

Mongoose.connection.on('error', error => {
    console.log("MongoDB Error: ", error);
});


//Create a Schema that defines the structure for storing user data
const users = new Mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String,
    rating : Number,
    NumOfBooks : Number,
    NumOfRentBooks : Number
});

//for using instance of that schema we need to turn this into model
let userModel = Mongoose.model('users', users);

//for using instance of that schema we need to turn this into model
module.exports = {
    Mongoose,
    userModel
};