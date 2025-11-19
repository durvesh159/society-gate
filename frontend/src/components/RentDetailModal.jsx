/* eslint-disable no-unused-vars */
// src/components/RentDetailModal.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

export default function RentDetailModal({ rentId, onClose, onUpdated }) {
  const { user } = useContext(AuthContext);
  const [rent, setRent] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get(`/rent/${rentId}`);
        setRent(res.data.rent);
      } catch (err) { console.error(err); }
    };
    fetch();
  }, [rentId]);

  if (!rent) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/80 border border-purple-200 rounded-2xl w-full max-w-3xl p-6 overflow-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-700">✖</button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="w-full h-64 bg-gray-200 rounded overflow-hidden">
              {rent.images && rent.images.length ? (
                <img src={rent.images[0]} className="w-full h-full object-cover" alt={rent.title} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
              )}
            </div>
            {/* simple thumbnails */}
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {(rent.images || []).map((img, idx) => (
                <img key={idx} src={img} className="w-20 h-14 object-cover rounded" alt={`thumb-${idx}`} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-900">{rent.title}</h2>
            <p className="text-gray-700 mt-2">{rent.description}</p>

            <div className="mt-4 space-y-2 text-gray-700">
              <div><strong>Price:</strong> ₹{rent.price}/month</div>
              {rent.deposit && <div><strong>Deposit:</strong> ₹{rent.deposit}</div>}
              <div><strong>BHK:</strong> {rent.bhk}</div>
              <div><strong>Area:</strong> {rent.area ? `${rent.area} sqft` : "—"}</div>
              <div><strong>Furnishing:</strong> {rent.furnished}</div>
              <div><strong>Available from:</strong> {rent.availableFrom ? new Date(rent.availableFrom).toLocaleDateString() : "Immediate"}</div>
              <div><strong>Owner:</strong> {rent.ownerName} • {rent.ownerMobile}</div>
            </div>

            <div className="mt-6 flex gap-2">
              <a href={`tel:${rent.ownerMobile}`} className="px-4 py-2 bg-green-600 text-white rounded">Contact Owner</a>
              <button onClick={() => { alert("Interest sent! (placeholder)") }} className="px-4 py-2 bg-purple-700 text-white rounded">I'm Interested</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
