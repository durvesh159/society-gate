// // backend/src/models/Rent.js
// const mongoose = require("mongoose");

// const rentSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // e.g. "A-101 2BHK Furnished"
//   description: { type: String, default: "" },
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: "Resident", required: true },
//   ownerName: { type: String },
//   ownerMobile: { type: String },
//   price: { type: Number, required: true },
//   deposit: { type: Number },
//   area: { type: Number }, // sq ft
//   bhk: { type: Number },
//   furnished: { type: String, enum: ["Furnished","Semi-Furnished","Unfurnished"], default: "Unfurnished" },
//   availableFrom: { type: Date },
//   images: [{ type: String }], // store image file paths / urls
//   featured: { type: Boolean, default: false }, // admin only
//   isRented: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Rent", rentSchema);


const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Resident", required: true },
  ownerName: { type: String },
  ownerMobile: { type: String },
  price: { type: Number, required: true },
  deposit: { type: Number },
  area: { type: Number },
  bhk: { type: Number },
  furnished: { type: String, enum: ["Furnished","Semi-Furnished","Unfurnished"], default: "Unfurnished" },
  availableFrom: { type: Date },
  images: [{ type: String }], // now storing Base64 strings directly
  featured: { type: Boolean, default: false },
  isRented: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Rent", rentSchema);
