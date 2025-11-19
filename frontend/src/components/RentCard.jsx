// src/components/RentCard.jsx
import React, { useState, useContext } from "react";
import API from "../api/api";
import RentDetailModal from "./RentDetailModal";
import { AuthContext } from "../contexts/AuthContext";

export default function RentCard({ rent, onUpdated }) {
  const { user } = useContext(AuthContext);
  const [showDetail, setShowDetail] = useState(false);

  const markRented = async () => {
    try {
      await API.post(`/rent/${rent._id}/mark-rented`);
      onUpdated();
    } catch (err) { console.error(err); }
  };

  const toggleFeatured = async () => {
    try {
      await API.post(`/rent/${rent._id}/featured`);
      onUpdated();
    } catch (err) { console.error(err); }
  };

  return (
    <>
      <div className="bg-white/80 border border-purple-100 rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <img src={rent.images?.[0] || "/placeholder.png"} className="w-full h-40 object-cover rounded-xl" alt={rent.title} />
          {rent.featured && <div className="absolute top-3 left-3 bg-yellow-100 text-yellow-800 px-2 py-1 rounded">★ Featured</div>}
          {rent.isRented && <div className="absolute top-3 right-3 bg-gray-800 text-white px-2 py-1 rounded">Rented</div>}
        </div>

        <div className="mt-3">
          <h4 className="font-semibold text-gray-800">{rent.title}</h4>
          <p className="text-sm text-gray-600">{rent.bhk}BHK • {rent.area ? `${rent.area} sqft` : ""} • {rent.furnished}</p>
          <div className="flex items-center justify-between mt-3">
            <div>
              <div className="text-lg font-bold text-purple-900">₹{rent.price}/mo</div>
              {rent.deposit && <div className="text-sm text-gray-600">Deposit: ₹{rent.deposit}</div>}
            </div>

            <div className="flex flex-col gap-2">
              <button className="px-3 py-1 bg-purple-700 text-white rounded" onClick={() => setShowDetail(true)}>View</button>

              {(user?.role === "admin" || String(user?.id) === String(rent.owner)) && (
                <>
                  {!rent.isRented && (
                    <button onClick={markRented} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Mark as Rented</button>
                  )}
                  {user?.role === "admin" && (
                    <button onClick={toggleFeatured} className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded text-sm">{rent.featured ? "Unfeature" : "Feature"}</button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDetail && <RentDetailModal rentId={rent._id} onClose={() => setShowDetail(false)} onUpdated={onUpdated} />}
    </>
  );
}
