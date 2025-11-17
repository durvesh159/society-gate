// import React, { useState, useEffect, useContext } from "react";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function StaffDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const [staffInfo, setStaffInfo] = useState(null);

//   // ✅ Fetch logged-in staff details
//   const fetchStaffInfo = async () => {
//     try {
//       const res = await API.get(`/staff/profile/${user.id}`);
//       setStaffInfo(res.data);
//     } catch (err) {
//       console.error("Error fetching staff profile:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStaffInfo();
//   }, []);

//   if (!staffInfo)
//     return (
//       <div className="p-6 text-center">
//         <p>Loading staff details...</p>
//       </div>
//     );

//   return (
//     <DashboardLayout>
//       <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-xl font-bold">Staff Dashboard</h1>
//         <button onClick={logout} className="text-sm text-red-500">
//           Logout
//         </button>
//       </div>

//       {/* Profile Card */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="font-semibold mb-3">My Profile</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <p><strong>Name:</strong> {staffInfo.name}</p>
//           <p><strong>Role:</strong> {staffInfo.role}</p>
//           <p><strong>Email:</strong> {staffInfo.email}</p>
//           <p><strong>Mobile:</strong> {staffInfo.mobile}</p>
//           <p><strong>Address:</strong> {staffInfo.address || "N/A"}</p>
//         </div>
//       </div>

//       {/* Attendance Logs */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-3">Attendance Details</h2>
//         <p>
//           <strong>Status:</strong>{" "}
//           <span className={staffInfo.isPresent ? "text-green-600" : "text-gray-500"}>
//             {staffInfo.isPresent ? "Inside Premises" : "Outside"}
//           </span>
//         </p>
//         <p><strong>Last Entry:</strong> {staffInfo.entryTime ? new Date(staffInfo.entryTime).toLocaleString() : "--"}</p>
//         <p><strong>Last Exit:</strong> {staffInfo.exitTime ? new Date(staffInfo.exitTime).toLocaleString() : "--"}</p>
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// }



// // frontend/src/pages/staff/StaffDashboard.jsx
// import React, { useState, useEffect, useContext } from "react";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";
// import { FiUser, FiClock } from "react-icons/fi";

// export default function StaffDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const [staffInfo, setStaffInfo] = useState(null);

//   // ✅ Fetch logged-in staff details
//   const fetchStaffInfo = async () => {
//     try {
//       const res = await API.get(`/staff/profile/${user.id}`);
//       setStaffInfo(res.data);
//     } catch (err) {
//       console.error("Error fetching staff profile:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStaffInfo();
//   }, []);

//   if (!staffInfo)
//     return (
//       <DashboardLayout role="staff" onLogout={logout}>
//         <div className="p-6 text-center text-gray-700">
//           <p>Loading staff details...</p>
//         </div>
//       </DashboardLayout>
//     );

//   return (
//     <DashboardLayout role="staff" onLogout={logout}>
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 p-8 text-gray-800">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-blue-900 tracking-wide">
//             Staff Dashboard
//           </h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md shadow-md transition-all"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Profile Card */}
//         <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiUser className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">
//               My Profile
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//             <p>
//               <strong>Name:</strong> {staffInfo.name}
//             </p>
//             <p>
//               <strong>Role:</strong> {staffInfo.role}
//             </p>
//             <p>
//               <strong>Email:</strong> {staffInfo.email}
//             </p>
//             <p>
//               <strong>Mobile:</strong> {staffInfo.mobile}
//             </p>
//             <p>
//               <strong>Address:</strong> {staffInfo.address || "N/A"}
//             </p>
//           </div>
//         </div>

//         {/* Attendance Logs */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiClock className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">
//               Attendance Details
//             </h2>
//           </div>
//           <div className="space-y-2 text-gray-700">
//             <p>
//               <strong>Status:</strong>{" "}
//               <span
//                 className={
//                   staffInfo.isPresent
//                     ? "text-green-600 font-medium"
//                     : "text-gray-500"
//                 }
//               >
//                 {staffInfo.isPresent ? "Inside Premises" : "Outside"}
//               </span>
//             </p>
//             <p>
//               <strong>Last Entry:</strong>{" "}
//               {staffInfo.entryTime
//                 ? new Date(staffInfo.entryTime).toLocaleString()
//                 : "--"}
//             </p>
//             <p>
//               <strong>Last Exit:</strong>{" "}
//               {staffInfo.exitTime
//                 ? new Date(staffInfo.exitTime).toLocaleString()
//                 : "--"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }



// frontend/src/pages/staff/StaffDashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import { FiUser, FiClock } from "react-icons/fi";

export default function StaffDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [staffInfo, setStaffInfo] = useState(null);

  // ✅ Fetch logged-in staff details
  const fetchStaffInfo = async () => {
    try {
      const res = await API.get(`/staff/profile/${user.id}`);
      setStaffInfo(res.data);
    } catch (err) {
      console.error("Error fetching staff profile:", err);
    }
  };

  useEffect(() => {
    fetchStaffInfo();
  }, []);

  if (!staffInfo)
    return (
      <DashboardLayout role="staff" onLogout={logout}>
        <div className="p-6 text-center text-gray-700">
          <p>Loading staff details...</p>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout role="staff" onLogout={logout}>
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-8 text-purple-900 tracking-wide drop-shadow-sm">
          Staff Dashboard
        </h1>

        {/* ==========================
            STAFF PROFILE
        =========================== */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 mb-8 border border-purple-200 hover:shadow-2xl transition-all">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-900">
            <FiUser className="text-purple-700" />
            My Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
            <div className="flex items-center gap-2">
              <FiUser className="text-purple-700" />
              <p><b>Name:</b> {staffInfo.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <p><b>Role:</b> {staffInfo.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <p><b>Email:</b> {staffInfo.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <p><b>Mobile:</b> {staffInfo.mobile}</p>
            </div>
            <div className="flex items-center gap-2">
              <p><b>Address:</b> {staffInfo.address || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* ==========================
            ATTENDANCE DETAILS
        =========================== */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiClock className="text-purple-700 text-xl" />
            <h2 className="text-lg font-semibold">Attendance Details</h2>
          </div>
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  staffInfo.isPresent
                    ? "text-green-600 font-medium"
                    : "text-gray-500"
                }
              >
                {staffInfo.isPresent ? "Inside Premises" : "Outside"}
              </span>
            </p>
            <p>
              <strong>Last Entry:</strong>{" "}
              {staffInfo.entryTime
                ? new Date(staffInfo.entryTime).toLocaleString()
                : "--"}
            </p>
            <p>
              <strong>Last Exit:</strong>{" "}
              {staffInfo.exitTime
                ? new Date(staffInfo.exitTime).toLocaleString()
                : "--"}
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
