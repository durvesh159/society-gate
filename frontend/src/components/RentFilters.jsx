// src/components/RentFilters.jsx
import React, { useState } from "react";

export default function RentFilters({ onChange }) {
  const [bhk, setBhk] = useState("");
  const [furnished, setFurnished] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [q, setQ] = useState("");

  const apply = () => {
    onChange({
      ...(bhk && { bhk }),
      ...(furnished && { furnished }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(q && { q }),
    });
  };

  return (
    <div className="backdrop-blur-xl bg-white/70 border border-purple-200 rounded-2xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-purple-900 mb-3">Filters</h3>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="w-full p-2 border rounded mb-2" />
      <select value={bhk} onChange={e => setBhk(e.target.value)} className="w-full p-2 border rounded mb-2">
        <option value="">Any BHK</option>
        <option value="1">1 BHK</option>
        <option value="2">2 BHK</option>
        <option value="3">3 BHK</option>
      </select>
      <select value={furnished} onChange={e => setFurnished(e.target.value)} className="w-full p-2 border rounded mb-2">
        <option value="">Any Furnishing</option>
        <option value="Furnished">Furnished</option>
        <option value="Semi-Furnished">Semi-Furnished</option>
        <option value="Unfurnished">Unfurnished</option>
      </select>
      <div className="flex gap-2 mb-2">
        <input type="number" value={minPrice} onChange={e=>setMinPrice(e.target.value)} placeholder="Min" className="p-2 border rounded w-1/2" />
        <input type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="Max" className="p-2 border rounded w-1/2" />
      </div>
      <div className="flex gap-2">
        <button onClick={apply} className="flex-1 px-3 py-2 bg-purple-700 text-white rounded">Apply</button>
        <button onClick={() => { setBhk(""); setFurnished(""); setMinPrice(""); setMaxPrice(""); setQ(""); onChange({}); }} className="px-3 py-2 bg-gray-200 rounded">Clear</button>
      </div>
    </div>
  );
}
