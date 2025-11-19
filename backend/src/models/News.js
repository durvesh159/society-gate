// backend/src/models/News.js
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    createdBy: { type: String, required: true }, // can store 'Admin Name' or role
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
