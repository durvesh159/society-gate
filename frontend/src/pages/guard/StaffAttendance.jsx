import React, { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import DashboardLayout from "../../components/DashboardLayout";
import { AuthContext } from "../../contexts/AuthContext";

export default function GuardStaffAttendance() {
  const { logout } = useContext(AuthContext);
  const [staffList, setStaffList] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchStaff = async () => {
    const res = await API.get("/staff/all");
    setStaffList(res.data);
  };

  const fetchHistory = async () => {
    const res = await API.get("/staff/attendance");
    setHistory(res.data);
  };

  const markEntry = async (id) => {
    await API.post("/staff/entry", { staffId: id });
    fetchHistory();
  };

  const markExit = async (id) => {
    await API.post("/staff/exit", { staffId: id });
    fetchHistory();
  };

  useEffect(() => {
    fetchStaff();
    fetchHistory();
  }, []);

  return (
    <DashboardLayout role="guard" onLogout={logout}>
      <div className="p-8 min-h-screen bg-gray-100">

        <h1 className="text-3xl font-bold text-purple-900 mb-6">Staff Attendance</h1>

        {/* Staff List (Mark Entry/Exit) */}
        <div className="bg-white p-6 rounded-xl shadow mb-8 border border-purple-200">
          <h2 className="text-xl font-semibold mb-3">Mark Attendance</h2>

          <table className="w-full table-auto">
            <thead className="bg-purple-200 text-purple-900">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Role</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id} className="border-b text-center">
                  <td className="p-2">{staff.name}</td>
                  <td className="p-2">{staff.role}</td>
                  <td className="p-2">
                    {staff.isPresent ? (
                      <span className="text-green-600 font-semibold">Inside</span>
                    ) : (
                      <span className="text-gray-600">Outside</span>
                    )}
                  </td>
                  <td className="p-2">
                    {staff.isPresent ? (
                      <button
                        onClick={() => markExit(staff._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg"
                      >
                        Mark Exit
                      </button>
                    ) : (
                      <button
                        onClick={() => markEntry(staff._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg"
                      >
                        Mark Entry
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attendance History Table */}
        <div className="bg-white p-6 rounded-xl shadow border border-purple-200">
          <h2 className="text-xl font-semibold mb-3">Attendance History</h2>

          <table className="w-full table-auto">
            <thead className="bg-purple-200 text-purple-900">
              <tr>
                <th className="p-2">Staff</th>
                <th className="p-2">Date</th>
                <th className="p-2">Entry</th>
                <th className="p-2">Exit</th>
              </tr>
            </thead>

            <tbody>
              {history.map((rec) => (
                <tr key={rec._id} className="border-b text-center">
                  <td className="p-2">{rec.staff?.name}</td>
                  <td className="p-2">{new Date(rec.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">
                    {rec.entryTime ? new Date(rec.entryTime).toLocaleTimeString() : "--"}
                  </td>
                  <td className="p-2">
                    {rec.exitTime ? new Date(rec.exitTime).toLocaleTimeString() : "--"}
                  </td>
                </tr>
              ))}

              {history.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-gray-500">
                    No history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
}
