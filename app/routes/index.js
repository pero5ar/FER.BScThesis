'use strict'
var express = require('express');
var router = express.Router();
var controllerUsers = require('../controllers/authentication');
var controllerItems = require('../controllers/controllerItems');
var controllerRequest = require('../controllers/controllerRequest');


//registracija i login
router.post('/register', controllerUsers.register);
router.post('/login', controllerUsers.login);
//users
router.get('/users', controllerUsers.getUsers);
router.get('/users/:id', controllerUsers.getUser);
router.post('/user/:id',controllerUsers.updateUser);
//items
router.post('/item', controllerItems.insertItem);
router.get('/items', controllerItems.getItems);
router.get('/items/:id', controllerItems.getItem);
router.post('/item/:id', controllerItems.updateItem);
router.delete('/item/:id', controllerItems.deleteItem);
router.get('/userOwnerItems/:id', controllerItems.userOwnerItems);
router.get('/userHolderItems/:id', controllerItems.userHolderItems);
//user requests to items
router.post('/userRequest', controllerRequest.userRequest);
router.get('/userRequestOwner/:id', controllerRequest.userRequestOwner);
router.get('/getAllRequests', controllerRequest.getAllRequests);
router.get('/getUserClaims/:id', controllerRequest.getAllUserClaims);
router.delete('/cancelRequest/:id', controllerRequest.cancelRequest);
router.post('/acceptRequest/:id', controllerRequest.acceptRequest);
router.get('/itemRequests/:id', controllerRequest.getAllRequestsForItem);
router.get('/itemUserHolder/:id', controllerRequest.getUsersRequest);
router.post('/itemReturn/:id', controllerRequest.itemReturn);
router.get('/getUserClaimsDetails/:id', controllerRequest.getAllUserClaimsDetails);
router.get('/userClaimsOwnerDetails/:id', controllerRequest.userClaimsOwnerDetails);

module.exports = router;

/*
module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
               res.render('login');
            },

            '/home': (req, res, next) => { //neka bude i u reactu pocetna home
                res.render('index');
            },

            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/home',
                failureRedirect: '/'
            }),


        },

        'post': {
            '/register': controllers.register,
            '/login':    controllers.login



        },
        'NA': {

        }
    };
    return h.route(routes);
};
*/