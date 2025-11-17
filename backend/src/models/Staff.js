
// const mongoose = require('mongoose');

// const StaffSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   role: { type: String, enum: ['cook', 'maid', 'gardener', 'driver'], required: true },
//   address: String,
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   mobile: String,
//   isPresent: { type: Boolean, default: false },
//   entryTime: Date,
//   exitTime: Date,
// }, { timestamps: true });

// module.exports = mongoose.model('Staff', StaffSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enum: ["Cook", "Maid", "Driver", "Cleaner", "Gardener", "Electrician", "Plumber", "Other"],
  required: true,
  address: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  mobile: String,
  isPresent: { type: Boolean, default: false },
  entryTime: Date,
  exitTime: Date,
  uniqueId: { type: String, default: () => `STAFF-${Date.now()}` },
}, { timestamps: true });

// Password comparison
StaffSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Staff', StaffSchema);
