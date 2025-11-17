const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const { login } = require('../controllers/authController');
const { getMe } = require("../controllers/authController");

router.post('/login', login);
router.get("/me", auth, getMe);

module.exports = router;
