var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    userpswd: String,
    logindata: Date
});

module.exports = mongoose.model('UserInfo', UserSchema, 'userinfo');