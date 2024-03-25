const asyncHandler = require('express-async-handler');

exports.loginGet = asyncHandler(async (req, res, next) => {
  res.render('login', { title: 'Login' });
});

exports.loginPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Login POST');
});
