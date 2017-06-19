var mongoose = require('mongoose');
var userSchema = require('./users');


var itemSchema = new mongoose.Schema({
    name: {type: String, require: true},
    image: {type: String, "default": ""},
    description: {type: String},
    type: {type: String},
    userOwnerId: {type: String},
    userHolderId: {type: String}
});

mongoose.model('Item', itemSchema);

module.exports = {
    itemSchema : itemSchema
};