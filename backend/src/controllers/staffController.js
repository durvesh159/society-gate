// const Staff = require('../models/Staff');

// // ✅ Admin adds staff
// exports.addStaff = async (req, res) => {
//   try {
//     const { name, category, address, mobile } = req.body;
//     const newStaff = await Staff.create({ name, category, address, mobile });
//     res.status(201).json(newStaff);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Error adding staff' });
//   }
// };

// // ✅ Admin gets all staff
// exports.getAllStaff = async (req, res) => {
//   try {
//     const staffList = await Staff.find().sort({ createdAt: -1 });
//     res.json(staffList);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Error fetching staff list' });
//   }
// };

// // ✅ Guard marks staff entry
// exports.markEntry = async (req, res) => {
//   try {
//     const { staffId } = req.body;
//     const staff = await Staff.findById(staffId);
//     if (!staff) return res.status(404).json({ msg: 'Staff not found' });

//     staff.inTime = new Date();
//     staff.status = 'inside';
//     await staff.save();

//     const io = req.app.get('io');
//     io.emit('staffUpdate', { action: 'entry', staff });

//     res.json({ msg: 'Entry marked', staff });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Error marking entry' });
//   }
// };

// // ✅ Guard marks staff exit
// exports.markExit = async (req, res) => {
//   try {
//     const { staffId } = req.body;
//     const staff = await Staff.findById(staffId);
//     if (!staff) return res.status(404).json({ msg: 'Staff not found' });

//     staff.outTime = new Date();
//     staff.status = 'outside';
//     await staff.save();

//     const io = req.app.get('io');
//     io.emit('staffUpdate', { action: 'exit', staff });

//     res.json({ msg: 'Exit marked', staff });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Error marking exit' });
//   }
// };


const Staff = require('../models/Staff');

// ✅ Admin adds staff
exports.addStaff = async (req, res) => {
  try {
    const { name, role, address, email, password, mobile } = req.body;
    if (!name || !role || !email || !password) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    // prevent duplicate
    const existing = await Staff.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already exists' });

    const bcrypt = require('bcryptjs');
    const hashed = await bcrypt.hash(password, 10);

    const newStaff = await Staff.create({
      name,
      role,
      address,
      email,
      password: hashed,
      mobile,
    });

    res.status(201).json(newStaff);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error adding staff' });
  }
};

// ✅ Admin gets all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find().sort({ createdAt: -1 });
    res.json(staffList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching staff list' });
  }
};

// ✅ Guard marks staff entry
exports.markEntry = async (req, res) => {
  try {
    const { staffId } = req.body;
    const staff = await Staff.findById(staffId);
    if (!staff) return res.status(404).json({ msg: 'Staff not found' });

    staff.entryTime = new Date();
    staff.isPresent = true;
    await staff.save();

    const io = req.app.get('io');
    if (io) io.emit('staffUpdate', { action: 'entry', staff });

    res.json({ msg: 'Entry marked', staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error marking entry' });
  }
};

// ✅ Guard marks staff exit
exports.markExit = async (req, res) => {
  try {
    const { staffId } = req.body;
    const staff = await Staff.findById(staffId);
    if (!staff) return res.status(404).json({ msg: 'Staff not found' });

    staff.exitTime = new Date();
    staff.isPresent = false;
    await staff.save();

    const io = req.app.get('io');
    if (io) io.emit('staffUpdate', { action: 'exit', staff });

    res.json({ msg: 'Exit marked', staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error marking exit' });
  }
};

// ✅ Get single staff profile (for staff dashboard)
exports.getStaffProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ msg: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching staff profile' });
  }
};
