// backend/src/controllers/newsController.js
const News = require("../models/News");

exports.createNews = async (req, res) => {
  try {
    const { title, message, createdBy } = req.body;
    if (!title || !message) return res.status(400).json({ msg: "Missing fields" });

    const news = await News.create({ title, message, createdBy: createdBy || "Admin" });

    // Emit socket event so clients know new news is available
    const io = req.app.get("io");
    if (io) io.emit("newsCreated", { news });

    res.json({ success: true, message: "News published", news });
  } catch (err) {
    console.error("createNews", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json({ success: true, news });
  } catch (err) {
    console.error("getAllNews", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message } = req.body;
    const news = await News.findByIdAndUpdate(id, { title, message }, { new: true });
    if (!news) return res.status(404).json({ msg: "News not found" });

    const io = req.app.get("io");
    if (io) io.emit("newsUpdated", { news });

    res.json({ success: true, news });
  } catch (err) {
    console.error("updateNews", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);
    if (!news) return res.status(404).json({ msg: "News not found" });

    const io = req.app.get("io");
    if (io) io.emit("newsDeleted", { id });

    res.json({ success: true, msg: "Deleted" });
  } catch (err) {
    console.error("deleteNews", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
