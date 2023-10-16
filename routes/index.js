const express = require('express');
const router = express.Router();

router.use('/user', require('./user.js'));
router.use('/task', require('./task.js'));

module.exports = router;