var express = require('express');
var router = express.Router();
var Authservice = require('../service/Authservice');
var TokenGenerateMiddleware = Authservice.TokenGenerateMiddleware;

router.post('/', TokenGenerateMiddleware, (req, res, next) => {

    res.send(' You have successfully created  TOKENS * , visit other routes with the token');

});


module.exports = router;