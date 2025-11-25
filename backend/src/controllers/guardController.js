// // backend/controllers/guardController.js
// const Visitor = require('../models/Visitor');
// const Resident = require('../models/Resident');
// const { nanoid } = require('nanoid');
// const sendMail = require('../utils/mail');
// const sendSMS = require('../utils/sms');

// const addVisitor = async (req, res) => {
//   try {
//     const { name, mobile, purpose, flatVisited, preapproved, documentImage  } = req.body;
//     const guardId = req.user.id;
//     const io = req.app.get("io");

//     // Try to find resident linked to that flat
//     const resident = await Resident.findOne({
//       $or: [
//         { flatNo: flatVisited },
//         { 
//           $expr: { 
//             $eq: [ { $concat: [ "$wing", "-", "$flatNo" ] }, flatVisited ] 
//           } 
//         }
//       ]
//     });

//     // Create visitor record
//     const passcode = preapproved ? nanoid(6) : null;
//     const visitorData = {
//       name,
//       mobile,
//       purpose,
//       flatVisited,
//       preapproved: !!preapproved,
//       passcode,
//       guard: guardId,
//       status: preapproved ? "preapproved" : "pending",
//       documentImage, // store base64 temporarily
//       resident: resident?._id || undefined
//     };

//     const visitor = new Visitor(visitorData);
//     await visitor.save();

//     // -----------------------------------------------
//     //  SEND SMS + EMAIL NOTIFICATION TO RESIDENT
//     // -----------------------------------------------
//     if (!preapproved && resident) {
//       // ============= SMS =============
//       if (resident.mobile) {
//         //const smsMsg = `A new visitor ${name} wants to visit your flat ${flatVisited}. Please login to Society App and Allow/Reject.`;
//         const smsMsg = `OTP for your mobile verification is ${name}${flatVisited}. It will be valid for 1 minutes.`;
//         sendSMS(resident.mobile, smsMsg);
//       }

//       // ============= EMAIL =============
//       if (resident.email) {
//         try {
//           await sendMail({
//             to: resident.email,
//             subject: "Visitor Approval Request",
//             html: `
//               <p>Dear ${resident.name},</p>
//               <p>Visitor <b>${name}</b> (purpose: ${purpose}) is waiting at your gate.</p>
//               <p>Please login to approve or reject.</p>
//             `
//           });
//         } catch (mailErr) {
//           console.warn("Email sending failed:", mailErr);
//         }
//       }
//     }

//     // Push real-time update
//     if (io) io.emit("visitorUpdate", { action: "newVisitor", visitor });

//     return res.json({ msg: "Visitor added successfully", visitor });

//   } catch (err) {
//     console.error("addVisitor error:", err);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };

// const approveByResident = async (req, res) => {
//   try {
//     const { visitorId, decision } = req.body;
//     const visitor = await Visitor.findById(visitorId);
//     if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });

//     if (decision === 'allow') {
//       visitor.status = 'allowed';
//       visitor.entryTime = new Date();
//       visitor.documentImage = null;
//     } else {
//       visitor.status = 'rejected';
//     }
//     await visitor.save();

//     const io = req.app.get('io');
//     if (io) io.emit('visitorUpdate', { action: 'approvalChanged', visitor });

//     return res.json(visitor);
//   } catch (err) {
//     console.error('approveByResident', err);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// };

// const guardAllow = async (req, res) => {
//   try {
//     const { visitorId } = req.body;
//     const visitor = await Visitor.findById(visitorId);
//     if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });

//     visitor.status = 'allowed';
//     visitor.entryTime = new Date();
//     visitor.guard = req.user.id;
//     await visitor.save();

//     const io = req.app.get('io');
//     if (io) io.emit('visitorUpdate', { action: 'allowedByGuard', visitor });

//     return res.json(visitor);
//   } catch (err) {
//     console.error('guardAllow', err);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// };

// const checkOut = async (req, res) => {
//   try {
//     const { visitorId } = req.body;
//     const visitor = await Visitor.findById(visitorId);
//     if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });

//     visitor.exitTime = new Date();
//     visitor.status = 'checkedout';
//     await visitor.save();

//     const io = req.app.get('io');
//     if (io) io.emit('visitorUpdate', { action: 'checkedOut', visitor });

//     return res.json(visitor);
//   } catch (err) {
//     console.error('checkOut', err);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// };

// const verifyPasscode = async (req, res) => {
//   try {
//     const { passcode } = req.body;
//     const guardId = req.user.id;
//     const visitor = await Visitor.findOne({ passcode });

//     if (!visitor) return res.status(404).json({ msg: 'Visitor not found' });
//     if (visitor.passcodeUsed) return res.status(400).json({ msg: 'Passcode already used' });

//     visitor.status = 'allowed';
//     visitor.passcodeUsed = true;
//     visitor.entryTime = new Date();
//     visitor.guard = guardId;
//     await visitor.save();

//     const io = req.app.get('io');
//     if (io) io.emit('visitorUpdate', { action: 'passcodeVerified', visitor });

//     return res.json({ msg: 'Passcode verified', visitor });
//   } catch (err) {
//     console.error('verifyPasscode', err);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// };

// module.exports = {
//   addVisitor,
//   approveByResident,
//   guardAllow,
//   checkOut,
//   verifyPasscode
// };



// backend/controllers/guardController.js
const Visitor = require('../models/Visitor');
const Resident = require('../models/Resident');
const { nanoid } = require('nanoid');
const sendMail = require('../utils/mail');
const sendSMS = require('../utils/sms');

const addVisitor = async (req, res) => {
  try {
    const { name, mobile, purpose, flatVisited, preapproved, documentImage  } = req.body;
    const guardId = req.user.id;
    const io = req.app.get("io");

    // Try to find resident linked to that flat
    const resident = await Resident.findOne({
      $or: [
        { flatNo: flatVisited },
        { 
          $expr: { 
            $eq: [ { $concat: [ "$wing", "-", "$flatNo" ] }, flatVisited ] 
          } 
        }
      ]
    });

    // Create visitor record
    const passcode = preapproved ? nanoid(6) : null;
    const visitorData = {
      name,
      mobile,
      purpose,
      flatVisited,
      preapproved: !!preapproved,
      passcode,
      guard: guardId,
      status: preapproved ? "preapproved" : "pending",
      documentImage, // store base64 temporarily
      resident: resident?._id || undefined
    };

    const visitor = new Visitor(visitorData);
    await visitor.save();

    // -----------------------------------------------
    //  SEND SMS + EMAIL NOTIFICATION TO RESIDENT
    // -----------------------------------------------
    if (!preapproved && resident) {
      // ============= SMS =============
      if (resident.mobile) {
        //const smsMsg = `A new visitor ${name} wants to visit your flat ${flatVisited}. Please login to Society App and Allow/Reject.`;
        const smsMsg = `OTP for your mobile verification is ${name}${flatVisited}. It will be valid for 1 minutes.`;
        await sendSMS(resident.mobile, smsMsg);
      }

      // ============= EMAIL =============
      if (resident.email) {
        try {
          await sendMail({
            to: resident.email,
            subject: "Visitor Approval Request",
            html: `
              <p>Dear ${resident.name},</p>
              <p>Visitor <b>${name}</b> (purpose: ${purpose}) is waiting at your gate.</p>
              <p>Please login to approve or reject.</p>
            `
          });
        } catch (mailErr) {
          console.warn("Email sending failed:", mailErr);
        }
      }
    }

    // Push real-time update
    if (io) io.emit("visitorUpdate", { action: "newVisitor", visitor });

    return res.json({ msg: "Visitor added successfully", visitor });

  } catch (err) {
    console.error("addVisitor error:", err);
    return res.status(500).json({ msg: "Server error" });
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
      visitor.documentImage = null;
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
