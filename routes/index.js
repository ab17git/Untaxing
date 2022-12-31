var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth')
var homeController = require('../controllers/home')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/registerUser', authController.registerUser)
router.post('/login', authController.login)
router.post('/verifyEmail', authController.verifyEmail)
router.post('/verifyMobile', authController.verifyMobile)

// router.post('/emailVerfication', authController.login)
// router.post('/mobileVerfication', authController.login)
// router.post('/logout', authController.logout)
// router.get('/sendOtp', authController.login)
// router.post('/resetForgottenPassword', authController.login)

router.get('/home', homeController.getHomePageData)
router.get('/test', homeController.test)

module.exports = router;
