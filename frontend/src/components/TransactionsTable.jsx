// src/components/TransactionsTable.jsx
import React from "react";

export default function TransactionsTable({ txns }) {
  return (
    <div className="p-4 bg-white/60 backdrop-blur rounded-xl border border-purple-200">
      <h3 className="font-semibold text-purple-900 mb-2">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-gray-600">
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Type</th>
              <th className="py-2">Method</th>
              <th className="py-2 text-right">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {txns.map((t, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="py-2 text-sm">{t.date}</td>
                <td className="py-2 text-sm">{t.type}</td>
                <td className="py-2 text-sm">{t.method}</td>
                <td className="py-2 text-sm text-right">₹{t.amount}</td>
                <td className="py-2 text-sm">
                  <span className={`px-2 py-0.5 rounded ${t.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
