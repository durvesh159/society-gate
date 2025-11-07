const mongoose = require('mongoose');

const GuardSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  uniqueId: { type: String, unique: true },
  role: { type: String, default: 'guard' }
}, { timestamps: true });

module.exports = mongoose.model('Guard', GuardSchema);
