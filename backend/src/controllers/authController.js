const Admin = require('../models/Admin');
const Resident = require('../models/Resident');
const Guard = require('../models/Guard');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;
  // Search in Admin, Resident, Guard
  const user = await Admin.findOne({ email }) || await Resident.findOne({ email }) || await Guard.findOne({ email });
  if(!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await (user.comparePassword ? user.comparePassword(password) : bcrypt.compare(password, user.password));
  if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const payload = { id: user._id, role: user.role || (user.email === process.env.ADMIN_EMAIL ? 'admin' : 'resident'), email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, email: user.email, role: payload.role }});
}

module.exports = { login };
