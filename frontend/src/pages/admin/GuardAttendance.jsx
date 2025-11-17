// import React, { useEffect, useState } from "react";
// import API from "../../api/api";

// export default function AdminGuardAttendance() {
//   const [data, setData] = useState([]);

//   const load = async () => {
//     const res = await API.get("/attendance/all");
//     setData(res.data || []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-5">Guard Attendance Records</h1>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-purple-200">
//             <th className="p-2">Guard Name</th>
//             <th className="p-2">Check In</th>
//             <th className="p-2">Check Out</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((r) => (
//             <tr key={r._id} className="border-b">
//               <td className="p-2">{r.guard?.name}</td>
//               <td className="p-2">{new Date(r.checkIn).toLocaleString()}</td>
//               <td className="p-2">
//                 {r.checkOut ? new Date(r.checkOut).toLocaleString() : "—"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// src/pages/admin/GuardAttendance.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import DashboardLayout from "../../components/DashboardLayout";
import { AuthContext } from "../../contexts/AuthContext";
import socket from "../../socket";

export default function AdminGuardAttendance() {
  const [data, setData] = useState([]);
  const { logout } = useContext(AuthContext);

  const load = async () => {
    const res = await API.get("/attendance/all");
    setData(res.data || []);
  };

  useEffect(() => {
  load();

  socket.on("attendanceUpdate", () => {
    load(); // 🔥 Refresh when any guard checks in/out
  });

  return () => socket.off("attendanceUpdate");
}, []);

  return (
    <DashboardLayout role="admin" onLogout={logout}>
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        <h1 className="text-3xl font-bold mb-8 text-purple-900">
          Guard Attendance Records
        </h1>

        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 shadow-xl p-6 rounded-2xl">

          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-purple-100 text-purple-900 font-semibold">
                <th className="p-3 text-left">Guard Name</th>
                <th className="p-3 text-left">Check In</th>
                <th className="p-3 text-left">Check Out</th>
              </tr>
            </thead>

            <tbody>
              {data.map((r) => (
                <tr
                  key={r._id}
                  className="border-b border-gray-200 hover:bg-purple-50/50 transition"
                >
                  <td className="p-3">{r.guard?.name}</td>
                  <td className="p-3">{new Date(r.checkIn).toLocaleString()}</td>
                  <td className="p-3">
                    {r.checkOut ? new Date(r.checkOut).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </DashboardLayout>
  );
}
