/**
 * Created by JEROEN on 5/25/2017.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.insertItem = function (req, res) {
    Item.create({
        name : req.body.name,
        image : "",
        description : req.body.description,
        type : req.body.type,
        userOwnerId : "",
        userHolderId : ""
    }, function (err, item) {
        if(err){
           sendJSONresponse(res, 404, err);
        }
        else{
            sendJSONresponse(res, 200, item);
        }

    })
};

module.exports.getItems = function (req, res) {
    Item.find({}, function (err, item) {
        if(err){
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 404, item);
        }
    })
};