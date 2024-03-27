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
      { new: true }, // return doc after `update` applied
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
