var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

//connect mongoDB
var mongoose = require('mongoose');
var mongoURL = 'mongodb://localhost/test';
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error:'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000*60*10 //过期时间
    }
}));
app.use(function(req, res, next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  if(err) res.locals.message = '<div style="margin-bottom:20px;color:red;">' + err + '</div>';
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/out', require('./routes/loginout'));

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

module.exports = app;
