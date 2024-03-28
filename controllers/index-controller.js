const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
const { formatDate } = require('../utils/util');

module.exports = asyncHandler(async (req, res, next) => {
  // get all Messages
  const messages = await Message.find()
    .populate('user')
    .sort({ timestamp: -1 })
    .exec();

  res.render('index', {
    title: 'MembersOnly',
    messages,
    formatDate,
  });
});
