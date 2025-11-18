// utils/sms.js
const axios = require("axios");

const authKey = "37384441434345535353454355524954593130301762250600";
const senderId = "DSSEPL";
const templateId = "1407167601485903193";
const route = "1";

async function sendSMS(mobile, message) {
  if (!mobile || !message) return;

  const apiUrl = `http://bulk.powerstext.in/http-tokenkeyapi.php?authentic-key=${authKey}&senderid=${senderId}&route=${route}&number=${mobile}&message=${encodeURIComponent(message)}&templateid=${templateId}`;

  try {
    const res = await axios.get(apiUrl);
    console.log("SMS sent:", res.data);
  } catch (err) {
    console.error("SMS sending failed:", err);
  }
}

module.exports = sendSMS;
