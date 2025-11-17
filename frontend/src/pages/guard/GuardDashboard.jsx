// import React, { useEffect, useState, useContext } from 'react';
// //import { io } from 'socket.io-client';
// import API from '../../api/api';
// import { AuthContext } from '../../contexts/AuthContext';
// import socket from '../../socket';
// import DashboardLayout from "../../components/DashboardLayout";


// export default function GuardDashboard() {
//   const { logout } = useContext(AuthContext);
//   const [visitors, setVisitors] = useState([]);
//   const [flat, setFlat] = useState('');
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [purpose, setPurpose] = useState('');
//   const [verifyInput, setVerifyInput] = useState('');
//   //const socket = io('https://society-gate.onrender.com', { transports: ['websocket'] });

//   const fetchVisitors = async () => {
//     try {
//       const res = await API.get('/guard/visitors');
//       setVisitors(res.data);
//     } catch (err) {
//       console.error('fetchVisitors error', err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     socket.on('visitorUpdate', fetchVisitors);
//     return () => {
//         socket.off('visitorUpdate');
//     };

//   }, []);

//   const addVisitor = async (e) => {
//     e.preventDefault();
//     await API.post('/guard/add-visitor', { name, mobile, purpose, flatVisited: flat, preapproved: false });
//     setName('');
//     setMobile('');
//     setPurpose('');
//     setFlat('');
//     socket.emit('visitorUpdate');
//     fetchVisitors();
//   };

//   const allow = async (id) => {
//     await API.post('/guard/allow', { visitorId: id });
//     socket.emit('visitorUpdate');
//     fetchVisitors();
//   };

//   const checkout = async (id) => {
//     await API.post('/guard/checkout', { visitorId: id });
//     socket.emit('visitorUpdate');
//     fetchVisitors();
//   };

//   const verifyPasscode = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/guard/verify-passcode', { passcode: verifyInput });
//       alert(`Passcode valid. Visitor: ${res.data.name}`);
//       setVerifyInput('');
//       fetchVisitors();
//     } catch {
//       alert('Invalid or expired passcode.');
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-bold">Guard Dashboard</h1>
//         <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
//       </div>

//       {/* Verify passcode */}
//       <form onSubmit={verifyPasscode} className="mb-4 flex space-x-2">
//         <input
//           value={verifyInput}
//           onChange={(e) => setVerifyInput(e.target.value)}
//           placeholder="Enter visitor passcode"
//           className="p-2 border rounded flex-1"
//           required
//         />
//         <button className="bg-blue-600 text-white px-3 py-1 rounded">Verify</button>
//       </form>

//       {/* Add visitor form */}
//       <form onSubmit={addVisitor} className="mb-4 flex flex-wrap gap-2">
//         <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Visitor name" className="p-2 border rounded" required />
//         <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" className="p-2 border rounded" required />
//         <input value={flat} onChange={(e) => setFlat(e.target.value)} placeholder="Flat" className="p-2 border rounded" required />
//         <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className="p-2 border rounded" required />
//         <button className="bg-green-600 text-white px-3 py-1 rounded">Add Visitor</button>
//       </form>

//       {/* Visitor list */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-2">Visitors</h2>
//         {visitors.length === 0 ? (
//           <div className="text-sm text-gray-500">No visitors yet.</div>
//         ) : (
//           visitors.filter(v => v.status !== 'checkedout').map(v => (
//             <div key={v._id} className="border-b py-2 flex justify-between items-center">
//               <div>
//                 <div className="font-semibold">{v.name} — {v.flatVisited}</div>
//                 <div className="text-sm text-gray-600">{v.purpose} | Status: {v.status}</div>
//               </div>
//               <div className="space-x-2">
//                 <button onClick={() => allow(v._id)} className="px-2 py-1 bg-green-600 text-white rounded">Allow</button>
//                 <button onClick={() => checkout(v._id)} className="px-2 py-1 bg-gray-600 text-white rounded">Checkout</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// }





// import React, { useEffect, useState, useContext } from "react";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import socket from "../../socket";
// import DashboardLayout from "../../components/DashboardLayout";
// import { FiLock, FiUserPlus, FiUsers } from "react-icons/fi";

// export default function GuardDashboard() {
//   const { logout } = useContext(AuthContext);
//   const [visitors, setVisitors] = useState([]);
//   const [flat, setFlat] = useState("");
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [verifyInput, setVerifyInput] = useState("");

//   const fetchVisitors = async () => {
//     try {
//       const res = await API.get("/guard/visitors");
//       setVisitors(res.data);
//     } catch (err) {
//       console.error("fetchVisitors error", err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     socket.on("visitorUpdate", fetchVisitors);
//     return () => {
//       socket.off("visitorUpdate");
//     };
//   }, []);

//   const addVisitor = async (e) => {
//     e.preventDefault();
//     await API.post("/guard/add-visitor", {
//       name,
//       mobile,
//       purpose,
//       flatVisited: flat,
//       preapproved: false,
//     });
//     setName("");
//     setMobile("");
//     setPurpose("");
//     setFlat("");
//     socket.emit("visitorUpdate");
//     fetchVisitors();
//   };

//   const allow = async (id) => {
//     await API.post("/guard/allow", { visitorId: id });
//     socket.emit("visitorUpdate");
//     fetchVisitors();
//   };

//   const checkout = async (id) => {
//     await API.post("/guard/checkout", { visitorId: id });
//     socket.emit("visitorUpdate");
//     fetchVisitors();
//   };

//   const verifyPasscode = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/guard/verify-passcode", {
//         passcode: verifyInput,
//       });
//       alert(`Passcode valid. Visitor: ${res.data.name}`);
//       setVerifyInput("");
//       fetchVisitors();
//     } catch {
//       alert("Invalid or expired passcode.");
//     }
//   };

//   return (
//     <DashboardLayout role="guard" onLogout={logout}>
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 p-8 text-gray-800">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-blue-900 tracking-wide">
//             Guard Dashboard
//           </h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md shadow-md transition-all"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Verify Passcode Section */}
//         <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiLock className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">
//               Verify Visitor Passcode
//             </h2>
//           </div>
//           <form
//             onSubmit={verifyPasscode}
//             className="flex flex-col sm:flex-row gap-3"
//           >
//             <input
//               value={verifyInput}
//               onChange={(e) => setVerifyInput(e.target.value)}
//               placeholder="Enter visitor passcode"
//               className="p-3 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-700"
//               required
//             />
//             <button className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md transition-all">
//               Verify
//             </button>
//           </form>
//         </div>

//         {/* Add Visitor Form */}
//         <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiUserPlus className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">
//               Add New Visitor
//             </h2>
//           </div>
//           <form
//             onSubmit={addVisitor}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
//           >
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Visitor name"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
//               required
//             />
//             <input
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               placeholder="Mobile"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
//               required
//             />
//             <input
//               value={flat}
//               onChange={(e) => setFlat(e.target.value)}
//               placeholder="Flat visited"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
//               required
//             />
//             <input
//               value={purpose}
//               onChange={(e) => setPurpose(e.target.value)}
//               placeholder="Purpose"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
//               required
//             />
//           </form>

//           {/* Centered Button */}
//           <div className="flex justify-center mt-5">
//             <button
//               type="submit"
//               onClick={addVisitor}
//               className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-md transition-all"
//             >
//               Add Visitor
//             </button>
//           </div>
//         </div>

//         {/* Visitor List */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiUsers className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">
//               Current Visitors
//             </h2>
//           </div>

//           {visitors.length === 0 ? (
//             <div className="text-sm text-gray-500">No visitors yet.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-blue-50 text-blue-900 text-left">
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Flat</th>
//                     <th className="p-3">Purpose</th>
//                     <th className="p-3">Status</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {visitors
//                     .filter((v) => v.status !== "checkedout")
//                     .map((v) => (
//                       <tr
//                         key={v._id}
//                         className="border-b hover:bg-blue-50 transition-all"
//                       >
//                         <td className="p-3 font-semibold text-gray-800">
//                           {v.name}
//                         </td>
//                         <td className="p-3 text-gray-600">{v.flatVisited}</td>
//                         <td className="p-3 text-gray-600">{v.purpose}</td>
//                         <td className="p-3 capitalize">
//                           <span
//                             className={`px-2 py-1 rounded text-sm font-medium ${
//                               v.status === "allowed"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-yellow-100 text-yellow-700"
//                             }`}
//                           >
//                             {v.status}
//                           </span>
//                         </td>
//                         <td className="p-3 flex justify-center gap-2">
//                           <button
//                             onClick={() => allow(v._id)}
//                             className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-md text-sm shadow transition-all"
//                           >
//                             Allow
//                           </button>
//                           <button
//                             onClick={() => checkout(v._id)}
//                             className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm shadow transition-all"
//                           >
//                             Checkout
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }



// // src/pages/guard/GuardDashboard.jsx
// import React, { useState, useContext, useEffect } from "react";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// //import socket from "../../socket";
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
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 p-8 text-gray-800">

//         <h1 className="text-3xl font-semibold mb-8 text-blue-900 tracking-wide">
//           Guard Dashboard
//         </h1>

//         {/* ==========================
//             GUARD PROFILE
//         =========================== */}
//         <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border-t-4 border-blue-800">
//           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <FiUser className="text-blue-800" />
//             Guard Profile
//           </h2>

//           {profile ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex items-center gap-2">
//                 <FiUser className="text-blue-700" />
//                 <p><b>Name:</b> {profile.name}</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FiMail className="text-blue-700" />
//                 <p><b>Email:</b> {profile.email}</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FiPhone className="text-blue-700" />
//                 <p><b>Mobile:</b> {profile.mobile}</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FiKey className="text-blue-700" />
//                 <p><b>Guard ID:</b> {profile.uniqueId}</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FiHome className="text-blue-700" />
//                 <p><b>Address:</b> {profile.address || "Not set"}</p>
//               </div>
//             </div>
//           ) : (
//             <p>Loading profile...</p>
//           )}
//         </div>

//         {/* ==========================
//             VERIFY PASSCODE
//         =========================== */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiLock className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold">Verify Visitor Passcode</h2>
//           </div>

//           <form onSubmit={verifyPasscode} className="flex flex-col sm:flex-row gap-3">
//             <input
//               value={verifyInput}
//               onChange={(e) => setVerifyInput(e.target.value)}
//               placeholder="Enter visitor passcode"
//               className="p-3 border rounded-md flex-1 focus:ring-2 focus:ring-blue-700"
//               required
//             />
//             <button className="px-5 py-2 bg-blue-800 text-white rounded-md">
//               Verify
//             </button>
//           </form>
//         </div>

//       </div>
//     </DashboardLayout>
//   );
// }



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

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-purple-900 tracking-wide">
//             Guard Dashboard
//           </h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl shadow-md transition-all"
//           >
//             Logout
//           </button>
//         </div>

//         {/* ==========================
//             GUARD PROFILE
//         =========================== */}
//         <div className="bg-white/70 backdrop-blur-xl border border-purple-200 shadow-2xl rounded-2xl p-6 mb-8 border-t-4 border-purple-700">
//           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-900">
//             <FiUser className="text-purple-700" />
//             Guard Profile
//           </h2>

//           {profile ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
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
//             <p className="text-gray-600">Loading profile...</p>
//           )}
//         </div>

//         {/* ==========================
//             VERIFY PASSCODE
//         =========================== */}
//         <div className="bg-white/70 backdrop-blur-xl border border-purple-200 shadow-2xl rounded-2xl p-6 border-t-4 border-purple-700">
//           <div className="flex items-center gap-2 mb-4">
//             <FiLock className="text-purple-700 text-xl" />
//             <h2 className="text-lg font-semibold text-purple-900">Verify Visitor Passcode</h2>
//           </div>

//           <form onSubmit={verifyPasscode} className="flex flex-col sm:flex-row gap-3">
//             <input
//               value={verifyInput}
//               onChange={(e) => setVerifyInput(e.target.value)}
//               placeholder="Enter visitor passcode"
//               className="p-3 border rounded-xl flex-1 focus:ring-2 focus:ring-purple-700"
//               required
//             />
//             <button className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl shadow-md transition-all">
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

  // =========================
  // FETCH GUARD PROFILE
  // =========================
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

  // =========================
  // VERIFY PASSCODE
  // =========================
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
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-8 text-purple-900 tracking-wide drop-shadow-sm">
          Guard Dashboard
        </h1>

        {/* ==========================
            GUARD PROFILE
        =========================== */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 mb-8 border border-purple-200 hover:shadow-2xl transition-all">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-900">
            <FiUser className="text-purple-700" />
            Guard Profile
          </h2>

          {profile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FiUser className="text-purple-700" />
                <p><b>Name:</b> {profile.name}</p>
              </div>

              <div className="flex items-center gap-2">
                <FiMail className="text-purple-700" />
                <p><b>Email:</b> {profile.email}</p>
              </div>

              <div className="flex items-center gap-2">
                <FiPhone className="text-purple-700" />
                <p><b>Mobile:</b> {profile.mobile}</p>
              </div>

              <div className="flex items-center gap-2">
                <FiKey className="text-purple-700" />
                <p><b>Guard ID:</b> {profile.uniqueId}</p>
              </div>

              <div className="flex items-center gap-2">
                <FiHome className="text-purple-700" />
                <p><b>Address:</b> {profile.address || "Not set"}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">Loading profile...</p>
          )}
        </div>

        {/* ==========================
            VERIFY PASSCODE
        =========================== */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiLock className="text-purple-700 text-xl" />
            <h2 className="text-lg font-semibold">Verify Visitor Passcode</h2>
          </div>

          <form onSubmit={verifyPasscode} className="flex flex-col sm:flex-row gap-3">
            <input
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
              placeholder="Enter visitor passcode"
              className="p-3 border rounded-md flex-1 focus:ring-2 focus:ring-purple-700"
              required
            />
            <button className="px-5 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-all">
              Verify
            </button>
          </form>
        </div>

      </div>
    </DashboardLayout>
  );
}
