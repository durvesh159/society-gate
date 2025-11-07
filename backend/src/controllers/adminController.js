// const Resident = require('../models/Resident');
// const Guard = require('../models/Guard');
// const Visitor = require('../models/Visitor');
// const bcrypt = require('bcryptjs');
// const { nanoid } = require('nanoid');

// const addResident = async (req, res) => {
//   const { name, wing, flatNo, email, password, mobile } = req.body;
//   const uniqueId = `R-${Date.now().toString().slice(-6)}${Math.floor(Math.random()*90)+10}`;
//   const hashed = await bcrypt.hash(password, 10);
//   const resident = new Resident({ name, wing, flatNo, email, password: hashed, mobile, uniqueId });
//   await resident.save();
//   // TODO: send email with credentials
//   res.json(resident);
// }

// const addGuard = async (req, res) => {
//   const { name, address, email, password, mobile } = req.body;
//   const uniqueId = `G-${Date.now().toString().slice(-6)}${Math.floor(Math.random()*90)+10}`;
//   const hashed = await bcrypt.hash(password, 10);
//   const guard = new Guard({ name, address, email, password: hashed, mobile, uniqueId });
//   await guard.save();
//   // TODO: send email with credentials
//   res.json(guard);
// }

// const getVisitors = async (req, res) => {
//   const visitors = await Visitor.find().populate('resident guard').sort({ createdAt: -1 });
//   res.json(visitors);
// }

// module.exports = { addResident, addGuard, getVisitors };


const Resident = require('../models/Resident');
const Guard = require('../models/Guard');
const Visitor = require('../models/Visitor');
const bcrypt = require('bcryptjs');
const sendMail = require('../utils/mail');

const addResident = async (req, res) => {
  const { name, wing, flatNo, email, password, mobile } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const resident = new Resident({ name, wing, flatNo, email, password: hashed, mobile });
  await resident.save();

  // send credentials
  await sendMail({
    to: email,
    subject: 'Welcome to Society Gate System',
    html: `<p>Hello ${name},</p><p>Your resident account has been created.</p>
           <p>Email: ${email}<br/>Password: ${password}</p>`
  });

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

const getVisitors = async (req, res) => {
  const visitors = await Visitor.find().populate('resident guard').sort({ createdAt: -1 });
  res.json(visitors);
};

module.exports = { addResident, addGuard, getVisitors };
