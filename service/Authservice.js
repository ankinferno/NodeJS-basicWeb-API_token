var crypto = require('crypto');
var dbservice = require('./Dbservice');
var nJWT = require('njwt');
var secureRandom = require('secure-random');
var express = require('express');
var Shaker = require('../service/Passwordservice');
var router = express.Router();



function TokenGenerateMiddleware(req, res, next) {

    // ********** get usernaem from request body :
    const name = req.body.username;
    const EnteredPassword = req.body.password;
    console.log('------------ Authservice log in : -- with ', name, EnteredPassword);


    var claims = {
        name: 'ankush'
    }

    console.log('\n\t-------------- NOW authService -> UNHASER ----------\n');


    Shaker.UnHasher(name, EnteredPassword).then((val) => {
        console.log('IF PART');
        var jwt = nJWT.create(claims, 'signingKey');
        var token = jwt.compact().trim();
        console.log('TOKEN GOT is : ', token);
        res.send({ 'tokenValue': token });
    }).catch((err) => {
        console.log('ELSE PART');
        res.send('NOT ABLE TO TOKENIZE error in password');
    });
}



function CheckTokenServiceMiddleware(req, res, next) {

    var token;
    let ReqHeaderString = req.headers.authorization.split(" ");
    token = ReqHeaderString[1];

    if (token) {
        nJWT.verify(token, 'signingKey', function(err, verified) {
            if (err) {
                console.log(err); // Token has expired, has been tampered with, etc
                res.send('Token has expired, has been tampered with, etc')

            } else {
                console.log('******* TOKEN VERIFIED : next protocol', verified); // Will contain the header and body
                next();
            }
        });
    } else {
        res.send('Error While parsing TOKEN from request Header');
    }


}

exports.TokenGenerateMiddleware = TokenGenerateMiddleware;
exports.CheckTokenServiceMiddleware = CheckTokenServiceMiddleware;