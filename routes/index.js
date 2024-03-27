const express = require('express');
const router = express.Router();

// require controller modules
const indexController = require('../controllers/index-controller');
const signupController = require('../controllers/signup-controller');
const loginController = require('../controllers/login-controller');
const memberController = require('../controllers/member-controller');
const messageController = require('../controllers/message-controller');

/* GET home page. */
router.get('/', indexController);

router.get('/signup', signupController.signupGet);

router.post('/signup', signupController.signupPost);

router.get('/login', loginController.loginGet);

router.post('/login', loginController.loginPost);

router.get('/logout', loginController.logoutGet);

router.get('/become-member', memberController.becomeMemberGet);

router.post('/become-member', memberController.becomeMemberPost);

router.get('/new-message', messageController.newMessageGet);

module.exports = router;
