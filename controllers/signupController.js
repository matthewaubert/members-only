const asyncHandler = require('express-async-handler');

exports.signupGet = asyncHandler(async (req, res, next) => {
  res.render('signup', { title: 'Sign Up' })
});

exports.signupPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Signup POST');
});
