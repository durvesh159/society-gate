const express = require("express");
const router = express.Router();

const { addFlat, getAllFlats, markFeatured, markAsRented } =
  require("../controllers/flatController");

const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

// Only Admin + Resident can list flats
router.post("/add", auth, roles("admin", "resident"), addFlat);

// Everyone except guard/staff can view
router.get("/", auth, roles("admin", "resident"), getAllFlats);

// Admin only
router.patch("/feature/:id", auth, roles("admin"), markFeatured);

// Owner or Admin
router.patch("/rented/:id", auth, markAsRented);

module.exports = router;
