'use strict';

const db = require('../db');
const crypto = require('crypto');

let findOneUser;
findOneUser = profileID => {
    return db.userModel.findOne({
        'profileId': profileID
    }); //returns promise!!!!
};

let createNewUser;
createNewUser = function(profile) {
    return new Promise((resolve, reject) => {
        console.log("usli smo");
        let newUser = new db.userModel({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value || '',
            rating: 0,
            NumOfBooks : 0,
            NumOfRentBooks : 0
        });
        newUser.save(function (error) {
            if(error) {
                reject(error);
            }
            else{
                console.log("usli smo");
                resolve(newUser);
            }
        });
    });
};


let findById = function (id) {
    return new Promise((resolve, reject) => {
        db.userModel.findById(id, (error, user) => {
            if(error) {
                reject(error);
            } else {
                resolve(user);
            }
        });
    });
};


//A middleware that checks to see if the user is authenticated and logged in
let isUserAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

// A function that generates a unique roomID
let randomHex = () =>{
    return crypto.randomBytes(24).toString('hex');
};


module.exports = {
    isUserAuthenticated,
    randomHex,
    findOneUser,
    createNewUser,
    findById
};


