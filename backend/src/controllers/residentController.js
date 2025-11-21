// backend/controllers/residentController.js
const Visitor = require('../models/Visitor');
const Resident = require('../models/Resident');
const sendMail = require('../utils/mail');
const sendSMS = require('../utils/sms');
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

    // Send SMS + Email (passcode to both)
const smsMsg = `OTP for your mobile verification is ${passcode}. It will be valid for 1 minutes.`;

sendSMS(mobile, smsMsg); // send SMS

try {
  await sendMail({
    to: email,
    subject: "Your Pre-approved Gate Entry Passcode",
    html: `
      <p>Dear ${name},</p>
      <p>You are pre-approved to visit <b>${resident.name}</b> (${flatKey}).</p>
      <p>Your entry passcode: <b>${passcode}</b></p>
      <p>Please show this at the gate. This passcode is valid for one use.</p>
    `,
  });
} catch (mailErr) {
  console.warn("Failed to send passcode email:", mailErr);
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
