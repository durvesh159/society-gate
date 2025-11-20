// src/components/ReminderModal.jsx
import React, { useState } from "react";

export default function ReminderModal({ open, onClose, onSend, resident }) {
  const [msg, setMsg] = useState(`Dear ${resident?.name}, your maintenance of ₹${resident?.amountDue} is due on ${resident?.dueDate}. Please pay at the earliest.`);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 w-full max-w-md">
        <h3 className="font-semibold text-purple-900">Send Reminder</h3>
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} className="w-full p-3 border rounded-lg mt-3" rows="6" />
        <div className="flex justify-end gap-3 mt-3">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded-lg">Cancel</button>
          <button onClick={() => { onSend && onSend(msg); onClose(); }} className="px-3 py-1 bg-purple-700 text-white rounded-lg">Send</button>
        </div>
      </div>
    </div>
  );
}
