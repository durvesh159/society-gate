const mongoose = require('mongoose');

const GuardAttendanceSchema = new mongoose.Schema({
  guard: { type: mongoose.Schema.Types.ObjectId, ref: "Guard", required: true },
  checkIn: { type: Date },
  checkOut: { type: Date }
}, { timestamps: true });

const StaffAttendanceSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
  entryTime: { type: Date },
  exitTime: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("GuardAttendance", GuardAttendanceSchema);
module.exports = mongoose.model("StaffAttendance", StaffAttendanceSchema);
