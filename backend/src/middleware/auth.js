const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Resident = require('../models/Resident');
const Guard = require('../models/Guard');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if(!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded: { id, role, email }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
}

module.exports = auth;
