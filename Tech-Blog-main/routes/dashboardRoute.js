const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboard');

// Define route for the dashboard
router.get('/', dashboard.getDashboard);

module.exports = router;