const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { encode } = require('he');

exports.messageCreateGet = (req, res, next) => {
  res.render('message-create', { title: 'New Message' });
};

exports.messageCreatePost = [
  // validate and sanitize fields
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .customSanitizer((value) => encode(value)),
  body('text', 'Text must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .customSanitizer((value) => encode(value)),

  asyncHandler(async (req, res, next) => {
    // extract validation errors from request
    const errors = validationResult(req);

    // create Message obj w/ escaped & trimmed data
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      user: req.user.id,
    });

    // if errors: render form again w/ sanitized values & error msgs
    if (!errors.isEmpty()) {
      res.render('message-create', {
        title: 'New Message',
        message,
        errors: errors.array(),
      });
    } else {
      // else: data from form is valid. Save Message and redirect to index.
      await message.save();
      res.redirect('/');
    }
  }),
];

exports.messageDeletePost = asyncHandler(async (req, res, next) => {
  // delete message and redirect to index
  await Message.findByIdAndDelete(req.body.messageid);
  res.redirect('/');
});
