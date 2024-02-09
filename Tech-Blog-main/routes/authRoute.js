const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

// Authentication routes
// Login routes
router.route('/login')
    .get(auth.getLoginPage) // Display login page
    .post(auth.login); // Process login

// Signup routes
router.route('/signup')
    .get(auth.getSignupPage) // Display signup page
    .post(auth.signup); // Process signup

// Logout route
router.get('/logout', auth.logout); // Process logout

module.exports = router;

