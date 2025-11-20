// src/components/ChartsSection.jsx
import React from "react";

/**
 * Simple lightweight SVG charts (no external deps) to show trends.
 * Replace with Recharts or Chart.js if you want real charts.
 */
export default function ChartsSection() {
  // sample sparkline points (normalized)
  const points = [4,6,5,8,9,7,10,12,9,11,13];
  // build polyline
  const max = Math.max(...points);
  const svgPoints = points.map((p, i) => `${i*(100/(points.length-1))},${100 - (p/max)*100}`).join(" ");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-white/70 rounded-2xl border border-purple-200">
        <div className="text-sm text-purple-900 font-semibold">Monthly Collections</div>
        <svg viewBox="0 0 100 100" className="w-full h-28 mt-3">
          <polyline fill="none" stroke="#7c3aed" strokeWidth="1.5" points={svgPoints} />
        </svg>
      </div>
      <div className="p-4 bg-white/70 rounded-2xl border border-purple-200">
        <div className="text-sm text-purple-900 font-semibold">Paid vs Pending</div>
        <div className="flex items-center gap-4 mt-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">78% <div className="text-xs">Paid</div></div>
          <div>
            <div className="text-sm font-semibold">Pending</div>
            <div className="text-gray-600">22% of accounts</div>
          </div>
        </div>
      </div>
    </div>
  );
}
