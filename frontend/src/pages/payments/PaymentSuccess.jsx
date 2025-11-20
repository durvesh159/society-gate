// src/pages/PaymentSuccess.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const txnId = `TXN-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-50 p-8">
      <div className="bg-white/95 p-8 rounded-2xl shadow-lg text-center max-w-md">
        <div className="w-28 h-28 rounded-full mx-auto bg-green-100 text-green-700 flex items-center justify-center text-4xl font-bold">✓</div>
        <h2 className="text-2xl font-bold mt-4">Payment Successful</h2>
        <p className="text-gray-600 mt-2">Mode: {state?.mode || "Card"}</p>
        <p className="text-gray-600">Transaction ID: <span className="font-mono">{txnId}</span></p>

        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => navigate("/payments")} className="px-4 py-2 bg-purple-700 text-white rounded-lg">Back to Payments</button>
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
}
