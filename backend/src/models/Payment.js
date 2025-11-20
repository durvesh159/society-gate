// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema({
//   residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },

//   amount: Number,
//   period: String, // e.g., "Jan 2025 - Mar 2025"

//   orderId: String,           // Razorpay/Stripe Order ID
//   paymentId: String,         // Razorpay/Stripe Payment ID
//   signature: String,         // Razorpay signature

//   status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },

//   method: { type: String }, // upi, card, netbanking
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Payment", paymentSchema);
