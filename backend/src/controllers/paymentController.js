// import Payment from "../models/Payment.js";
// import { razorpay } from "../config/paymentConfig.js";

// export const createPaymentOrder = async (req, res) => {
//   try {
//     const { residentId, amount, period } = req.body;

//     // Razorpay order
//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: "RCPT-" + Math.random(),
//     });

//     const payment = await Payment.create({
//       residentId,
//       amount,
//       period,
//       orderId: order.id,
//       status: "pending"
//     });

//     res.json({
//       success: true,
//       orderId: order.id,
//       payment
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// import crypto from "crypto";
// import Payment from "../models/Payment.js";
// import Invoice from "../models/Invoice.js";
// import { generateId } from "../utils/generateRandomId.js";
// import { generateInvoicePDF } from "../utils/generateInvoicePDF.js";

// export const verifyPayment = async (req, res) => {
//   try {
//     const { orderId, paymentId, signature } = req.body;

//     const body = orderId + "|" + paymentId;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== signature)
//       return res.status(400).json({ success: false, message: "Invalid signature" });

//     const payment = await Payment.findOneAndUpdate(
//       { orderId },
//       { paymentId, signature, status: "paid" },
//       { new: true }
//     );

//     // Create invoice
//     const invoiceData = {
//       residentId: payment.residentId,
//       paymentId,
//       invoiceId: generateId(),
//       amount: payment.amount,
//       period: payment.period,
//       status: "paid"
//     };

//     const invoice = await Invoice.create(invoiceData);

//     // Generate PDF
//     const pdfPath = await generateInvoicePDF(invoice);
//     invoice.pdfUrl = pdfPath;
//     await invoice.save();

//     res.json({
//       success: true,
//       message: "Payment Verified",
//       invoice
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
