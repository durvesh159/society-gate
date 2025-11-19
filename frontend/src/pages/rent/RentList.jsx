// src/pages/rent/RentList.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import DashboardLayout from "../../components/DashboardLayout";
import { AuthContext } from "../../contexts/AuthContext";
import RentCard from "../../components/RentCard";
import RentFilters from "../../components/RentFilters";
import AddRentModal from "../../components/AddRentModal";
import socket from "../../socket";

export default function RentList() {
  const { user, logout } = useContext(AuthContext);
  const [rents, setRents] = useState([]);
  const [filters, setFilters] = useState({});
  const [showAdd, setShowAdd] = useState(false);

  const fetch = async () => {
    try {
      const q = new URLSearchParams(filters).toString();
      const res = await API.get(`/rent/all?${q}`);
      setRents(res.data.rents || []);
    } catch (err) {
      console.error("fetch rents", err);
    }
  };

  useEffect(() => {
    fetch();
    socket.on("rentCreated", fetch);
    socket.on("rentUpdated", fetch);
    socket.on("rentDeleted", fetch);
    return () => {
      socket.off("rentCreated");
      socket.off("rentUpdated");
      socket.off("rentDeleted");
    };
  }, [filters]);

  return (
    <DashboardLayout role={user?.role} onLogout={logout}>
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-purple-900">Rent Listings</h1>
          {(user?.role === "admin" || user?.role === "resident") && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md"
              >
                + Post Flat
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <RentFilters onChange={(f) => setFilters(f)} />
          </div>

          <div className="lg:col-span-3 space-y-4">
            {/* Featured stripe */}
            {rents.filter(r => r.featured).length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl text-yellow-800 font-semibold">
                ⭐ Featured properties appear first
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rents.map(r => (
                <RentCard key={r._id} rent={r} onUpdated={fetch} />
              ))}
              {rents.length === 0 && (
                <div className="text-gray-600 p-6 bg-white/70 rounded-xl">No listings found</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAdd && <AddRentModal onClose={() => { setShowAdd(false); fetch(); }} />}
    </DashboardLayout>
  );
}
