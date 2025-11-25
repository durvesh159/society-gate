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



// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT || 587),
//   secure: process.env.SMTP_PORT === "465", // true only if port is 465
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false, // allows development testing
//   }
// });

// // verify transporter to see errors
// transporter.verify((error, success) => {
//   if (error) {
//     console.log("Mail Server Connection Error:", error);
//   } else {
//     console.log("Mail Server is ready to send messages");
//   }
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


const brevo = require("@getbrevo/brevo");

// Configure Brevo client
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendMail = async ({ to, subject, html, text }) => {
  try {
    const emailData = {
      sender: {
        email: process.env.ADMIN_EMAIL || "no-reply@societygate.com",
        name: "Society Gate",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html || `<p>${text}</p>`,
    };

    const response = await apiInstance.sendTransacEmail(emailData);
    console.log("Email Sent Successfully via Brevo API");
    return response;
  } catch (error) {
    console.error("Brevo Email Error =>", error.response?.body || error);
    throw new Error("Email sending failed!");
  }
};

module.exports = sendMail;
