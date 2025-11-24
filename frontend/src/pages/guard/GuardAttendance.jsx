// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState, useContext } from "react";
// import API from "../../api/api";
// import DashboardLayout from "../../components/DashboardLayout";
// import { AuthContext } from "../../contexts/AuthContext";
// import socket from "../../socket";

// export default function GuardAttendance() {
//   const { user, logout } = useContext(AuthContext);
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isPresent, setIsPresent] = useState(false);

//   const checkIn = async () => {
//     setLoading(true);
//     try {
//       await API.post("/attendance/check-in");
//       loadAttendance();
//     } catch (err) {
//       alert(err.response?.data?.msg);
//     }
//     setLoading(false);
//   };

//   const checkOut = async () => {
//     setLoading(true);
//     try {
//       await API.post("/attendance/check-out");
//       loadAttendance();
//     } catch (err) {
//       alert(err.response?.data?.msg);
//     }
//     setLoading(false);
//   };

//   const loadAttendance = async () => {
//     if (!API.defaults.headers.common["Authorization"]) return;

//     try {
//       const res = await API.get("/attendance/my");
//       setRecords(res.data || []);

//       // detect active record
//       const activeRecord = res.data.find((r) => !r.checkOut);
//       setIsPresent(!!activeRecord);
//     } catch (err) {
//       console.log("Attendance fetch error:", err);
//     }
//   };

//   // Apply token & load data once
//   useEffect(() => {
//     if (user?.token) {
//       API.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
//       loadAttendance();
//     }
//   }, [user]);

//   // 🔥 REAL-TIME AUTO REFRESH EVERY 5 SECONDS
//   useEffect(() => {
//   socket.on("attendanceUpdate", () => {
//     loadAttendance(); // 🔥 Auto refresh
//   });

//   return () => socket.off("attendanceUpdate");
// }, []);

//   return (
//     <DashboardLayout role="guard" onLogout={logout}>
//       <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         <h1 className="text-3xl font-bold mb-8 text-purple-900">
//           My Attendance
//         </h1>

//         <div className="flex gap-4 mb-6">
//           {!isPresent ? (
//             <button
//               onClick={checkIn}
//               className="px-5 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
//             >
//               Check In
//             </button>
//           ) : (
//             <button
//               onClick={checkOut}
//               className="px-5 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
//             >
//               Check Out
//             </button>
//           )}
//         </div>

//         <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-6">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-purple-100 text-purple-900 font-semibold">
//                 <th className="p-3 text-left">Check In</th>
//                 <th className="p-3 text-left">Check Out</th>
//               </tr>
//             </thead>

//             <tbody>
//               {records.map((r) => (
//                 <tr
//                   key={r._id}
//                   className="border-b border-gray-200 hover:bg-purple-50/50 transition"
//                 >
//                   <td className="p-3">{new Date(r.checkIn).toLocaleString()}</td>
//                   <td className="p-3">
//                     {r.checkOut ? new Date(r.checkOut).toLocaleString() : "—"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </DashboardLayout>
//   );
// }


/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import DashboardLayout from "../../components/DashboardLayout";
import { AuthContext } from "../../contexts/AuthContext";
import socket from "../../socket";

export default function GuardAttendance() {
  const { user, logout } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPresent, setIsPresent] = useState(false);

  const checkIn = async () => {
    setLoading(true);
    try {
      await API.post("/attendance/check-in");
      loadAttendance();
    } catch (err) {
      alert(err.response?.data?.msg);
    }
    setLoading(false);
  };

  const checkOut = async () => {
    setLoading(true);
    try {
      await API.post("/attendance/check-out");
      loadAttendance();
    } catch (err) {
      alert(err.response?.data?.msg);
    }
    setLoading(false);
  };

  const loadAttendance = async () => {
    if (!API.defaults.headers.common["Authorization"]) return;

    try {
      const res = await API.get("/attendance/my");
      setRecords(res.data || []);

      const activeRecord = res.data.find((r) => !r.checkOut);
      setIsPresent(!!activeRecord);
    } catch (err) {
      console.log("Attendance fetch error:", err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      loadAttendance();
    }
  }, [user]);

  useEffect(() => {
    socket.on("attendanceUpdate", () => {
      loadAttendance();
    });

    return () => socket.off("attendanceUpdate");
  }, []);

  return (
    <DashboardLayout role="guard" onLogout={logout}>
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-purple-900">
          My Attendance
        </h1>

        {/* Check in / out button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
          {!isPresent ? (
            <button
              onClick={checkIn}
              className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
            >
              Check In
            </button>
          ) : (
            <button
              onClick={checkOut}
              className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
            >
              Check Out
            </button>
          )}
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-4 sm:p-6">

          <table className="w-full min-w-[350px] border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-purple-100 text-purple-900 font-semibold">
                <th className="p-2 sm:p-3 text-left">Check In</th>
                <th className="p-2 sm:p-3 text-left">Check Out</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr
                  key={r._id}
                  className="border-b border-gray-200 hover:bg-purple-50/50 transition"
                >
                  <td className="p-2 sm:p-3">{new Date(r.checkIn).toLocaleString()}</td>
                  <td className="p-2 sm:p-3">
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
