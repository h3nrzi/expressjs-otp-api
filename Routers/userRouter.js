const router = require('express').Router();

const authController = require('../Controllers/authController');

router.post('/signupOtp/verify', authController.verifyOtp);
router.post('/signupOtp', authController.signupOpt);
// router.post('/loginOtp', authController.login);

module.exports = router;
