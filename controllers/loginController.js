const asyncHandler = require('express-async-handler');
const passport = require('passport');

exports.loginGet = asyncHandler(async (req, res, next) => {
  res.render('login', { title: 'Login' });
});

exports.loginPost = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true,
});

exports.logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};
