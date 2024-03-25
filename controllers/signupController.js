const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { encode } = require('he');
const bcrypt = require('bcryptjs');

exports.signupGet = asyncHandler(async (req, res, next) => {
  res.render('signup', { title: 'Sign Up' });
});

exports.signupPost = [
  // validate and sanitize User fields
  body('firstName', 'First name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .customSanitizer((value) => encode(value)),
  body('lastName', 'Last name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .customSanitizer((value) => encode(value)),
  body('email')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Email must not be empty.')
    // check that email isn't already being used
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) throw new Error('Email already in use.');
    })
    .customSanitizer((value) => encode(value)),
  body('password', 'Password must be at least 8 characters.')
    .trim()
    .isLength({ min: 8 }),
  body('confirmPassword', 'Password confirmation must match password.')
    .trim()
    // check that password confirmation matches password
    .custom((value, { req }) => value === req.body.password),

  asyncHandler(async (req, res, next) => {
    // extract validation errors from request
    const errors = validationResult(req);

    // generate encrypted password w/ bcrypt
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      // if err, skip to next in middleware chain
      if (err) return next(err);

      // create a User object w/ escaped & trimmed data
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });

      console.log('user:', user);

      // if errors: render form again w/ sanitized values & error msgs
      if (!errors.isEmpty()) {
        res.render('signup', {
          title: 'Sign Up',
          user,
          errors: errors.array(),
        });
      } else {
        // data from form is valid. Save User and redirect to login page.
        await user.save();
        res.redirect('/login');
      }
    });
  }),
];
