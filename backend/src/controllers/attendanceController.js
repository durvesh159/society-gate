const GuardAttendance = require("../models/Attendance");
const Guard = require("../models/Guard");

// Guard checks in
exports.checkIn = async (req, res) => {
  try {
    const guardId = req.user.id;
    const io = req.app.get("io");

    const alreadyPresent = await GuardAttendance.findOne({
      guard: guardId,
      checkOut: null
    });

    if (alreadyPresent) {
      return res.status(400).json({ msg: "Already checked in" });
    }

    const record = await GuardAttendance.create({
      guard: guardId,
      checkIn: new Date()
    });

    await Guard.findByIdAndUpdate(guardId, { isPresent: true });

    // 🔥 Real-time event
    io.emit("attendanceUpdate", { type: "check-in", record });

    res.json({ msg: "Checked in successfully", record });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};


// Guard checks out
exports.checkOut = async (req, res) => {
  try {
    const guardId = req.user.id;
    const io = req.app.get("io");

    const todayRecord = await GuardAttendance.findOne({
      guard: guardId,
      checkOut: null
    });

    if (!todayRecord) {
      return res.status(400).json({ msg: "You haven't checked in yet" });
    }

    todayRecord.checkOut = new Date();
    await todayRecord.save();

    await Guard.findByIdAndUpdate(guardId, { isPresent: false });

    // 🔥 Real-time event
    io.emit("attendanceUpdate", { type: "check-out", record: todayRecord });

    res.json({ msg: "Checked out successfully", todayRecord });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};


// Admin: get all guard attendance
exports.getAll = async (req, res) => {
  try {
    const data = await GuardAttendance.find()
      .populate("guard", "name email mobile")
      .sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Guard: get own attendance
exports.myAttendance = async (req, res) => {
  try {
    const guardId = req.user.id;

    const data = await GuardAttendance.find({ guard: guardId })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
