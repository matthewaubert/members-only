const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { encode } = require('he');

exports.newMessageGet = (req, res, next) => {
  res.render('new-message', { title: 'New Message' });
};

exports.newMessagePost = [
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

    console.log('message:', message);

    // if errors: render form again w/ sanitized values & error msgs
    if (!errors.isEmpty()) {
      res.render('new-message', {
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
