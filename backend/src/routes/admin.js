const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { permit } = require('../middleware/roles');
const { addResident, addGuard, getVisitors } = require('../controllers/adminController');

router.post('/resident', auth, permit('admin'), addResident);
router.post('/guard', auth, permit('admin'), addGuard);
router.get('/visitors', auth, permit('admin'), getVisitors);

module.exports = router;
