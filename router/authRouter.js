
const express = require('express');
const authController = require('../controller/authController.js');

const router = express.Router()


/* Signup: post router */
router.post('/signup', authController.signupHandler);

/* Login: post router */
router.post('/login', authController.loginHandler);

module.exports = router;