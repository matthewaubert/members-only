const express = require('express');
const router = express.Router();
const {
  isNotUser,
  isUser,
  isMember,
  isAdmin,
} = require('../utils/auth-middleware');

// require controller modules
const indexController = require('../controllers/index-controller');
const signupController = require('../controllers/signup-controller');
const loginController = require('../controllers/login-controller');
const memberController = require('../controllers/member-controller');
const messageController = require('../controllers/message-controller');

/* GET home page. */
router.get('/', indexController);

router.get('/signup', isNotUser, signupController.signupGet);

router.post('/signup', isNotUser, signupController.signupPost);

router.get('/login', isNotUser, loginController.loginGet);

router.post('/login', isNotUser, loginController.loginPost);

router.get('/logout', loginController.logoutGet);

router.get('/become-member', isUser, memberController.becomeMemberGet);

router.post('/become-member', isUser, memberController.becomeMemberPost);

router.get('/become-admin', isMember, memberController.becomeAdminGet);

router.post('/become-admin', isMember, memberController.becomeAdminPost);

router.get('/message/create', isUser, messageController.messageCreateGet);

router.post('/message/create', isUser, messageController.messageCreatePost);

// prettier-ignore
router.post('/message/:id/delete', isAdmin, messageController.messageDeletePost);

module.exports = router;
