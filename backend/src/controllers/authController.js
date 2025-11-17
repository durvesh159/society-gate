// const Admin = require('../models/Admin');
// const Resident = require('../models/Resident');
// const Guard = require('../models/Guard');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   // Search in Admin, Resident, Guard
//   const user = await Admin.findOne({ email }) || await Resident.findOne({ email }) || await Guard.findOne({ email });
//   if(!user) return res.status(400).json({ msg: 'Invalid credentials' });

//   const isMatch = await (user.comparePassword ? user.comparePassword(password) : bcrypt.compare(password, user.password));
//   if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//   const payload = { id: user._id, role: user.role || (user.email === process.env.ADMIN_EMAIL ? 'admin' : 'resident'), email: user.email };
//   const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
//   res.json({ token, user: { id: user._id, email: user.email, role: payload.role }});
// }

// module.exports = { login };



const Admin = require('../models/Admin');
const Resident = require('../models/Resident');
const Guard = require('../models/Guard');
const Staff = require('../models/Staff'); // ✅ Added Staff model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Search user in all collections
    const user =
      (await Admin.findOne({ email })) ||
      (await Resident.findOne({ email })) ||
      (await Guard.findOne({ email })) ||
      (await Staff.findOne({ email }));

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // ✅ Check password using model’s method or bcrypt
    const isMatch = user.comparePassword
      ? await user.comparePassword(password)
      : await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // ✅ Determine role dynamically
    let role = user.role;
    if (!role) {
      if (user instanceof Admin) role = 'admin';
      else if (user instanceof Resident) role = 'resident';
      else if (user instanceof Guard) role = 'guard';
      else if (user instanceof Staff) role = 'staff'; // always "staff"
    }

    // 👇 NEW: ensure all staff have role 'staff'
if (user instanceof Staff) {
  role = 'staff';
}

    // ✅ Create JWT token
    const payload = {
      id: user._id,
      email: user.email,
      role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    // ✅ Send success response
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


// ==========================
// GET LOGGED-IN USER PROFILE
// ==========================
const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let Model;
    if (userRole === "admin") Model = Admin;
    if (userRole === "resident") Model = Resident;
    if (userRole === "guard") Model = Guard;
    if (userRole === "staff") Model = Staff;

    const user = await Model.findById(userId).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports = { login, getMe };
