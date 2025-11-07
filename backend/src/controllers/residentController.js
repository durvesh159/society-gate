// // backend/src/controllers/residentController.js
// //const { nanoid } = require('nanoid');
// const Visitor = require('../models/Visitor');
// const Resident = require('../models/Resident');
// const sendMail = require('../utils/mail'); // ✅ FIX: import sendMail properly
// const crypto = require('crypto');

// // Create a pre-approved visitor (resident schedules a visit)
// const preApproveVisitor = async (req, res) => {
//   try {
//     const residentId = req.user.id;
//     const resident = await Resident.findById(residentId);
//     if (!resident) return res.status(404).json({ msg: 'Resident not found' });

//     const { name, mobile, purpose, email, scheduledTime } = req.body;
//     if (!email) return res.status(400).json({ msg: 'Visitor email is required' });

//     // Generate unique passcode
//     const passcode = crypto.randomBytes(3).toString('hex').toUpperCase();

//     const visitor = new Visitor({
//       name,
//       mobile,
//       purpose,
//       email,
//       flatVisited: `${resident.wing || ''}-${resident.flatNo || ''}`.replace(/^-|-$|^-/g, ''),
//       resident: resident._id,
//       preapproved: true,
//       passcode,
//       scheduledTime: scheduledTime ? new Date(scheduledTime) : undefined,
//       status: 'pending'
//     });

//     await visitor.save();

//     // ✅ Send visitor their passcode by email
//     await sendMail({
//       to: email,
//       subject: 'Your Gate Entry Passcode',
//       html: `
//         <p>Dear ${name},</p>
//         <p>You have been pre-approved to visit <b>${resident.name}</b> (${resident.flatNo}).</p>
//         <p>Your passcode for gate entry is: <b>${passcode}</b></p>
//         <p>Show this to the guard when you arrive.</p>
//         <p><i>This passcode can be used only once.</i></p>
//       `,
//     });

//     // ✅ Emit real-time event to guards
//     const io = req.app.get('io');
//     io.emit('new-preapproved-visitor', visitor);

//     return res.json({ visitor, msg: 'Visitor pre-approved successfully', passcode });
//   } catch (err) {
//     console.error('preApproveVisitor error', err);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// };

// // Resident's visitor history
// const getVisitorHistory = async (req, res) => {
//   try {
//     const residentId = req.user.id;
//     const resident = await Resident.findById(residentId);
//     if (!resident) return res.status(404).json({ msg: 'Resident not found' });

//     const flatKey = `${resident.wing || ''}-${resident.flatNo || ''}`.replace(/^-|-$|^-/g, '');
//     const visitors = await Visitor.find({
//       $or: [{ resident: resident._id }, { flatVisited: flatKey }]
//     }).sort({ createdAt: -1 }).populate('guard', 'name').lean();

//     return res.json(visitors);
//   } catch (err) {
//     console.error('getVisitorHistory error', err);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// };

// // Pending visitors (non-preapproved or upcoming preapproved)
// const getPendingVisitors = async (req, res) => {
//   try {
//     const residentId = req.user.id;
//     const resident = await Resident.findById(residentId);
//     if (!resident) return res.status(404).json({ msg: 'Resident not found' });

//     const flatKey = `${resident.wing || ''}-${resident.flatNo || ''}`.replace(/^-|-$|^-/g, '');
//     const visitors = await Visitor.find({
//       flatVisited: flatKey,
//       status: 'pending'
//     }).sort({ createdAt: -1 }).lean();

//     return res.json(visitors);
//   } catch (err) {
//     console.error('getPendingVisitors error', err);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// };

// module.exports = { preApproveVisitor, getVisitorHistory, getPendingVisitors };



// const Visitor = require('../models/Visitor');
// const Resident = require('../models/Resident');
// const sendMail = require('../utils/mail');
// const crypto = require('crypto');

// // ✅ Pre-approve visitor
// const preApproveVisitor = async (req, res) => {
//   try {
//     const resident = await Resident.findById(req.user.id);
//     if (!resident) return res.status(404).json({ msg: 'Resident not found' });

//     const { name, mobile, purpose, email, scheduledTime } = req.body;
//     const passcode = crypto.randomBytes(3).toString('hex').toUpperCase();

//     const visitor = new Visitor({
//       name,
//       mobile,
//       purpose,
//       email,
//       flatVisited: resident.flatNo,
//       resident: resident._id,
//       preapproved: true,
//       passcode,
//       scheduledTime: scheduledTime || null,
//       status: 'preapproved'
//     });

//     await visitor.save();

//     // send passcode email
//     await sendMail({
//       to: email,
//       subject: 'Your Pre-approved Gate Entry Passcode',
//       html: `
//         <p>Dear ${name},</p>
//         <p>You are pre-approved to visit <b>${resident.name}</b> (${resident.flatNo}).</p>
//         <p>Your entry passcode: <b>${passcode}</b></p>
//         <p>Please show this at the gate. Valid once only.</p>
//       `
//     });

//     const io = req.app.get('io');
//     io.emit('visitorUpdate', { action: 'preapprovedVisitor', visitor });

//     res.json({ msg: 'Pre-approved successfully', visitor });
//   } catch (err) {
//     console.error('preApproveVisitor', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// // ✅ Resident visitor history
// const getVisitorHistory = async (req, res) => {
//   const resident = await Resident.findById(req.user.id);
//   const visitors = await Visitor.find({ resident: resident._id }).sort({ createdAt: -1 });
//   res.json(visitors);
// };

// // ✅ Resident pending approvals
// const getPendingVisitors = async (req, res) => {
//   const resident = await Resident.findById(req.user.id);
//   const visitors = await Visitor.find({
//     flatVisited: resident.flatNo,
//     status: 'pending'
//   }).sort({ createdAt: -1 });
//   res.json(visitors);
// };

// module.exports = { preApproveVisitor, getVisitorHistory, getPendingVisitors };


// backend/controllers/residentController.js
const Visitor = require('../models/Visitor');
const Resident = require('../models/Resident');
const sendMail = require('../utils/mail');
const crypto = require('crypto');

// Pre-approve visitor (resident schedules a visit)
const preApproveVisitor = async (req, res) => {
  try {
    const resident = await Resident.findById(req.user.id);
    if (!resident) return res.status(404).json({ msg: 'Resident not found' });

    const { name, mobile, purpose, email, scheduledTime } = req.body;
    if (!email) return res.status(400).json({ msg: 'Visitor email is required' });

    // Generate unique passcode (6 hex chars -> uppercase)
    const passcode = crypto.randomBytes(3).toString('hex').toUpperCase();

    const flatKey = `${resident.wing || ''}-${resident.flatNo || ''}`.replace(/(^-|-$)/g, '');

    const visitor = new Visitor({
      name,
      mobile,
      purpose,
      email,
      flatVisited: flatKey,
      resident: resident._id,
      preapproved: true,
      passcode,
      scheduledTime: scheduledTime ? new Date(scheduledTime) : undefined,
      status: 'preapproved', // enum now includes this
    });

    await visitor.save();

    // send passcode email
    try {
      await sendMail({
        to: email,
        subject: 'Your Pre-approved Gate Entry Passcode',
        html: `
          <p>Dear ${name},</p>
          <p>You are pre-approved to visit <b>${resident.name}</b> (${flatKey}).</p>
          <p>Your entry passcode: <b>${passcode}</b></p>
          <p>Please show this at the gate. This passcode is valid for one use.</p>
        `
      });
    } catch (mailErr) {
      // log but do not fail whole request
      console.warn('Failed to send passcode email:', mailErr);
    }

    // notify via socket
    const io = req.app.get('io');
    if (io) io.emit('visitorUpdate', { action: 'preapprovedVisitor', visitor });

    return res.json({ msg: 'Pre-approved successfully', visitor });
  } catch (err) {
    console.error('preApproveVisitor', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// Resident history
const getVisitorHistory = async (req, res) => {
  try {
    const resident = await Resident.findById(req.user.id);
    if (!resident) return res.status(404).json({ msg: 'Resident not found' });

    const visitors = await Visitor.find({
      $or: [
        { resident: resident._id },
        { flatVisited: `${resident.wing || ''}-${resident.flatNo || ''}`.replace(/(^-|-$)/g, '') }
      ]
    }).sort({ createdAt: -1 }).populate('guard', 'name');

    return res.json(visitors);
  } catch (err) {
    console.error('getVisitorHistory error', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// Resident pending approvals (only 'pending' visitors)
const getPendingVisitors = async (req, res) => {
  try {
    const resident = await Resident.findById(req.user.id);
    if (!resident) return res.status(404).json({ msg: 'Resident not found' });

    const flatKey = `${resident.wing || ''}-${resident.flatNo || ''}`.replace(/(^-|-$)/g, '');
    const visitors = await Visitor.find({
      flatVisited: flatKey,
      status: 'pending'
    }).sort({ createdAt: -1 });

    return res.json(visitors);
  } catch (err) {
    console.error('getPendingVisitors error', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { preApproveVisitor, getVisitorHistory, getPendingVisitors };
