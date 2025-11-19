const express = require('express');
//import { addFlat, getAllFlats, markFeatured, markAsRented } from "../controllers/flatController.js";
const { addFlat, getAllFlats, markFeatured, markAsRented } = require("../controllers/flatController.js")
const auth = require('../middleware/auth');

const router = express.Router();

router.post("/add", auth, addFlat);            // admin + resident
router.get("/", auth, getAllFlats);            // admin + resident
router.put("/featured/:id", auth, markFeatured);   // admin only
router.put("/rented/:id", auth, markAsRented);     // owner + admin

export default router;
