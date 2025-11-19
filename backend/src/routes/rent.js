// backend/src/routes/rent.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { permit } = require("../middleware/roles");
const rentController = require("../controllers/rentController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// uploads folder
const uploadDir = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`;
    cb(null, name);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// Create listing (resident or admin)
router.post(
  "/",
  auth,
  permit("resident", "admin"),
  upload.array("images", 5),
  rentController.createRent
);

// Get all (any logged in)
router.get("/all", auth, rentController.getAllRents);

// Get single
router.get("/:id", auth, rentController.getRent);

// Update (owner or admin)
router.put("/:id", auth, upload.array("images", 5), rentController.updateRent);

// Delete
router.delete("/:id", auth, rentController.deleteRent);

// Admin toggle featured
router.post("/:id/featured", auth, permit("admin"), rentController.toggleFeatured);

// Mark as rented (owner or admin)
router.post("/:id/mark-rented", auth, rentController.markAsRented);

module.exports = router;
