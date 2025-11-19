// backend/src/routes/news.js
const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// Public: list all news
router.get("/all", newsController.getAllNews);

// Admin: create news
router.post("/publish", newsController.createNews);

// Admin: update news
router.put("/:id", newsController.updateNews);

// Admin: delete news
router.delete("/:id", newsController.deleteNews);

module.exports = router;
