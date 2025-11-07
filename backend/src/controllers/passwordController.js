const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Resident = require('../models/Resident');
const Guard = require('../models/Guard');
const sendMail = require('../utils/mail');

const findUserByEmail = async (email) => {
  let user = await Admin.findOne({ email });
  if (user) return { user, type: 'Admin' };
  user = await Resident.findOne({ email });
  if (user) return { user, type: 'Resident' };
  user = await Guard.findOne({ email });
  if (user) return { user, type: 'Guard' };
  return { user: null };
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: 'Email required' });

  const { user } = await findUserByEmail(email);
  if (!user) return res.status(200).json({ msg: 'If that email exists, a reset link has been sent.' }); // avoid user enumeration

  // generate token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  // token valid for 1 hour
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
  await user.save();

  // Build reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

  // Email content (you can customize)
  const subject = 'Password reset for Society Gate';
  const html = `
    <p>You requested a password reset.</p>
    <p>Click the link below to set a new password (valid for 1 hour):</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>If you didn't request this, ignore this email.</p>
  `;

  try {
    await sendMail({ to: user.email, subject, html });
    return res.json({ msg: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    // cleanup tokens when email fails
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    console.error('Mail send error', err);
    return res.status(500).json({ msg: 'Error sending email' });
  }
};

const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  if (!email || !token || !newPassword) return res.status(400).json({ msg: 'Missing parameters' });

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  // search across models for user matching email + hashed token + expiry > now
  const findMatch = async (Model) => Model.findOne({
    email,
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  let user = await findMatch(Admin) || await findMatch(Resident) || await findMatch(Guard);

  if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

  // set new password (hash)
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  // clear reset fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  // Optionally notify user that password changed
  try {
    await sendMail({
      to: user.email,
      subject: 'Your password has been changed',
      html: `<p>Your password was successfully changed. If you didn't do this, contact admin immediately.</p>`
    });
  } catch (e) {
    console.warn('Post-reset email failed', e);
  }

  return res.json({ msg: 'Password updated successfully' });
};

module.exports = { requestPasswordReset, resetPassword };
