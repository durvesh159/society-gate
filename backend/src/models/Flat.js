// backend/src/models/Flat.js
const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident", required: true },
  ownerName: { type: String, required: true },

  bhk: { type: Number, required: true },
  area: { type: Number, required: true },
  price: { type: Number, required: true },

  furnished: { 
    type: String, 
    enum: ["Unfurnished", "Semi", "Fully"], 
    required: true 
  },

  availableFrom: { type: Date, required: true },

  images: [{ type: String }],   // BASE64 IMAGES

  featured: { type: Boolean, default: false },
  isRented: { type: Boolean, default: false },

  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Flat", flatSchema);
