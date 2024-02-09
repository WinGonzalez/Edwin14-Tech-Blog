const express = require('express');
const router = express.Router();

const home = require('./homeRoute');
const post = require('./postRoute');
const user = require('./userRoute');

router.use('/', home);
router.use('/posts', post);
router.use('/users', user);

module.exports = router;