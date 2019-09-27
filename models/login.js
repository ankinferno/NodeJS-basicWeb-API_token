var mongoose = require('mongoose');

var Login = mongoose.Schema({
    Loginusername: { type: String, required: true },
    Loginpassword: { type: String, required: true }
});

module.exports = mongoose.model('Login', Login);