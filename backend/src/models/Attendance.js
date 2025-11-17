const mongoose = require('mongoose');

const GuardAttendanceSchema = new mongoose.Schema({
  guard: { type: mongoose.Schema.Types.ObjectId, ref: "Guard", required: true },
  checkIn: { type: Date },
  checkOut: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("GuardAttendance", GuardAttendanceSchema);
