const express = require('express');
const router = express.Router();

// require controller modules
const indexController = require('../controllers/indexController');
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', indexController);

router.get('/signup', signupController.signupGet);

router.post('/signup', signupController.signupPost);

router.get('/login', loginController.loginGet);

router.post('/login', loginController.loginPost);

module.exports = router;
