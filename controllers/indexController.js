const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res, next) => {
  res.render('index', { title: 'MembersOnly' });
});
