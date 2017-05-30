/**
 * Created by JEROEN on 5/15/2017.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');


var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {


    if(!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    user.password = req.body.password;
    user.profilePic = "";
    user.description = "";
    user.rating = 0;
    user.ownedItems = [];
    user.rentedItems = [];
    user.save(function(err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                user : user,
                "token" : token
            });
        }
    });
};

module.exports.login = function(req, res) {
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    passport.authenticate('local', function(err, user, info){
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if(user){
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                user : user,
                "token" : token
            });
            
            //res.render('index');
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};

module.exports.getUsers = function(req, res) {
    User.find({}, function (err, user) {
        if(err){
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, user);
        }
    })
};
module.exports.getUser = function(req, res) {
    User.findById(req.params.id, function (err, user) {
        if(err){
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, user);
        }
    })
};

