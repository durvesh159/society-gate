import express from "express";
import { addFlat, getAllFlats, markFeatured, markAsRented } from "../controllers/flatController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, addFlat);            // admin + resident
router.get("/", auth, getAllFlats);            // admin + resident
router.put("/featured/:id", auth, markFeatured);   // admin only
router.put("/rented/:id", auth, markAsRented);     // owner + admin

export default router;
