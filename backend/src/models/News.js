const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", NewsSchema);
    