'use strict';

const express = require('express');
const app = express();
const multimedia_lib = require('./app');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const fs = require('fs');
require('./app/db/index');
require('./app/config/passport');

require('./app/db/index');
require('./app/config/passport');
app.use(bodyParser.json({extend : false}));
app.use(bodyParser.urlencoded({extend : false}));
app.set('port', process.env.PORT || 3000);
app.use(express.static('public')); //middleware that implements streams
app.set('view engine', 'ejs');


app.use(multimedia_lib.session);

app.use(passport.initialize());
app.use(passport.session()); //connecting serialize and deserialize methods

app.use('/', multimedia_lib.router);

app.get('*', (req,res) => {
    res.sendFile(path.resolve('views/index.ejs'));
});




multimedia_lib.ioServer(app).listen(app.get('port'), () =>{
    console.log('Multimedia_lib is running on port: ', app.get('port'));
});