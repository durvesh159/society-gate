// src/components/QRPopup.jsx
import React from "react";

export default function QRPopup({ open, onClose, upiId = "society@upi" }) {
  if (!open) return null;
  // Placeholder SVG QR code – you can replace with generated QR image later
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">Scan to Pay (UPI)</h3>
        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="w-48 h-48 bg-white flex items-center justify-center border">QR</div>
        </div>
        <div className="mt-3 text-sm text-gray-600">UPI ID: <strong>{upiId}</strong></div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
}
