// src/pages/admin/AdminDashboard.jsx

import React, { useEffect, useState, useContext } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../api/api";
import { io } from "socket.io-client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);

  const [visitorCount, setVisitorCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [activeStaff, setActiveStaff] = useState(0);

  const [visitorTrend, setVisitorTrend] = useState([]);
  const [staffStatus, setStaffStatus] = useState([]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL || "https://society-gate.onrender.com");

    socket.on("visitorUpdate", loadData);
    socket.on("staffUpdate", loadData);

    return () => socket.disconnect();
  }, []);

  const loadData = async () => {
  try {
    const visitors = await API.get("/admin/visitors");
    const guards = await API.get("/admin/guards"); // fetch only guards

    setVisitorCount(visitors.data.length);
    setStaffCount(guards.data.length);

    // Active Guards Inside
    const activeGuards = guards.data.filter((g) => g.isPresent).length;
    setActiveStaff(activeGuards);

    // GROUP VISITORS BY DATE FOR BAR CHART
    const grouped = {};
    visitors.data.forEach((v) => {
      const day = new Date(v.entryTime).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      grouped[day] = (grouped[day] || 0) + 1;
    });

    setVisitorTrend(
      Object.entries(grouped).map(([day, count]) => ({ day, count }))
    );

    // PIE CHART DATA ONLY FOR GUARDS
    setStaffStatus([
      { name: "Inside", value: activeGuards },
      { name: "Outside", value: guards.data.length - activeGuards },
    ]);
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    loadData();
  }, []);

  const COLORS = ["#6D28D9", "#A78BFA"];

  return (
    <DashboardLayout role="admin" onLogout={logout}>
      <div className="p-8 min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* TITLE */}
        {/* <h1 className="text-4xl font-extrabold text-purple-900 mb-10 tracking-wide drop-shadow-sm">
          Admin Dashboard
        </h1> */}

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">

          {/* CARD 1 */}
          <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-2xl transition-all">
            <h3 className="text-lg font-semibold text-gray-700">Total Visitors</h3>
            <p className="text-5xl font-extrabold text-purple-700 mt-3">
              {visitorCount}
            </p>
          </div>

          {/* CARD 2 */}
          <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-2xl transition-all">
            <h3 className="text-lg font-semibold text-gray-700">Total Staff</h3>
            <p className="text-5xl font-extrabold text-purple-700 mt-3">
              {staffCount}
            </p>
          </div>

          {/* CARD 3 */}
          <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-2xl transition-all">
            <h3 className="text-lg font-semibold text-gray-700">Active Staff Inside</h3>
            <p className="text-5xl font-extrabold text-purple-700 mt-3">
              {activeStaff}
            </p>
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* VISITOR TREND BAR CHART */}
          <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold mb-4 text-purple-900">
              Visitors Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitorTrend}>
                <XAxis dataKey="day" stroke="#6D28D9" />
                <YAxis stroke="#6D28D9" />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* STAFF STATUS PIE CHART */}
          <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold mb-4 text-purple-900">
              Staff Presence Status
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={staffStatus}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  label
                >
                  {staffStatus.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
