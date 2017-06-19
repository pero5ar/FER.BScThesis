/**
 * Created by HP on 18.6.2017..
 */

var mongoose = require('mongoose');

var claimSchema = new mongoose.Schema({
    itemId : {type : String},
    userOwnerId : {type : String},  //on prima request
    userHolderId : {type : String}, //on radi request
    date : {type : Date}
});

mongoose.model('Claim', claimSchema);

module.exports = {
    claimSchema : claimSchema
};

