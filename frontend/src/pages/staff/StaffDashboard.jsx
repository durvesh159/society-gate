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
//       <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         {/* TITLE */}
//         <h1 className="text-3xl font-extrabold mb-8 text-purple-900 tracking-wide drop-shadow-sm">
//           Staff Dashboard
//         </h1>

//         {/* ==========================
//             STAFF PROFILE
//         =========================== */}
//         <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 mb-8 border border-purple-200 hover:shadow-2xl transition-all">
//           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-900">
//             <FiUser className="text-purple-700" />
//             My Profile
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
//             <div className="flex items-center gap-2">
//               <FiUser className="text-purple-700" />
//               <p><b>Name:</b> {staffInfo.name}</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <p><b>Role:</b> {staffInfo.role}</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <p><b>Email:</b> {staffInfo.email}</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <p><b>Mobile:</b> {staffInfo.mobile}</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <p><b>Address:</b> {staffInfo.address || "N/A"}</p>
//             </div>
//           </div>
//         </div>

//         {/* ==========================
//             ATTENDANCE DETAILS
//         =========================== */}
//         <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-2xl transition-all">
//           <div className="flex items-center gap-2 mb-4 text-purple-900">
//             <FiClock className="text-purple-700 text-xl" />
//             <h2 className="text-lg font-semibold">Attendance Details</h2>
//           </div>
//           <div className="space-y-2 text-gray-800">
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
import { FiUser, FiClock, FiHome, FiPhone, FiMail, FiUserPlus } from "react-icons/fi";


export default function StaffDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [staffInfo, setStaffInfo] = useState(null);

  // Fetch logged-in staff details
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
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* TITLE */}
        {/* <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-purple-900 tracking-wide drop-shadow-sm">
          Staff Dashboard
        </h1> */}

        {/* ==========================
            STAFF PROFILE CARD
        =========================== */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-purple-200 hover:shadow-2xl transition-all">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-purple-900">
            <FiUser className="text-purple-700" />
            My Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-800 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <FiUser className="text-purple-700" />
              <p><b>Name:</b> {staffInfo.name}</p>
            </div>

            <div className="flex items-center gap-2">
              <FiUserPlus className="text-purple-700" />
              <p><b>Role:</b> {staffInfo.role}</p>
            </div>

            <div className="flex items-center gap-2">
              <FiMail className="text-purple-700" />
              <p><b>Email:</b> {staffInfo.email}</p>
            </div>

            <div className="flex items-center gap-2">
              <FiPhone className="text-purple-700" />
              <p><b>Mobile:</b> {staffInfo.mobile}</p>
            </div>

            <div className="flex items-center gap-2 sm:col-span-2">
              <FiHome className="text-purple-700" />
              <p><b>Address:</b> {staffInfo.address || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* ==========================
            ATTENDANCE DETAILS
        =========================== */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-4 sm:p-6 border border-purple-200 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiClock className="text-purple-700 text-lg sm:text-xl" />
            <h2 className="text-md sm:text-lg font-semibold">Attendance Details</h2>
          </div>

          <div className="space-y-2 text-gray-800 text-sm sm:text-base">
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
