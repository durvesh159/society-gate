// src/components/UPIForm.jsx
import React, { useState } from "react";

export default function UPIForm({ onPay }) {
  const [upi, setUpi] = useState("");
  return (
    <div className="p-4 bg-white/80 rounded-xl border border-purple-100">
      <div className="text-sm text-gray-600 mb-2">UPI ID</div>
      <input value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="rahul@upi or phone@upi" className="p-3 rounded-lg w-full border" />
      <div className="mt-3 text-right">
        <button onClick={() => onPay && onPay("UPI", upi)} className="px-4 py-2 bg-purple-700 text-white rounded-lg">Pay with UPI</button>
      </div>
    </div>
  );
}
