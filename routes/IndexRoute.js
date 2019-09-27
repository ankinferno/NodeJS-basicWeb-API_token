var express = require('express');
var router = express.Router();
var authmiddleware = require('../service/Authservice');
var Shaker = require('../service/Passwordservice');
var checktoken = authmiddleware.CheckTokenServiceMiddleware;

router.get('/', checktoken, function(req, res) {

    password = 'ankush'
    console.log('NOW CALLING HASHER SALTER ------------------- on pswrd : ankush');
    var output = Shaker.SaltHasher(password);
    console.log('/n OUTPUT OF SHAKER ------------------- on pswrd : ankush', output);

    res.send('You are LOGGED In using TOKEN . SUCCESS');

});



module.exports = router;