const express = require("express");
const router = express.Router();
const News = require("../models/News");
const auth = require("../middleware/auth");

// ⭐ Create news – only admin
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { title, message } = req.body;

    const news = await News.create({
      title,
      message,
      createdBy: req.user.id
    });

    res.json(news);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ⭐ Get all news – everyone can see
router.get("/", auth, async (req, res) => {
  try {
    const list = await News.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
