'use strict';

//Social Authentication Logic
//require('./auth')();

//Create IO Server instance
let ioServer = (app) => {
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    io.use((socket, next) => {
        require('./session')(socket.request, {}, next);
    });
    require('./socket')(io, app);
    return server;
};

module.exports = {
    //router: require('./routes'), //moramo je i pokrenut da instancira route
    session: require('./session'),
    ioServer
};

