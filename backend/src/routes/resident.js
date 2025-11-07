// backend/src/routes/resident.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { permit } = require('../middleware/roles');

const { preApproveVisitor, getVisitorHistory, getPendingVisitors } = require('../controllers/residentController.js');
const { approveByResident } = require('../controllers/guardController');

// resident must be authenticated and have role 'resident'
router.post('/preapprove', auth, permit('resident'), preApproveVisitor);
router.get('/visitors', auth, permit('resident'), getVisitorHistory);
router.get('/pending', auth, permit('resident'), getPendingVisitors);

// approve/reject endpoint already exists as approveByResident
router.post('/approve', auth, permit('resident'), approveByResident);

module.exports = router;
