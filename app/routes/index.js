'use strict'
var express = require('express');
var router = express.Router();
var controllerUsers = require('../controllers/authentication');
var controllerItems = require('../controllers/controllerItems');

router.post('/register', controllerUsers.register);
router.post('/login', controllerUsers.login);
router.get('/users', controllerUsers.getUsers);
router.get('/users/:id', controllerUsers.getUser);
router.post('/item', controllerItems.insertItem);
router.get('/items', controllerItems.getItems);
router.get('/items/:id', controllerItems.getItem);



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