// // backend/models/Visitor.js
// const mongoose = require('mongoose');

// const visitorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mobile: { type: String, required: true },
//   email: { type: String },
//   purpose: { type: String },
//   flatVisited: { type: String, required: true },
//   resident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident' },
//   guard: { type: mongoose.Schema.Types.ObjectId, ref: 'Guard' },
//   preapproved: { type: Boolean, default: false },
//   passcode: { type: String },
//   passcodeUsed: { type: Boolean, default: false },
//   scheduledTime: { type: Date },
//   status: {
//     type: String,
//     enum: ['pending', 'preapproved', 'allowed', 'rejected', 'checkedout'],
//     default: 'pending'
//   },
  
//   entryTime: Date,
//   exitTime: Date
// }, { timestamps: true });

// module.exports = mongoose.model('Visitor', visitorSchema);


// backend/models/Visitor.js
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  purpose: { type: String },
  flatVisited: { type: String, required: true },
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident' },
  guard: { type: mongoose.Schema.Types.ObjectId, ref: 'Guard' },
  preapproved: { type: Boolean, default: false },
  passcode: { type: String },
  passcodeUsed: { type: Boolean, default: false },
  scheduledTime: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'preapproved', 'allowed', 'rejected', 'checkedout'],
    default: 'pending'
  },
  documentImage: {
  type: String,
  default: null
  },

  entryTime: Date,
  exitTime: Date
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
