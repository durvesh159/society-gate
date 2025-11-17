const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { permit } = require('../middleware/roles');
const { addResident, addGuard, addStaff, getVisitors, getAllStaff, getAllResidents, getAllGuards, deleteStaff, deleteGuard, deleteResident } = require('../controllers/adminController');

router.post('/resident', auth, permit('admin'), addResident);
router.get('/residents', auth, permit('admin'), getAllResidents);
router.post('/guard', auth, permit('admin'), addGuard);
router.get('/guards', auth, permit('admin'), getAllGuards);
router.post('/staff', auth, permit('admin'), addStaff);
router.delete("/staff/:id", auth, permit('admin'), deleteStaff);
router.get('/visitors', auth, permit('admin'), getVisitors);
router.get('/staff/all', auth, permit('admin'), getAllStaff);
router.delete("/resident/:id", auth, permit('admin'), deleteResident);
router.delete("/guard/:id", auth, permit('admin'), deleteGuard);

module.exports = router;
