// const Resident = require('../models/Resident');
// const Guard = require('../models/Guard');
// const Staff = require('../models/Staff');
// const Visitor = require('../models/Visitor');
// const bcrypt = require('bcryptjs');
// const sendMail = require('../utils/mail');

// const addResident = async (req, res) => {
//   const { name, wing, flatNo, email, password, mobile } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const resident = new Resident({ name, wing, flatNo, email, password: hashed, mobile });
//   await resident.save();

//   try { 
//   await sendMail({
//     to: email,
//     subject: 'Welcome to Society Gate System',
//     html: `<p>Hello ${name},</p><p>Your resident account has been created.</p>
//            <p>Email: ${email}<br/>Password: ${password}</p>`
//   }); 
// } catch (e) { 
//   console.log("Mail error:", e);
// }


//   res.json(resident);
// };

// const addGuard = async (req, res) => {
//   const { name, address, email, password, mobile } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const guard = new Guard({ name, address, email, password: hashed, mobile });
//   await guard.save();

//   await sendMail({
//     to: email,
//     subject: 'Guard Login Credentials',
//     html: `<p>Hello ${name},</p><p>Your account for Society Gate System has been created.</p>
//            <p>Email: ${email}<br/>Password: ${password}</p>`
//   });

//   res.json(guard);
// };

// const getAllGuards = async (req, res) => {
//   try {
//     const guards = await Guard.find().sort({ name: 1 });
//     res.json(guards);
//   } catch (err) {
//     console.error("getAllGuards error:", err);
//     res.status(500).json({ msg: "Could not fetch guards" });
//   }
// };

// // ✅ Admin adds staff (cook, maid, etc.)
// const addStaff = async (req, res) => {
//   const { name, role, address, email, password, mobile } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const staff = new Staff({ name, role, address, email, password: hashed, mobile });
//   await staff.save();

//   await sendMail({
//     to: email,
//     subject: 'Staff Login Credentials',
//     html: `<p>Hello ${name},</p><p>Your ${role} account has been created.</p>
//            <p>Email: ${email}<br/>Password: ${password}</p>`
//   });

//   res.json(staff);
// };

// const deleteStaff = async (req, res) => {
//   try {
//     await Staff.findByIdAndDelete(req.params.id);
//     res.json({ msg: "Staff deleted" });
//   } catch (err) {
//     res.status(500).json({ msg: "Error deleting staff" });
//   }
// };


// const getVisitors = async (req, res) => {
//   const visitors = await Visitor.find().populate('resident guard').sort({ createdAt: -1 });
//   res.json(visitors);
// };

// const getAllStaff = async (req, res) => {
//   const staffList = await Staff.find().sort({ createdAt: -1 });
//   res.json(staffList);
// };


// const getAllResidents = async (req, res) => {
//   try {
//     const residents = await Resident.find().sort({ name: 1 });
//     res.json(residents);
//   } catch (err) {
//     console.error("getAllResidents error:", err);
//     res.status(500).json({ msg: "Could not fetch residents" });
//   }
// };

// module.exports = { addResident, addGuard, addStaff, getVisitors, getAllStaff, getAllResidents, getAllGuards, deleteStaff };



const Resident = require('../models/Resident');
const Guard = require('../models/Guard');
const Staff = require('../models/Staff');
const Visitor = require('../models/Visitor');
const bcrypt = require('bcryptjs');
const sendMail = require('../utils/mail');

const addResident = async (req, res) => {
  try {
    const { name, wing, flatNo, email, password, mobile } = req.body;

    console.log("Incoming Resident Body:", req.body);   // ⭐ ADD THIS

    const exists = await Resident.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists!" });

    const hashed = await bcrypt.hash(password, 10);

    const resident = new Resident({
      name,
      wing,
      flatNo,
      email,
      password: hashed,
      mobile,
      uniqueId: `${wing}-${flatNo}-${Date.now()}`
    });

    console.log("Saving resident...");  // ⭐ ADD THIS
    await resident.save();
    console.log("Saved successfully."); // ⭐ ADD THIS

    try {
      await sendMail({
        to: email,
        subject: 'Welcome to Society Gate System',
        html: `Your account is ready.<br>Email: ${email}<br>Password: ${password}`
      });
    } catch (mailError) {
      console.log("MAIL ERROR (ignored):", mailError);
    }

    return res.json(resident);

  } catch (err) {
    console.log("SERVER ERROR in addResident():", err);  // ⭐ SHOW TRUE ERROR
    return res.status(500).json({ msg: "Server Error Adding Resident" });
  }
};



const addGuard = async (req, res) => {
  try {
    const { name, address, email, password, mobile } = req.body;

    // Check duplicate email
    const exists = await Guard.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists!" });

    const hashed = await bcrypt.hash(password, 10);

    const uniqueId = `GUARD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const guard = new Guard({
      name,
      address,
      email,
      password: hashed,
      mobile,
      uniqueId
    });
    

    await guard.save();

    await sendMail({
      to: email,
      subject: 'Guard Login Credentials',
      html: `<p>Hello ${name},</p>
             <p>Your account for Society Gate System has been created.</p>
             <p>Email: ${email}<br/>Password: ${password}</p>
             <p>Your ID: ${uniqueId}</p>`
    });

    res.json(guard);

  } catch (err) {
    console.error("addGuard error:", err);
    res.status(500).json({ msg: "Server error while adding guard" });
  }
};


const getAllGuards = async (req, res) => {
  try {
    const guards = await Guard.find().sort({ name: 1 });
    res.json(guards);
  } catch (err) {
    console.error("getAllGuards error:", err);
    res.status(500).json({ msg: "Could not fetch guards" });
  }
};

// ✅ Admin adds staff (cook, maid, etc.)
const addStaff = async (req, res) => {
  const { name, role, address, email, password, mobile } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const staff = new Staff({ name, role, address, email, password: hashed, mobile });
  await staff.save();

  await sendMail({
    to: email,
    subject: 'Staff Login Credentials',
    html: `<p>Hello ${name},</p><p>Your ${role} account has been created.</p>
           <p>Email: ${email}<br/>Password: ${password}</p>`
  });

  res.json(staff);
};

const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ msg: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting staff" });
  }
};


const getVisitors = async (req, res) => {
  const visitors = await Visitor.find().populate('resident guard').sort({ createdAt: -1 });
  res.json(visitors);
};

const getAllStaff = async (req, res) => {
  const staffList = await Staff.find().sort({ createdAt: -1 });
  res.json(staffList);
};


const getAllResidents = async (req, res) => {
  try {
    const residents = await Resident.find().sort({ name: 1 });
    res.json(residents);
  } catch (err) {
    console.error("getAllResidents error:", err);
    res.status(500).json({ msg: "Could not fetch residents" });
  }
};


const deleteResident = async (req, res) => {
  try {
    await Resident.findByIdAndDelete(req.params.id);
    res.json({ msg: "Resident deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting resident" });
  }
};

const deleteGuard = async (req, res) => {
  try {
    await Guard.findByIdAndDelete(req.params.id);
    res.json({ msg: "Guard deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting guard" });
  }
};


module.exports = { addResident, addGuard, addStaff, getVisitors, getAllStaff, getAllResidents, getAllGuards, deleteStaff, deleteGuard, deleteResident };
