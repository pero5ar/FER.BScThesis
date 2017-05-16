/**
 * Created by JEROEN on 5/15/2017.
 */

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('user');
const bodyParser = require('body-parser');
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
    user.rating = 0;
    user.profilePic = "";
    user.numOfItems = 0;
    user.numOfRentItems  = 0;
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
    console.log(req.body.name);
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
                "token" : token
            });
            
            //res.render('index');
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};
