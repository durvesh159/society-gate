const express = require('express');
const router = express.Router();
const { requestPasswordReset, resetPassword } = require('../controllers/passwordController');

// public endpoints
router.post('/forgot', requestPasswordReset);
router.post('/reset', resetPassword);

module.exports = router;
