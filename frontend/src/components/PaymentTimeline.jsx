// src/components/PaymentTimeline.jsx
import React from "react";

export default function PaymentTimeline({ invoices }) {
  return (
    <div className="p-4 bg-white/60 backdrop-blur rounded-2xl border border-purple-200 shadow-md">
      <h3 className="text-lg font-semibold text-purple-900 mb-3">Invoice Timeline</h3>
      <ul className="space-y-3">
        {invoices.map(inv => (
          <li key={inv.id} className="flex items-start gap-3">
            <div className={`w-3 h-3 rounded-full mt-2 ${inv.status === 'Paid' ? 'bg-green-500' : inv.status === 'Overdue' ? 'bg-red-500' : 'bg-yellow-400'}`}></div>
            <div>
              <div className="text-sm font-semibold">{inv.period} — {inv.id}</div>
              <div className="text-xs text-gray-600">{inv.status} • ₹{inv.amount} • {inv.date}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
