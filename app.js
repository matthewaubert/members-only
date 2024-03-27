require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session'); // https://github.com/expressjs/session
const passport = require('passport');
const MongoStore = require('connect-mongo'); // https://www.npmjs.com/package/connect-mongo

const { decode } = require('he');
const { findError } = require('./utils/util');

const indexRouter = require('./routes/index');

const app = express();
app.locals.decode = decode;
app.locals.findError = findError;

// set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI_DEV;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// set up session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    // create session store
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      stringify: false, // do not serialize & deserialize sessions w/ `JSON.stringify` & `JSON.parse`
      autoRemove: 'interval', // behavior for removing expired sessions
      autoRemoveInterval: 1, // in minutes
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day (ms * secs * mins * hrs)
  }),
);
// passport authentication
require('./config/passport');
app.use(passport.session());
app.use((req, res, next) => {
  const msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];

  res.locals.currentUser = req.user;
  console.log('currentUser', res.locals.currentUser);
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
