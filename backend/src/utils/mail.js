// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT || 587),
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// const sendMail = async ({ to, subject, html, text }) => {
//   const info = await transporter.sendMail({
//     from: `"Society Gate" <${process.env.SMTP_USER}>`,
//     to,
//     subject,
//     text,
//     html,
//   });
//   return info;
// };

// module.exports = sendMail;



const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// verify transporter to see errors
transporter.verify((error, success) => {
  if (error) {
    console.log("Mail Server Connection Error:", error);
  } else {
    console.log("Mail Server is ready to send messages");
  }
});

const sendMail = async ({ to, subject, html, text }) => {
  const info = await transporter.sendMail({
    from: `"Society Gate" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
  return info;
};

module.exports = sendMail;
