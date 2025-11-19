const express = require("express");
const router = express.Router();

const { addFlat, getAllFlats, markFeatured, markAsRented, deleteFlat } =
  require("../controllers/flatController");

const auth = require("../middleware/auth");
const { permit } = require("../middleware/roles");

// Only Admin + Resident can list flats
router.post("/add", auth, permit("admin", "resident"), addFlat);

// View flats - only admin & residents
router.get("/", auth, permit("admin", "resident"), getAllFlats);

// Admin marks featured
router.patch("/feature/:id", auth, permit("admin"), markFeatured);

// Owner or Admin can mark rented
router.patch("/rented/:id", auth, markAsRented);

router.delete("/:id", auth, deleteFlat);


module.exports = router;
