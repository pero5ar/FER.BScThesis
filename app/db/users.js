var mongoose = require('mongoose');
var itemSchema = require('./items');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required: true},
    password : {type : String, required : true},
    profilePic : {type : String, "default" : ""},
    description : {type : String},
    rating : {type : Number, "default" : 0},
    ownedItems : {type : [itemSchema]},
    rentedItems : {type : [itemSchema]}
});

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id : this._id,
        email: this.email,
        name : this.name,
        exp : parseInt(expiry.getTime() / 1000),
    }, 'This is Secret')
};

mongoose.model('User', userSchema);

module.exports = {
    userSchema: userSchema
};
