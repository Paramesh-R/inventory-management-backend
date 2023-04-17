// Dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ================Router imports================
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var buyerRouter = require('./routes/buyer');
var productRouter = require('./routes/product');
var customersRouter = require('./routes/customers');
var purchaseRouter = require('./routes/purchase');
var salesRouter = require('./routes/sales');



// ================================================
const connectDB2 = require('./config/db');
const cors = require(`cors`);
const dotenv = require('dotenv').config();


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// <============= START Handle CORS ====================>
const corsConfig0 = {
  credentials: true,
  origin: true,
};
const corsConfig1 = {
  credentials: true,
  origin: "*",
};
app.use(cors(corsConfig0));       // app.use(cors());
// <============= END Handle CORS ====================>

// Establish Database connection
connectDB2()                                        
/* ************************************************************************** */





app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/buyer', buyerRouter);
app.use('/api/product', productRouter);
app.use('/api/customer', customersRouter);
app.use('/api/purchase', purchaseRouter);
app.use('/api/sales', salesRouter);
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
