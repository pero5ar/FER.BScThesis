'use strict'
const h=require('../helpers');
const passport = require('passport');
const config = require('../config');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('index')
            },
            '/home': (req, res, next) => {
                res.send('Welcome')
            },
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/home',
                failureRedirect: '/'
            }),
        },

        'post': {

        },
        'NA': {

        }
    };
    return h.route(routes);
};