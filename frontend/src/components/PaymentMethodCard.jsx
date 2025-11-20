// src/components/PaymentMethodCard.jsx
import React from "react";

export default function PaymentMethodCard({ title, subtitle, children, onSelect }) {
  return (
    <div className="p-4 bg-white/80 backdrop-blur rounded-xl border border-purple-200 hover:shadow-md transition cursor-pointer" onClick={onSelect}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-purple-900">{title}</div>
          <div className="text-sm text-gray-600">{subtitle}</div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
