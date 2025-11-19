import Flat from "../models/Flat.js";

export const addFlat = async (req, res) => {
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
      images,
    });

    res.json(flat);
  } catch (error) {
    res.status(500).json({ msg: "Error adding flat", error });
  }
};

export const getAllFlats = async (req, res) => {
  try {
    const flats = await Flat.find().sort({ featured: -1, createdAt: -1 });
    res.json(flats);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching flats" });
  }
};

export const markFeatured = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Forbidden" });

    const flat = await Flat.findByIdAndUpdate(req.params.id, { featured: true }, { new: true });
    res.json(flat);
  } catch (err) {
    res.status(500).json({ msg: "Error updating flat" });
  }
};

export const markAsRented = async (req, res) => {
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
