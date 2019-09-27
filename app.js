var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var INDEXrouter = require('./routes/IndexRoute');
var DBRouter = require('./routes/DbRoutes');
var LoginRouter = require('./routes/LoginRoutes');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var url = 'mongodb+srv://ankush:AJ12345678@cluster0-drgky.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + url + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + url);
    }
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')
app.use(logger('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// ***** ROUTES ARE HERE ===============================================
app.use('/login', LoginRouter);
app.use('/', INDEXrouter);
app.use('/db', DBRouter);

//----------------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app