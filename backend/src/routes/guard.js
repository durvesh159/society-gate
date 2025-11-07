const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { permit } = require('../middleware/roles');
const { addVisitor, guardAllow, checkOut, verifyPasscode } = require('../controllers/guardController');

router.post('/add-visitor', auth, permit('guard'), addVisitor);
router.post('/allow', auth, permit('guard'), guardAllow);
router.post('/checkout', auth, permit('guard'), checkOut);

router.post('/verify-passcode', auth, permit('guard'), verifyPasscode);

router.get('/visitors', auth, permit('guard'), async (req, res) => {
  try {
    const Visitor = require('../models/Visitor');
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
