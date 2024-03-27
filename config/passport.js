const passport = require('passport');
// documentation:
//   https://www.passportjs.org/concepts/authentication/password/
//   https://www.passportjs.org/tutorials/password/
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); // https://www.npmjs.com/package/bcryptjs
const User = require('../models/user');

const customFields = {
	usernameField: 'email', // 'username' by default
	// passwordField: 'password', // 'password' by default
};

async function verify(email, password, done) {
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    const match = user ? await bcrypt.compare(password, user.password) : false;

    const doneArgs = match
      ? [null, user]
      : [null, false, { message: 'Incorrect email or password.' }];

    return done(...doneArgs);
  } catch (err) {
    return done(err);
  }
}

passport.use(new LocalStrategy(customFields, verify));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
