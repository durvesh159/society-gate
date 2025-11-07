const mongoose = require('mongoose');

const ResidentSchema = new mongoose.Schema({
  name: String,
  wing: String,
  flatNo: String,
  email: { type: String, unique: true },
  password: { type: String },
  mobile: String,
  uniqueId: { type: String, unique: true },
  role: { type: String, default: 'resident' },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('Resident', ResidentSchema);
