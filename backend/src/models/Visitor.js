// // backend/models/Visitor.js
// const mongoose = require('mongoose');

// const VisitorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mobile: { type: String, required: true },
//   purpose: { type: String, required: true },
//   email: { type: String },
//   flatVisited: { type: String },
//   resident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident' },
//   guard: { type: mongoose.Schema.Types.ObjectId, ref: 'Guard' },
//   status: { 
//     type: String, 
//     enum: ['pending', 'pendingVerification', 'allowed', 'rejected', 'checkedout'], 
//     default: 'pendingVerification' 
//   },
//   preapproved: { type: Boolean, default: false },
//   passcode: { type: String },
//   passcodeUsed: { type: Boolean, default: false },
//   entryTime: { type: Date },
//   exitTime: { type: Date },
//   scheduledTime: { type: Date }
// }, { timestamps: true });

// module.exports = mongoose.model('Visitor', VisitorSchema);


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
  entryTime: Date,
  exitTime: Date
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
