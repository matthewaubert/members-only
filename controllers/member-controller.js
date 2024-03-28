const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.becomeMemberGet = (req, res, next) => {
  res.render('become-member', { title: 'Become a Member' });
};

exports.becomeMemberPost = asyncHandler(async (req, res, next) => {
  // console.log('user', req.user);
  console.log('passcode:', req.body.passcode);

  // if user entered correct member passcode:
  if (req.body.passcode === process.env.MEMBER_PASS) {
    // change user.member to true
    await User.findOneAndUpdate(
      { _id: req.user.id }, // filter
      { member: true }, // update
    );

    // inform user of correct passcode
    res.redirect('/');
  } else {
    // render form again and inform user of incorrect passcode
    res.render('become-member', {
      title: 'Become a Member',
      error: 'Incorrect passcode. Try again.',
    });
  }
});

exports.becomeAdminGet = (req, res, next) => {
  res.render('become-admin', { title: 'Become an Admin' });
};

exports.becomeAdminPost = asyncHandler(async (req, res, next) => {
  // if user is already a member and entered correct admin passcode:
  if (req.user?.member && req.body.passcode === process.env.ADMIN_PASS) {
    // change user.admin to true
    await User.findOneAndUpdate(
      { _id: req.user.id }, // filter
      { admin: true }, // update
    );

    // inform user of correct passcode
    res.redirect('/');
  } else {
    // render form again and inform user of incorrect passcode
    res.render('become-admin', {
      title: 'Become an Admin',
      error: req.user?.member
        ? 'Incorrect passcode.'
        : 'You must first be a member.',
    });
  }
});
