const asyncHandler = require('express-async-handler');

exports.loginGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Login GET');
});

exports.loginPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Login POST');
});
