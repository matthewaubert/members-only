require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session'); // https://github.com/expressjs/session
const passport = require('passport');
const MongoStore = require('connect-mongo'); // https://www.npmjs.com/package/connect-mongo

const { decode } = require('he'); // https://www.npmjs.com/package/he
const { findError, formatDate } = require('./utils/util');

const indexRouter = require('./routes/index');
const compression = require('compression');
const helmet = require('helmet'); // https://helmetjs.github.io/

const app = express();
app.set('trust proxy', 3);
app.locals.decode = decode;
app.locals.findError = findError;
app.locals.formatDate = formatDate;

// set up rate limiter: max of 20 requests per minute
const { rateLimit } = require('express-rate-limit'); // https://express-rate-limit.mintlify.app/quickstart/usage
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // Limit each IP to 100 requests per `window`
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter); // apply rate limiter to all requests

app.use(helmet()); // add helmet to middleware chain

// set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI_PROD || process.env.MONGODB_URI_DEV;

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
app.use(compression()); // compress all routes

app.use(express.static(path.join(__dirname, 'public')));
// set up session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    // create session store
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI_PROD || process.env.MONGODB_URI_DEV, // MongoDB connection URI
      client: mongoose.connection, // Use mongoose connection directly
      stringify: false, // do not serialize & deserialize sessions w/ `JSON.stringify` & `JSON.parse`
      autoRemove: 'interval', // behavior for removing expired sessions
      autoRemoveInterval: 60, // remove expired sessions every 60 minutes
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
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    error: err,
    // page will render differently in development vs. production
    development: req.app.get('env') === 'development',
  });
});

module.exports = app;
