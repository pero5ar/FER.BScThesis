'use strict'
const h=require('../helpers');
const passport = require('passport');
const config = require('../config');
const controllers = require('../controllers/authentication');

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