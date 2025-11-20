// src/components/SummaryCards.jsx
import React from "react";

export default function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="p-4 bg-white/70 backdrop-blur rounded-2xl border border-purple-200 shadow-md">
        <div className="text-sm text-purple-700 font-semibold">Total Collected</div>
        <div className="text-2xl font-bold text-gray-900">₹{summary.totalCollected}</div>
      </div>
      <div className="p-4 bg-white/70 backdrop-blur rounded-2xl border border-purple-200 shadow-md">
        <div className="text-sm text-purple-700 font-semibold">Pending Dues</div>
        <div className="text-2xl font-bold text-gray-900">₹{summary.pendingDues}</div>
      </div>
      <div className="p-4 bg-white/70 backdrop-blur rounded-2xl border border-purple-200 shadow-md">
        <div className="text-sm text-purple-700 font-semibold">Overdue</div>
        <div className="text-2xl font-bold text-gray-900">₹{summary.overdue}</div>
      </div>
      <div className="p-4 bg-white/70 backdrop-blur rounded-2xl border border-purple-200 shadow-md">
        <div className="text-sm text-purple-700 font-semibold">Paid / Unpaid</div>
        <div className="text-2xl font-bold text-gray-900">{summary.paidCount} / {summary.unpaidCount}</div>
      </div>
    </div>
  );
}
