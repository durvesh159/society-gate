// src/components/InvoiceCard.jsx
import React from "react";

export default function InvoiceCard({ invoice, showActions = true, onDownload }) {
  return (
    <div id={`invoice-${invoice.id}`} className="p-6 bg-white/95 rounded-2xl border border-purple-200 shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-2xl font-bold text-purple-900">SocietyGate Apartments</div>
          <div className="text-sm text-gray-600">123, Main Road, Pune</div>
        </div>
        <div className="text-right">
          <div className="text-sm">Invoice</div>
          <div className="font-semibold">{invoice.id}</div>
          <div className="text-xs text-gray-600">{invoice.date}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-600">Billed To</div>
          <div className="font-semibold">{invoice.residentName}</div>
          <div className="text-sm text-gray-600">{invoice.flat}</div>
        </div>
        <div>
          <div className="text-xs text-gray-600">Period</div>
          <div className="font-semibold">{invoice.period}</div>
          <div className="text-xs text-gray-600 mt-2">Status: <span className={`px-2 py-0.5 rounded ${invoice.status==='Paid'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'}`}>{invoice.status}</span></div>
        </div>
      </div>

      <div className="mt-6">
        <table className="w-full text-left">
          <thead className="text-xs text-gray-600 border-b">
            <tr>
              <th className="py-2">Description</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">Monthly Maintenance</td>
              <td className="py-2 text-right">₹{invoice.amount}</td>
            </tr>
            <tr>
              <td className="py-2">Late Fee</td>
              <td className="py-2 text-right">₹{invoice.lateFee}</td>
            </tr>
            <tr className="font-bold border-t">
              <td className="py-3">Total</td>
              <td className="py-3 text-right">₹{invoice.amount + invoice.lateFee}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {showActions && (
        <div className="flex gap-3 justify-end mt-4">
          <button onClick={() => onDownload && onDownload(`invoice-${invoice.id}`, `${invoice.id}.png`)} className="px-3 py-1 bg-purple-700 text-white rounded-lg">Download</button>
          <button onClick={() => window.print()} className="px-3 py-1 bg-gray-300 rounded-lg">Print</button>
        </div>
      )}
    </div>
  );
}
