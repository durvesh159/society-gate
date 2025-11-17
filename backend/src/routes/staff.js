// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const { permit } = require('../middleware/roles');
// const staffController = require('../controllers/staffController');



// // Admin routes
// router.post('/add', auth, permit('admin'), staffController.addStaff);
// router.get('/all', auth, permit('admin', 'guard'), staffController.getAllStaff);

// // Guard routes
// router.post('/entry', auth, permit('guard'), staffController.markEntry);
// router.post('/exit', auth, permit('guard'), staffController.markExit);

// // Staff routes
// router.get('/profile/:id', auth, permit('staff', 'admin'), staffController.getStaffProfile);


// module.exports = router;



const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { permit } = require('../middleware/roles');
const staffController = require('../controllers/staffController');



const {
  addStaff,
  getAllStaff,
  deleteStaff
} = require("../controllers/adminController");

// ADD STAFF
router.post("/", addStaff);

// GET ALL STAFF
router.get("/all", getAllStaff);

// DELETE STAFF
router.delete("/:id", deleteStaff);

module.exports = router;

// Guard routes
router.post('/entry', auth, permit('guard'), staffController.markEntry);
router.post('/exit', auth, permit('guard'), staffController.markExit);

// Staff routes
router.get('/profile/:id', auth, permit('staff', 'admin'), staffController.getStaffProfile);


module.exports = router;
