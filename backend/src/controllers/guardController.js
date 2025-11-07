
// const Visitor = require('../models/Visitor');
// const Resident = require('../models/Resident');
// const { nanoid } = require('nanoid');

// const addVisitor = async (req, res) => {
//   const { name, mobile, purpose, flatVisited, residentId, preapproved } = req.body;
//   const passcode = preapproved ? nanoid(6) : null;
//   const visitor = new Visitor({ name, mobile, purpose, flatVisited, resident: residentId, preapproved, passcode });
//   await visitor.save();

//   // emit real-time update to all connected guards
//   const io = req.app.get('io');
//   io.emit('visitorUpdate', { action: 'newVisitor', visitor });

//   res.json(visitor);
// };

// const approveByResident = async (req, res) => {
//   const { visitorId, decision } = req.body;
//   const visitor = await Visitor.findById(visitorId);
//   if (!visitor) return res.status(404).json({ msg: 'Not found' });

//   if (decision === 'allow') {
//     visitor.status = 'allowed';
//     visitor.entryTime = new Date();
//   } else {
//     visitor.status = 'rejected';
//   }

//   await visitor.save();

//   // notify guards about updated visitor status
//   const io = req.app.get('io');
//   io.emit('visitorUpdate', { action: 'approvalChanged', visitor });

//   res.json(visitor);
// };

// const guardAllow = async (req, res) => {
//   const { visitorId } = req.body;
//   const visitor = await Visitor.findById(visitorId);
//   if (!visitor) return res.status(404).json({ msg: 'Not found' });

//   visitor.status = 'allowed';
//   visitor.entryTime = new Date();
//   visitor.guard = req.user.id;
//   await visitor.save();

//   // broadcast change
//   const io = req.app.get('io');
//   io.emit('visitorUpdate', { action: 'allowedByGuard', visitor });

//   res.json(visitor);
// };

// const checkOut = async (req, res) => {
//   const { visitorId } = req.body;
//   const visitor = await Visitor.findById(visitorId);
//   visitor.exitTime = new Date();
//   visitor.status = 'checkedout';
//   await visitor.save();

//   const io = req.app.get('io');
//   io.emit('visitorUpdate', { action: 'checkedOut', visitor });

//   res.json(visitor);
// };

// const verifyPasscode = async (req, res) => {
//   try {
//     const { passcode } = req.body;
//     const guardId = req.user.id;

//     const visitor = await Visitor.findOne({ passcode });

//     if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });

//     if (visitor.passcodeUsed)
//       return res.status(400).json({ msg: 'Passcode already used or expired.' });

//     // ✅ Valid passcode
//     visitor.status = 'allowed';
//     visitor.passcodeUsed = true;
//     visitor.entryTime = new Date();
//     visitor.guard = guardId;
//     await visitor.save();

//     // Optional: Emit update to dashboard via socket.io
//     const io = req.app.get('io');
//     if (io) io.emit('visitorUpdate', { action: 'passcodeVerified', visitor });

//     return res.status(200).json({ msg: 'Passcode verified successfully', visitor });
//   } catch (err) {
//     console.error('Error verifying passcode:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// module.exports = { addVisitor, approveByResident, guardAllow, checkOut, verifyPasscode };


// // backend/controllers/guardController.js
// const Visitor = require('../models/Visitor');
// const Resident = require('../models/Resident');
// const { nanoid } = require('nanoid');
// const sendMail = require('../utils/mail'); // for email alerts

// // 🟢 Guard adds a visitor (preapproved OR walk-in)
// const addVisitor = async (req, res) => {
//   try {
//     const { name, mobile, purpose, flatVisited, preapproved } = req.body;
//     const guardId = req.user.id;
//     const io = req.app.get('io');

//     // find resident by flatVisited
//     const resident = await Resident.findOne({ flatNo: flatVisited });
//     if (!resident) return res.status(404).json({ msg: 'Resident not found' });

//     const passcode = preapproved ? nanoid(6) : null;

//     const visitor = new Visitor({
//       name,
//       mobile,
//       purpose,
//       flatVisited,
//       resident: resident._id,
//       guard: guardId,
//       preapproved,
//       passcode,
//       status: preapproved ? 'preapproved' : 'pending'
//     });

//     await visitor.save();

//     // 📨 If not preapproved, send email to resident for approval
//     if (!preapproved && resident.email) {
//       await sendMail({
//         to: resident.email,
//         subject: 'Visitor Approval Request',
//         html: `
//           <p>Dear ${resident.name},</p>
//           <p>A visitor <b>${name}</b> wants to visit your flat (${flatVisited}).</p>
//           <p>Purpose: ${purpose}</p>
//           <p>Please log in to your dashboard to approve or reject this visitor.</p>
//           <br/>
//           <small>This is an automated message from the Society Gate System.</small>
//         `,
//       });
//     }

//     // 🔔 Notify all guards + residents in real-time
//     io.emit('visitorUpdate', { action: 'newVisitor', visitor });

//     res.json({ msg: 'Visitor added', visitor });
//   } catch (err) {
//     console.error('addVisitor error:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// // 🟡 Resident approves/rejects
// const approveByResident = async (req, res) => {
//   const { visitorId, decision } = req.body;
//   const visitor = await Visitor.findById(visitorId).populate('resident');

//   if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });

//   if (decision === 'allow') {
//     visitor.status = 'allowed';
//     visitor.entryTime = new Date();
//   } else {
//     visitor.status = 'rejected';
//   }

//   await visitor.save();

//   const io = req.app.get('io');
//   io.emit('visitorUpdate', { action: 'approvalChanged', visitor });

//   res.json(visitor);
// };

// // 🟢 Guard allows visitor manually
// const guardAllow = async (req, res) => {
//   const { visitorId } = req.body;
//   const visitor = await Visitor.findById(visitorId);
//   if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });

//   visitor.status = 'allowed';
//   visitor.entryTime = new Date();
//   visitor.guard = req.user.id;
//   await visitor.save();

//   const io = req.app.get('io');
//   io.emit('visitorUpdate', { action: 'allowedByGuard', visitor });
//   res.json(visitor);
// };

// // 🔵 Visitor checkout
// const checkOut = async (req, res) => {
//   const { visitorId } = req.body;
//   const visitor = await Visitor.findById(visitorId);
//   if (!visitor) return res.status(404).json({ msg: 'Not found' });

//   visitor.exitTime = new Date();
//   visitor.status = 'checkedout';
//   await visitor.save();

//   const io = req.app.get('io');
//   io.emit('visitorUpdate', { action: 'checkedOut', visitor });
//   res.json(visitor);
// };

// // 🔐 Verify passcode for preapproved visitors
// const verifyPasscode = async (req, res) => {
//   try {
//     const { passcode } = req.body;
//     const guardId = req.user.id;
//     const visitor = await Visitor.findOne({ passcode });

//     if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });
//     if (visitor.passcodeUsed)
//       return res.status(400).json({ msg: 'Passcode already used' });

//     visitor.status = 'allowed';
//     visitor.passcodeUsed = true;
//     visitor.entryTime = new Date();
//     visitor.guard = guardId;
//     await visitor.save();

//     const io = req.app.get('io');
//     io.emit('visitorUpdate', { action: 'passcodeVerified', visitor });

//     res.json({ msg: 'Passcode verified', visitor });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// module.exports = {
//   addVisitor,
//   approveByResident,
//   guardAllow,
//   checkOut,
//   verifyPasscode,
// };



// backend/controllers/guardController.js
const Visitor = require('../models/Visitor');
const Resident = require('../models/Resident');
const { nanoid } = require('nanoid');
const sendMail = require('../utils/mail');

const addVisitor = async (req, res) => {
  try {
    const { name, mobile, purpose, flatVisited, preapproved } = req.body;
    const guardId = req.user.id;
    const io = req.app.get('io');

    // try find resident by flatVisited (match either flatNo or wing-flatNo)
    const resident = await Resident.findOne({
      $or: [
        { flatNo: flatVisited },
        { $expr: { $eq: [ { $concat: [ "$wing", "-", "$flatNo" ] }, flatVisited ] } }
      ]
    });

    if (!resident) {
      // If resident not found by exact field, attempt simple flatNo lookup
      // (existing data may vary in shape)
      // Allow guard to add visitor even if resident not located — keep record
      const passcode = preapproved ? nanoid(6) : null;
      const visitor = new Visitor({
        name,
        mobile,
        purpose,
        flatVisited,
        preapproved: !!preapproved,
        passcode,
        guard: guardId,
        status: preapproved ? 'preapproved' : 'pending'
      });
      await visitor.save();
      if (!preapproved && resident && resident.email) {
        try {
          await sendMail({
            to: resident.email,
            subject: 'Visitor Approval Request',
            html: `<p>Visitor ${name} requested to visit ${flatVisited}.</p>`
          });
        } catch(e) { console.warn('mail failed', e); }
      }
      if (io) io.emit('visitorUpdate', { action: 'newVisitor', visitor });
      return res.json({ msg: 'Visitor added (resident not matched)', visitor });
    }

    // create visitor linked to resident
    const passcode = preapproved ? nanoid(6) : null;
    const visitor = new Visitor({
      name,
      mobile,
      purpose,
      flatVisited,
      resident: resident._id,
      guard: guardId,
      preapproved: !!preapproved,
      passcode,
      status: preapproved ? 'preapproved' : 'pending'
    });

    await visitor.save();

    // Send approval request to resident for walk-in visitors
    if (!preapproved && resident.email) {
      try {
        await sendMail({
          to: resident.email,
          subject: 'Visitor Approval Request',
          html: `
            <p>Dear ${resident.name},</p>
            <p>A visitor <b>${name}</b> (purpose: ${purpose}) is waiting to visit ${flatVisited}.</p>
            <p>Please login to approve or reject.</p>
          `
        });
      } catch (mailErr) {
        console.warn('mail send failed', mailErr);
      }
    }

    if (io) io.emit('visitorUpdate', { action: 'newVisitor', visitor });
    return res.json({ msg: 'Visitor added', visitor });
  } catch (err) {
    console.error('addVisitor error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const approveByResident = async (req, res) => {
  try {
    const { visitorId, decision } = req.body;
    const visitor = await Visitor.findById(visitorId);
    if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });

    if (decision === 'allow') {
      visitor.status = 'allowed';
      visitor.entryTime = new Date();
    } else {
      visitor.status = 'rejected';
    }
    await visitor.save();

    const io = req.app.get('io');
    if (io) io.emit('visitorUpdate', { action: 'approvalChanged', visitor });

    return res.json(visitor);
  } catch (err) {
    console.error('approveByResident', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const guardAllow = async (req, res) => {
  try {
    const { visitorId } = req.body;
    const visitor = await Visitor.findById(visitorId);
    if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });

    visitor.status = 'allowed';
    visitor.entryTime = new Date();
    visitor.guard = req.user.id;
    await visitor.save();

    const io = req.app.get('io');
    if (io) io.emit('visitorUpdate', { action: 'allowedByGuard', visitor });

    return res.json(visitor);
  } catch (err) {
    console.error('guardAllow', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const checkOut = async (req, res) => {
  try {
    const { visitorId } = req.body;
    const visitor = await Visitor.findById(visitorId);
    if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });

    visitor.exitTime = new Date();
    visitor.status = 'checkedout';
    await visitor.save();

    const io = req.app.get('io');
    if (io) io.emit('visitorUpdate', { action: 'checkedOut', visitor });

    return res.json(visitor);
  } catch (err) {
    console.error('checkOut', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const verifyPasscode = async (req, res) => {
  try {
    const { passcode } = req.body;
    const guardId = req.user.id;
    const visitor = await Visitor.findOne({ passcode });

    if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });
    if (visitor.passcodeUsed) return res.status(400).json({ msg: 'Passcode already used' });

    visitor.status = 'allowed';
    visitor.passcodeUsed = true;
    visitor.entryTime = new Date();
    visitor.guard = guardId;
    await visitor.save();

    const io = req.app.get('io');
    if (io) io.emit('visitorUpdate', { action: 'passcodeVerified', visitor });

    return res.json({ msg: 'Passcode verified', visitor });
  } catch (err) {
    console.error('verifyPasscode', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  addVisitor,
  approveByResident,
  guardAllow,
  checkOut,
  verifyPasscode
};
