const Resident = require('../models/Resident');
const Guard = require('../models/Guard');
const Staff = require('../models/Staff');
const Visitor = require('../models/Visitor');
const bcrypt = require('bcryptjs');
const sendMail = require('../utils/mail');

const addResident = async (req, res) => {
  const { name, wing, flatNo, email, password, mobile } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const resident = new Resident({ name, wing, flatNo, email, password: hashed, mobile });
  await resident.save();

  try { 
  await sendMail({
    to: email,
    subject: 'Welcome to Society Gate System',
    html: `<p>Hello ${name},</p><p>Your resident account has been created.</p>
           <p>Email: ${email}<br/>Password: ${password}</p>`
  }); 
} catch (e) { 
  console.log("Mail error:", e);
}


  res.json(resident);
};

const addGuard = async (req, res) => {
  const { name, address, email, password, mobile } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const guard = new Guard({ name, address, email, password: hashed, mobile });
  await guard.save();

  await sendMail({
    to: email,
    subject: 'Guard Login Credentials',
    html: `<p>Hello ${name},</p><p>Your account for Society Gate System has been created.</p>
           <p>Email: ${email}<br/>Password: ${password}</p>`
  });

  res.json(guard);
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

module.exports = { addResident, addGuard, addStaff, getVisitors, getAllStaff, getAllResidents, getAllGuards, deleteStaff };
