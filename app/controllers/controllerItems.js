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
        image : req.body.image,
        description : req.body.description,
        type : req.body.type,
        userOwnerId : req.body.user,
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
            sendJSONresponse(res, 200, item);
        }
    })
};

module.exports.getItem = function (req, res) {
    Item.findById(req.params.id, function (err, item) {
        if(err){
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, item);
        }
    })

};

module.exports.updateItem = function (req, res) {
        Item.findById(req.params.id, function (err, item) {
            if(item){
                item.name = req.body.name ? req.body.name : item.name;
                item.image = req.body.image ? req.body.image : item.image;
                item.description = req.body.description ? req.body.description : item.description;
                item.type = req.body.type ? req.body.type : item.type;
                item.save(function(err, item) {
                    if(err) {
                        sendJSONresponse(res, 404, err);
                    }
                    else {
                        sendJSONresponse(res, 200, item);
                    }
                })
            }
            else if(err){
                sendJSONresponse(res, 404, err);
            }
        })
};

