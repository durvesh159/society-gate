
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

  role: {
    type: String,
    enum: [
      "Cook",
      "Maid",
      "Driver",
      "Cleaner",
      "Gardener",
      "Electrician",
      "Plumber",
      "Other"
    ],
    required: true
  },

  address: { type: String },

  email: { type: String, unique: true, required: true },

  password: { type: String, required: true },

  mobile: { type: String },

  isPresent: { type: Boolean, default: false },

  entryTime: { type: Date },

  exitTime: { type: Date },

  uniqueId: {
    type: String,
    default: () => `STAFF-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }
}, { timestamps: true });

// Password comparison
StaffSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Staff', StaffSchema);
