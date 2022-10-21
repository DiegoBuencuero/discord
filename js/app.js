
var express =require('express');
const session = require('express-session');
const mysql = require ('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//const createError = require('http-errors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);

// conexion BBDD
var connection = mysql.createConnection({ // cada vez que llamo a connection crea una nueva conexion
     host: 'localhost',
     user: 'root',
     database: 'agroinnova',
     password: 'contraseña'
    });
    
app.locals= connection;


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


