const router = require("express").Router();
const auth = require("../middleware/auth");
const { permit } = require("../middleware/roles");
const attendance = require("../controllers/attendanceController");

router.post("/check-in", auth, permit("guard"), attendance.checkIn);
router.post("/check-out", auth, permit("guard"), attendance.checkOut);

router.get("/my", auth, permit("guard"), attendance.myAttendance);
router.get("/all", auth, permit("admin"), attendance.getAll);

module.exports = router;
