'use strict';

const express = require('express');
const app = express();
const multimedia_lib = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public')); //middleware that implements streams
app.set('view engine', 'ejs');


app.use(multimedia_lib.session);
app.use(passport.initialize());
app.use(passport.session()); //connecting serialize and deserialize methods

app.use('/', multimedia_lib.router);


multimedia_lib.ioServer(app).listen(app.get('port'), () =>{
    console.log('Multimedia_lib is running on port: ', app.get('port'));
});