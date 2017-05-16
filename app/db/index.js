'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
var userSchema = new Mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    profilePic: String,
    rating : Number,
    numOfItems : Number,
    numOfRentItems : Number

});
const item = new Mongoose.Schema({
    itemId: String,
    itemName: String,
    itemImage: String,
    itemType: String,
    itemOwnerId: String,
    itemHolderId: String
});

//methods for userSchema
userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, 'thisIsSecret' );
};

//for using instance of that schema we need to turn this into model
let userModel = Mongoose.model('users', users);
let itemModel = Mongoose.model('items', item);
let userModel1 = Mongoose.model('user', userSchema);
/*
var hardCodeItem = new itemModel({
    itemId: "1",
    itemName: "probaItem",
    itemImage: "stringZaSliku",
    itemType: "knjiga",
    itemOwnerId: "ownersId",
    itemHolderId: ""
});
for a in db.hardCodeItem{

}
if(hardCodeItem.id.equal(db.hardCodeItem.))
hardCodeItem.save(function (error) {
   console.log("Your item has been saved!")
    if(error){
       console.log(error);
    }
});
*/

//for using instance of that schema we need to turn this into model
module.exports = {
    Mongoose,
    userModel,
    itemModel,
    userModel1
};