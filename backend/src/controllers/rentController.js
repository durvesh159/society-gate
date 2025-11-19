// backend/src/controllers/rentController.js
const Rent = require("../models/Rent");
const Resident = require("../models/Resident");
const fs = require("fs");
const path = require("path");

// Create listing (resident or admin)
// exports.createRent = async (req, res) => {
//   try {
//     const userId = req.user.id; // must be resident or admin
//     const userRole = req.user.role;

//     const {
//       title, description, price, deposit, area, bhk, furnished, availableFrom, ownerMobile
//     } = req.body;

//     // images come from multer (req.files)
//     const images = (req.files || []).map(f => `/uploads/${f.filename}`);

//     // owner name — if admin creating for someone, client should pass ownerName & ownerId; otherwise owner is logged-in resident
//     let ownerId = userId;
//     let ownerName = req.body.ownerName || undefined;
//     if (userRole === "admin" && req.body.ownerId) {
//       ownerId = req.body.ownerId;
//       const resModel = await Resident.findById(ownerId);
//       ownerName = ownerName || (resModel && resModel.name) || "Admin Listed";
//     } else {
//       const resident = await Resident.findById(userId);
//       ownerName = ownerName || (resident && resident.name);
//     }

//     const rent = await Rent.create({
//       title,
//       description,
//       owner: ownerId,
//       ownerName,
//       ownerMobile: ownerMobile || req.body.ownerMobile || "",
//       price: Number(price),
//       deposit: deposit ? Number(deposit) : undefined,
//       area: area ? Number(area) : undefined,
//       bhk: bhk ? Number(bhk) : undefined,
//       furnished,
//       availableFrom: availableFrom ? new Date(availableFrom) : undefined,
//       images,
//       featured: false
//     });

//     // notify via io if available
//     const io = req.app.get("io");
//     if (io) io.emit("rentCreated", rent);

//     res.json({ success: true, rent });
//   } catch (err) {
//     console.error("createRent error:", err);
//     res.status(500).json({ success: false, msg: "Server error" });
//   }
// };

exports.createRent = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    const {
      title, description, price, deposit, area, bhk, furnished,
      availableFrom, ownerMobile, ownerId, ownerName, images
    } = req.body;

    let finalOwnerId = userId;
    let finalOwnerName = ownerName;

    if (userRole === "admin" && ownerId) {
      finalOwnerId = ownerId;
      const resModel = await Resident.findById(ownerId);
      finalOwnerName = finalOwnerName || resModel?.name || "Admin Listed";
    } else {
      const resident = await Resident.findById(userId);
      finalOwnerName = resident?.name || "Resident";
    }

    const rent = await Rent.create({
      title,
      description,
      owner: finalOwnerId,
      ownerName: finalOwnerName,
      ownerMobile,
      price: Number(price),
      deposit: deposit ? Number(deposit) : undefined,
      area: area ? Number(area) : undefined,
      bhk: bhk ? Number(bhk) : undefined,
      furnished,
      availableFrom: availableFrom ? new Date(availableFrom) : undefined,
      images: images || [], // base64 array
      featured: false
    });

    const io = req.app.get("io");
    if (io) io.emit("rentCreated", rent);

    res.json({ success: true, rent });

  } catch (err) {
    console.error("createRent error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};


// Get all with filters
exports.getAllRents = async (req, res) => {
  try {
    const { bhk, minPrice, maxPrice, furnished, q, featured } = req.query;
    const filter = {};

    if (bhk) filter.bhk = Number(bhk);
    if (featured === "true") filter.featured = true;
    if (furnished) filter.furnished = furnished;
    if (q) filter.$or = [
      { title: new RegExp(q, "i") },
      { description: new RegExp(q, "i") },
      { ownerName: new RegExp(q, "i") }
    ];
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const rents = await Rent.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, rents });
  } catch (err) {
    console.error("getAllRents", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Get single listing
exports.getRent = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await Rent.findById(id).populate("owner", "name email mobile");
    if (!rent) return res.status(404).json({ success: false, msg: "Not found" });
    res.json({ success: true, rent });
  } catch (err) {
    console.error("getRent", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Update listing (owner or admin)
// exports.updateRent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const rent = await Rent.findById(id);
//     if (!rent) return res.status(404).json({ success: false, msg: "Not found" });

//     // permission
//     if (req.user.role !== "admin" && String(rent.owner) !== req.user.id) {
//       return res.status(403).json({ success: false, msg: "Forbidden" });
//     }

//     const update = { ...req.body };

//     // if images uploaded append
//     if (req.files && req.files.length) {
//       const newImgs = req.files.map(f => `/uploads/${f.filename}`);
//       update.images = (rent.images || []).concat(newImgs);
//     }

//     Object.assign(rent, update);
//     await rent.save();

//     const io = req.app.get("io");
//     if (io) io.emit("rentUpdated", rent);

//     res.json({ success: true, rent });
//   } catch (err) {
//     console.error("updateRent", err);
//     res.status(500).json({ success: false, msg: "Server error" });
//   }
// };

exports.updateRent = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await Rent.findById(id);

    if (!rent) return res.status(404).json({ success: false, msg: "Not found" });
    if (req.user.role !== "admin" && String(rent.owner) !== req.user.id)
      return res.status(403).json({ success: false, msg: "Forbidden" });

    const updateData = { ...req.body };

    // If Base64 images passed, append them
    if (req.body.images && Array.isArray(req.body.images)) {
      updateData.images = [...rent.images, ...req.body.images];
    }

    Object.assign(rent, updateData);
    await rent.save();

    const io = req.app.get("io");
    if (io) io.emit("rentUpdated", rent);

    res.json({ success: true, rent });
  } catch (err) {
    console.error("updateRent", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};


// Delete (owner or admin)
// exports.deleteRent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const rent = await Rent.findById(id);
//     if (!rent) return res.status(404).json({ success: false, msg: "Not found" });

//     if (req.user.role !== "admin" && String(rent.owner) !== req.user.id) {
//       return res.status(403).json({ success: false, msg: "Forbidden" });
//     }

//     // optionally remove uploaded files (best-effort)
//     (rent.images || []).forEach(imgPath => {
//       try {
//         const filePath = path.join(__dirname, "..", "..", "uploads", path.basename(imgPath));
//         if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//       } catch (e) { /* ignore */ }
//     });

//     await rent.remove();

//     const io = req.app.get("io");
//     if (io) io.emit("rentDeleted", { id });

//     res.json({ success: true, msg: "Deleted" });
//   } catch (err) {
//     console.error("deleteRent", err);
//     res.status(500).json({ success: false, msg: "Server error" });
//   }
// };

exports.deleteRent = async (req, res) => {
  try {
    const { id } = req.params;

    const rent = await Rent.findById(id);
    if (!rent) return res.status(404).json({ msg: "Not found" });

    if (req.user.role !== "admin" && String(rent.owner) !== req.user.id)
      return res.status(403).json({ msg: "Forbidden" });

    await rent.deleteOne();

    const io = req.app.get("io");
    if (io) io.emit("rentDeleted", { id });

    res.json({ success: true, msg: "Deleted" });

  } catch (err) {
    console.error("deleteRent", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};


// Admin: toggle featured
exports.toggleFeatured = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Forbidden" });
    const { id } = req.params;
    const rent = await Rent.findById(id);
    if (!rent) return res.status(404).json({ msg: "Not found" });
    rent.featured = !rent.featured;
    await rent.save();

    const io = req.app.get("io");
    if (io) io.emit("rentUpdated", rent);

    res.json({ success: true, rent });
  } catch (err) {
    console.error("toggleFeatured", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Mark as rented (owner or admin)
exports.markAsRented = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await Rent.findById(id);
    if (!rent) return res.status(404).json({ msg: "Not found" });
    if (req.user.role !== "admin" && String(rent.owner) !== req.user.id) {
      return res.status(403).json({ msg: "Forbidden" });
    }
    rent.isRented = true;
    await rent.save();

    const io = req.app.get("io");
    if (io) io.emit("rentUpdated", rent);

    res.json({ success: true, rent });
  } catch (err) {
    console.error("markAsRented", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
