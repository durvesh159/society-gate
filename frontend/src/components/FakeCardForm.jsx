// src/components/FakeCardForm.jsx
import React from "react";

export default function FakeCardForm({ onPay }) {
  return (
    <div className="p-4 bg-white/80 rounded-xl border border-purple-100">
      <div className="mb-2 text-sm text-gray-600">Card number</div>
      <input placeholder="4242 4242 4242 4242" className="p-3 rounded-lg w-full border" />
      <div className="flex gap-2 mt-3">
        <div className="flex-1">
          <div className="text-sm text-gray-600">Expiry</div>
          <input placeholder="MM/YY" className="p-3 rounded-lg w-full border" />
        </div>
        <div className="w-32">
          <div className="text-sm text-gray-600">CVV</div>
          <input placeholder="123" className="p-3 rounded-lg w-full border" />
        </div>
      </div>
      <div className="mt-3 text-right">
        <button onClick={() => onPay && onPay("Card")} className="px-4 py-2 bg-purple-700 text-white rounded-lg">Pay</button>
      </div>
    </div>
  );
}
