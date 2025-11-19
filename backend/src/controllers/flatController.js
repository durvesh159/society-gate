const Flat = require("../models/Flat");

// ADD NEW FLAT
const addFlat = async (req, res) => {
  try {
    const { bhk, area, price, furnished, availableFrom, description, images } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ msg: "At least one image is required" });
    }

    const flat = await Flat.create({
      ownerId: req.user.id,
      ownerName: req.user.email,
      bhk,
      area,
      price,
      furnished,
      availableFrom,
      description,
      images, // base64 array
    });

    res.json(flat);
  } catch (error) {
    res.status(500).json({ msg: "Error adding flat", error });
  }
};

// GET ALL FLATS
const getAllFlats = async (req, res) => {
  try {
    const flats = await Flat.find().sort({ featured: -1, createdAt: -1 });
    res.json(flats);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching flats" });
  }
};

// MARK FEATURED (ADMIN ONLY)
const markFeatured = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    const flat = await Flat.findByIdAndUpdate(
      req.params.id,
      { featured: true },
      { new: true }
    );

    res.json(flat);
  } catch (err) {
    res.status(500).json({ msg: "Error updating flat" });
  }
};

// MARK AS RENTED
const markAsRented = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);

    if (!flat) return res.status(404).json({ msg: "Not found" });

    if (flat.ownerId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Not allowed" });
    }

    flat.isRented = true;
    await flat.save();

    res.json(flat);
  } catch (err) {
    res.status(500).json({ msg: "Error marking rented" });
  }
};

// DELETE FLAT
const deleteFlat = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ msg: "Flat not found" });

    if (flat.ownerId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await Flat.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting flat" });
  }
};


// EXPORTS (CJS)
module.exports = {
  addFlat,
  getAllFlats,
  markFeatured,
  markAsRented,
  deleteFlat
};
