'use strict';

const session  = require('express-session');
const mongoStore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db');

if(process.env.NODE_ENV === 'production') {
    //session settings for production
    module.exports = session({
        secret:config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({
            mongooseConnection: db.Mongoose.connection
        })
    });
} else {
    //session settings for development
    module.exports = session({
        secret:config.sessionSecret,
        resave: false,
        saveUninitialized: true
    })
}
