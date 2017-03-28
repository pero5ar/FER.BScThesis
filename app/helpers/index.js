'use strict';


const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');



let _registerRoutes = (routes, method) => {
    for (let key in routes) {
        if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {  //mora biti objekt ali ne null ni array
            _registerRoutes(routes[key], key)    //invoke funkcije kojoj u prvom argumentu predajemo route a u drugom metodu(get, post, NA u ovom slucaju)
        } else {
            //Register the routes
            if (method === 'get') {
                router.get(key, routes[key]);
            } else if (method === 'post') {
                router.post(key, routes[key]);
            }
        }
    }
};

let route = function (routes) {
    _registerRoutes(routes);
    return router;
};

let findOneUser;
findOneUser = profileID => {
    return db.userModel.findOne({
        'profileId': profileID
    }); //returns promise!!!!
};

let createNewUser;
createNewUser = function(profile) {
    return new Promise((resolve, reject) => {
        let newUser = new db.userModel({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value || ''
        });
        newUser.save(function (error) {
            if(error) {
                reject(error);
            }
            else{
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
    route,
    isUserAuthenticated,
    randomHex,
    findOneUser,
    createNewUser,
    findById
};


