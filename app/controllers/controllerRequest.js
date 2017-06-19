/**
 * Created by HP on 18.6.2017..
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');
var Claim = mongoose.model('Claim');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.userRequest = function (req, res) {

    Claim.create({
        itemId : req.body.itemId,
        userOwnerId : req.body.userOwnerId,
        userHolderId : req.body.userHolderId,
        date : Date.now()
    }, function (err, claim) {
        if(err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, claim)
        }
    })

};

module.exports.userRequestOwner = function (req, res) {

    Claim.find({userOwnerId : req.params.id}, function (err, user) {
        if(err){
            sendJSONresponse(res, 404, err)
        } else {
            sendJSONresponse(res, 200, user)
        }
    })
};

module.exports.getAllRequests = function (req, res) {

    Claim.find({}, function (err, user) {
        if(err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, user);
        }
    })
};

module.exports.getAllUserClaims = function (req, res) {
  Claim.find({userHolderId : req.params.id}, function (err, user) {
      if(err) {
          sendJSONresponse(res, 404, err);
      } else {
          sendJSONresponse(res, 200, user);
      }
  })
};

module.exports.cancelRequest = function cancelClaim(req, res) {
    Claim.findById(req.params.id, function (err, claim) {
        if(err) {
            sendJSONresponse(res, 404, err);
        } else {
            claim.remove();
            sendJSONresponse(res, 200, claim);
        }
    })
};

module.exports.acceptRequest = function (req, res) {

    Claim.findById(req.params.id, function (err, claim) {
        if(err) {
            sendJSONresponse(res, 404, err);
        } else {
            Item.findById(claim.itemId, function (err, item) {
                if(err) {
                    sendJSONresponse(res, 404, err);
                } else {
                    item.userHolderId = claim.userHolderId;
                    item.save(function(err) {
                        if(err) {
                            sendJSONresponse(res, 404, err);
                        }
                    })
                }
            });
        }
    });
    Claim.findById(req.params.id, function (err, claim) {
        if(err) {
            sendJSONresponse(res, 404, err);
        } else {
            claim.remove();
        }
    })

};

module.exports.getAllRequestsForItem = function (req, res) {

    Claim.find({itemId : req.params.id}, function (err, claim) {
        if(err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, claim);
        }
    })

};

module.exports.getUsersRequest = function (req, res) {

    Claim.find({itemId : req.params.id}, function (err, claim) {
        if(err) {
            sendJSONresponse(res, 404, err);
        } else {
            //sendJSONresponse(res, 200, claim);
            User.find({userHolderId : claim.userHolderId}, function (err, user) {
                if(err){
                    sendJSONresponse(res, 404, err);
                } else {
                    sendJSONresponse(res, 200, user);
                }
            })
        }
    })

};
