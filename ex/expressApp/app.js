var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
const trgovinaRouter = require('./routes/trgovina');
const uporabnikiBazaRouter = require('./routes/uporabnikiBaza')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 2); // da bo vračalo lepši JSON
app.use(cors());

app.use('/', indexRouter);
app.use('/shop/', trgovinaRouter);
app.use('/uporabniki', uporabnikiBazaRouter);


module.exports = app;
