var express = require('express');
var router = express.Router();
var service = require('../service/Dbservice');
var AuthService = require('../service/Authservice');
var CheckToken = AuthService.CheckTokenServiceMiddleware;
var User = require('../models/User');
var shaker = require('../service/Passwordservice');

router.post('/create', CheckToken, function(req, res) {
    pass = req.body.pass;
    name = req.body.name;

    var StrongPassObj = shaker.SaltHasher(pass);
    console.log('!!!!! HAsh from function -------', StrongPassObj);

    let TempUser = new User({ username: name, password: StrongPassObj.passwordHash, salt: StrongPassObj.salt });

    console.log('!!!!! tEMPUSER BEING SAVED-------', TempUser);
    service.AddUser(TempUser).then(user => {
        res.send(user);
    });


});

router.get('/show', CheckToken, function(req, res) {
    service.FindUser().then(users => {
        console.log('here is x : ', users);
        res.send(users);
    });


});

module.exports = router;