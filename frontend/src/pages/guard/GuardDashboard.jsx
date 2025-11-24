// // src/pages/guard/GuardDashboard.jsx
// import React, { useState, useContext, useEffect } from "react";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";
// import { FiLock, FiUser, FiMail, FiPhone, FiKey, FiHome } from "react-icons/fi";

// export default function GuardDashboard() {
//   const { logout } = useContext(AuthContext);

//   const [profile, setProfile] = useState(null);
//   const [verifyInput, setVerifyInput] = useState("");

//   // =========================
//   // FETCH GUARD PROFILE
//   // =========================
//   const fetchProfile = async () => {
//     try {
//       const res = await API.get("/auth/me");
//       setProfile(res.data);
//     } catch (err) {
//       console.error("Profile fetch error", err);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // =========================
//   // VERIFY PASSCODE
//   // =========================
//   const verifyPasscode = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/guard/verify-passcode", {
//         passcode: verifyInput,
//       });
//       alert(`Passcode valid. Visitor: ${res.data.visitor.name}`);
//       setVerifyInput("");
//     } catch {
//       alert("Invalid or expired passcode.");
//     }
//   };

//   return (
//     <DashboardLayout role="guard" onLogout={logout}>
//       <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         {/* TITLE */}
//         <h1 className="text-3xl font-extrabold mb-8 text-purple-900 tracking-wide drop-shadow-sm">
//           Guard Dashboard
//         </h1>

//         {/* ==========================
//             GUARD PROFILE
//         =========================== */}
//         <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 mb-8 border border-purple-200 hover:shadow-2xl transition-all">
//           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-900">
//             <FiUser className="text-purple-700" />
//             Guard Profile
//           </h2>

//           {profile ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex items-center gap-2">
//                 <FiUser className="text-purple-700" />
//                 <p><b>Name:</b> {profile.name}</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FiMail className="text-purple-700" />
//                 <p><b>Email:</b> {profile.email}</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FiPhone className="text-purple-700" />
//                 <p><b>Mobile:</b> {profile.mobile}</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FiKey className="text-purple-700" />
//                 <p><b>Guard ID:</b> {profile.uniqueId}</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FiHome className="text-purple-700" />
//                 <p><b>Address:</b> {profile.address || "Not set"}</p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-700">Loading profile...</p>
//           )}
//         </div>

//         {/* ==========================
//             VERIFY PASSCODE
//         =========================== */}
//         <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-2xl transition-all">
//           <div className="flex items-center gap-2 mb-4 text-purple-900">
//             <FiLock className="text-purple-700 text-xl" />
//             <h2 className="text-lg font-semibold">Verify Visitor Passcode</h2>
//           </div>

//           <form onSubmit={verifyPasscode} className="flex flex-col sm:flex-row gap-3">
//             <input
//               value={verifyInput}
//               onChange={(e) => setVerifyInput(e.target.value)}
//               placeholder="Enter visitor passcode"
//               className="p-3 border rounded-md flex-1 focus:ring-2 focus:ring-purple-700"
//               required
//             />
//             <button className="px-5 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-all">
//               Verify
//             </button>
//           </form>
//         </div>

//       </div>
//     </DashboardLayout>
//   );
// }


// src/pages/guard/GuardDashboard.jsx
import React, { useState, useContext, useEffect } from "react";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import { FiLock, FiUser, FiMail, FiPhone, FiKey, FiHome } from "react-icons/fi";

export default function GuardDashboard() {
  const { logout } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [verifyInput, setVerifyInput] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setProfile(res.data);
    } catch (err) {
      console.error("Profile fetch error", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const verifyPasscode = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/guard/verify-passcode", {
        passcode: verifyInput,
      });
      alert(`Passcode valid. Visitor: ${res.data.visitor.name}`);
      setVerifyInput("");
    } catch {
      alert("Invalid or expired passcode.");
    }
  };

  return (
    <DashboardLayout role="guard" onLogout={logout}>
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 text-purple-900 tracking-wide drop-shadow-sm">
          Guard Dashboard
        </h1>

        {/* ==========================
            GUARD PROFILE
        =========================== */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-purple-200 hover:shadow-2xl transition-all">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-purple-900">
            <FiUser className="text-purple-700" />
            Guard Profile
          </h2>

          {profile ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <FiUser className="text-purple-700" />
                <p><b>Name:</b> {profile.name}</p>
              </div>

              <div className="flex items-center gap-2 text-sm sm:text-base">
                <FiMail className="text-purple-700" />
                <p><b>Email:</b> {profile.email}</p>
              </div>

              <div className="flex items-center gap-2 text-sm sm:text-base">
                <FiPhone className="text-purple-700" />
                <p><b>Mobile:</b> {profile.mobile}</p>
              </div>

              <div className="flex items-center gap-2 text-sm sm:text-base">
                <FiKey className="text-purple-700" />
                <p><b>Guard ID:</b> {profile.uniqueId}</p>
              </div>

              <div className="flex items-center gap-2 text-sm sm:text-base sm:col-span-2 lg:col-span-1">
                <FiHome className="text-purple-700" />
                <p><b>Address:</b> {profile.address || "Not set"}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-sm sm:text-base">Loading profile...</p>
          )}
        </div>

        {/* ==========================
            VERIFY PASSCODE
        =========================== */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-4 sm:p-6 border border-purple-200 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 text-purple-900">
            <FiLock className="text-purple-700 text-lg sm:text-xl" />
            <h2 className="text-base sm:text-lg font-semibold">Verify Visitor Passcode</h2>
          </div>

          <form
            onSubmit={verifyPasscode}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
              placeholder="Enter visitor passcode"
              className="p-3 border rounded-md flex-1 text-sm sm:text-base focus:ring-2 focus:ring-purple-700"
              required
            />

            <button className="px-4 sm:px-5 py-2 bg-purple-700 text-white rounded-md text-sm sm:text-base hover:bg-purple-800 transition-all">
              Verify
            </button>
          </form>
        </div>

      </div>
    </DashboardLayout>
  );
}
