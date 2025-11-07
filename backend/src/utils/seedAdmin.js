const Admin = require('../models/Admin');

const seedAdmin = async () => {
  const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if(exists) return;
  const admin = new Admin({
    name: 'Admin',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  });
  await admin.save();
  console.log('Seeded admin:', process.env.ADMIN_EMAIL);
}

module.exports = seedAdmin;
