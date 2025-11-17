/* eslint-disable no-unused-vars */
// // frontend/src/pages/resident/ResidentDashboard.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import API from '../../api/api';
// import { AuthContext } from '../../contexts/AuthContext';
// // import { io } from 'socket.io-client';
// import socket from '../../socket';
// import DashboardLayout from "../../components/DashboardLayout";


// export default function ResidentDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [datetime, setDatetime] = useState('');
//   const [purpose, setPurpose] = useState('');
//   const [pending, setPending] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

// //   const socket = io('https://society-gate.onrender.com', { transports: ['websocket'] });

//   const fetchPending = async () => {
//     try {
//       const res = await API.get('/resident/pending');
//       setPending(res.data || []);
//     } catch (err) {
//       console.error('fetchPending', err);
//     }
//   };

//   const fetchHistory = async () => {
//     try {
//       const res = await API.get('/resident/visitors');
//       setHistory(res.data || []);
//     } catch (err) {
//       console.error('fetchHistory', err);
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//     fetchHistory();

//     // 🔔 Listen for visitor updates from socket
//     socket.on('visitorUpdate', () => {
//       fetchPending();
//       fetchHistory();
//     });

//     return () => {
//         socket.off('visitorUpdate');
//     };

//   }, []);

//   const preApprove = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await API.post('/resident/preapprove', {
//         name,
//         mobile,
//         email,
//         purpose,
//         scheduledTime: datetime || undefined,
//       });
//       setName('');
//       setMobile('');
//       setEmail('');
//       setPurpose('');
//       setDatetime('');
//       alert('Pre-approved successfully. Visitor will receive an email.');
//       fetchPending();
//       fetchHistory();

//       // Emit event to guards
//       socket.emit('visitorUpdate');
//     } catch (err) {
//       console.error('preApprove error', err);
//       alert(err.response?.data?.msg || 'Error pre-approving visitor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const decideVisitor = async (visitorId, decision) => {
//     try {
//       await API.post('/resident/approve', { visitorId, decision });
//       fetchPending();
//       fetchHistory();

//       socket.emit('visitorUpdate');
//     } catch (err) {
//       console.error('decideVisitor', err);
//       alert(err.response?.data?.msg || 'Error processing decision');
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-bold">Resident Dashboard</h1>
//         <div className="flex items-center space-x-4">
//           <span className="text-sm text-gray-600">Logged in: {user?.email}</span>
//           <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Pre-approve form */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="font-semibold mb-3">Pre-approve / Invite a Visitor</h2>
//           <form onSubmit={preApprove}>
//             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Visitor name" className="mb-2 p-2 border rounded w-full" required />
//             <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" className="mb-2 p-2 border rounded w-full" required />
//             <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Visitor email" className="mb-2 p-2 border rounded w-full" required />
//             <label className="text-sm text-gray-700">Date & Time (optional)</label>
//             <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} className="mb-2 p-2 border rounded w-full" />
//             <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className="mb-2 p-2 border rounded w-full" />
//             <button type="submit" disabled={loading} className="bg-blue-600 text-white px-3 py-1 rounded">
//               {loading ? 'Submitting...' : 'Pre-approve'}
//             </button>
//           </form>
//         </div>

//         {/* Pending approvals */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="font-semibold mb-3">Pending Visitors</h2>
//           {pending.length === 0 ? (
//             <div className="text-sm text-gray-500">No pending visitors.</div>
//           ) : (
//             pending.map((v) => (
//               <div key={v._id} className="border-b py-2 flex justify-between items-center">
//                 <div>
//                   <div className="font-semibold">{v.name}</div>
//                   <div className="text-sm text-gray-600">{v.purpose}</div>
//                   <div className="text-xs text-gray-500">Status: {v.status}</div>
//                 </div>
//                 <div className="space-x-2">
//                   <button onClick={() => decideVisitor(v._id, 'allow')} className="px-2 py-1 bg-green-600 text-white rounded">Allow</button>
//                   <button onClick={() => decideVisitor(v._id, 'reject')} className="px-2 py-1 bg-red-600 text-white rounded">Reject</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Visitor history */}
//       <div className="mt-6 bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-3">Visitor History</h2>
//         {history.length === 0 ? (
//           <div className="text-sm text-gray-500">No visitor history yet.</div>
//         ) : (
//           <table className="w-full text-left">
//             <thead>
//               <tr className="text-sm text-gray-600">
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Purpose</th>
//                 <th className="p-2">Status</th>
//                 <th className="p-2">Passcode</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((v) => (
//                 <tr key={v._id} className="border-t">
//                   <td className="p-2">{v.name}</td>
//                   <td className="p-2">{v.purpose}</td>
//                   <td className="p-2">{v.status}</td>
//                   <td className="p-2">{v.passcode || '--'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// }




// // src/pages/resident/ResidentDashboard.jsx
// import React, { useState, useEffect, useContext } from "react";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import socket from "../../socket";
// import DashboardLayout from "../../components/DashboardLayout";
// import { FiUserPlus, FiUsers, FiClock } from "react-icons/fi";

// export default function ResidentDashboard() {
//   // eslint-disable-next-line no-unused-vars
//   const { user, logout } = useContext(AuthContext);
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [datetime, setDatetime] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [pending, setPending] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchPending = async () => {
//     try {
//       const res = await API.get("/resident/pending");
//       setPending(res.data || []);
//     } catch (err) {
//       console.error("fetchPending", err);
//     }
//   };

//   const fetchHistory = async () => {
//     try {
//       const res = await API.get("/resident/visitors");
//       setHistory(res.data || []);
//     } catch (err) {
//       console.error("fetchHistory", err);
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//     fetchHistory();

//     socket.on("visitorUpdate", () => {
//       fetchPending();
//       fetchHistory();
//     });

//     return () => {
//       socket.off("visitorUpdate");
//     };
//   }, []);

//   const preApprove = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await API.post("/resident/preapprove", {
//         name,
//         mobile,
//         email,
//         purpose,
//         scheduledTime: datetime || undefined,
//       });
//       setName("");
//       setMobile("");
//       setEmail("");
//       setPurpose("");
//       setDatetime("");
//       alert("Pre-approved successfully. Visitor will receive an email.");
//       fetchPending();
//       fetchHistory();
//       socket.emit("visitorUpdate");
//     } catch (err) {
//       console.error("preApprove error", err);
//       alert(err.response?.data?.msg || "Error pre-approving visitor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const decideVisitor = async (visitorId, decision) => {
//     try {
//       await API.post("/resident/approve", { visitorId, decision });
//       fetchPending();
//       fetchHistory();
//       socket.emit("visitorUpdate");
//     } catch (err) {
//       console.error("decideVisitor", err);
//       alert(err.response?.data?.msg || "Error processing decision");
//     }
//   };

//   return (
//     <DashboardLayout role="resident" onLogout={logout}>
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 p-8 text-gray-800">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-blue-900 tracking-wide">
//             Resident Dashboard
//           </h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md shadow-md transition-all"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Pre-Approve Form */}
//         <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiUserPlus className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">
//               Pre-Approve / Invite a Visitor
//             </h2>
//           </div>

//           <form
//             onSubmit={preApprove}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
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
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Visitor email"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
//               required
//             />
//             <input
//               type="datetime-local"
//               value={datetime}
//               onChange={(e) => setDatetime(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
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
//               onClick={preApprove}
//               disabled={loading}
//               className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-md transition-all"
//             >
//               {loading ? "Submitting..." : "Pre-Approve"}
//             </button>
//           </div>
//         </div>

//         {/* Pending Visitors */}
//         <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiClock className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">
//               Pending Visitors
//             </h2>
//           </div>

//           {pending.length === 0 ? (
//             <div className="text-sm text-gray-500">No pending visitors.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-blue-50 text-blue-900 text-left">
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Purpose</th>
//                     <th className="p-3">Status</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pending.map((v) => (
//                     <tr
//                       key={v._id}
//                       className="border-b hover:bg-blue-50 transition-all"
//                     >
//                       <td className="p-3 font-semibold text-gray-800">
//                         {v.name}
//                       </td>
//                       <td className="p-3 text-gray-600">{v.purpose}</td>
//                       <td className="p-3 capitalize">
//                         <span
//                           className={`px-2 py-1 rounded text-sm font-medium ${
//                             v.status === "allowed"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {v.status}
//                         </span>
//                       </td>
//                       <td className="p-3 flex justify-center gap-2">
//                         <button
//                           onClick={() => decideVisitor(v._id, "allow")}
//                           className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md text-sm shadow transition-all"
//                         >
//                           Allow
//                         </button>
//                         <button
//                           onClick={() => decideVisitor(v._id, "reject")}
//                           className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md text-sm shadow transition-all"
//                         >
//                           Reject
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Visitor History */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiUsers className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">
//               Visitor History
//             </h2>
//           </div>

//           {history.length === 0 ? (
//             <div className="text-sm text-gray-500">No visitor history yet.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-blue-50 text-blue-900 text-left">
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Purpose</th>
//                     <th className="p-3">Status</th>
//                     <th className="p-3">Passcode</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {history.map((v) => (
//                     <tr
//                       key={v._id}
//                       className="border-b hover:bg-blue-50 transition-all"
//                     >
//                       <td className="p-3 font-semibold text-gray-800">
//                         {v.name}
//                       </td>
//                       <td className="p-3 text-gray-600">{v.purpose}</td>
//                       <td className="p-3 capitalize">
//                         <span
//                           className={`px-2 py-1 rounded text-sm font-medium ${
//                             v.status === "allowed"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {v.status}
//                         </span>
//                       </td>
//                       <td className="p-3 text-gray-700">
//                         {v.passcode || "--"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }



// // src/pages/resident/ResidentDashboard.jsx
// import React, { useState, useEffect, useContext } from "react";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import socket from "../../socket";
// import DashboardLayout from "../../components/DashboardLayout";
// import { FiUserPlus, FiClock } from "react-icons/fi";

// export default function ResidentDashboard() {
//   // eslint-disable-next-line no-unused-vars
//   const { user, logout } = useContext(AuthContext);
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [datetime, setDatetime] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [pending, setPending] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchPending = async () => {
//     try {
//       const res = await API.get("/resident/pending");
//       setPending(res.data || []);
//     } catch (err) {
//       console.error("fetchPending", err);
//     }
//   };

//   useEffect(() => {
//     fetchPending();

//     socket.on("visitorUpdate", () => {
//       fetchPending();
//     });

//     return () => socket.off("visitorUpdate");
//   }, []);

//   const preApprove = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await API.post("/resident/preapprove", {
//         name,
//         mobile,
//         email,
//         purpose,
//         scheduledTime: datetime || undefined,
//       });

//       setName("");
//       setMobile("");
//       setEmail("");
//       setPurpose("");
//       setDatetime("");

//       alert("Pre-approved successfully!");
//       fetchPending();
//       socket.emit("visitorUpdate");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const decideVisitor = async (visitorId, decision) => {
//     try {
//       await API.post("/resident/approve", { visitorId, decision });
//       fetchPending();
//       socket.emit("visitorUpdate");
//     // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       alert("Error updating visitor status");
//     }
//   };

//   return (
//     <DashboardLayout role="resident" onLogout={logout}>
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 p-8 text-gray-800">
        
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-blue-900">Resident Dashboard</h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Pre-Approve Form */}
//         <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiUserPlus className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold">Pre-Approve / Invite a Visitor</h2>
//           </div>

//           <form
//             onSubmit={preApprove}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
//           >
//             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Visitor name" className="p-3 border rounded-md" required />
//             <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" className="p-3 border rounded-md" required />
//             <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Visitor email" className="p-3 border rounded-md" required />
//             <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} className="p-3 border rounded-md" />
//             <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className="p-3 border rounded-md" required />
//           </form>

//           <div className="flex justify-center mt-5">
//             <button type="submit" onClick={preApprove} disabled={loading} className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md">
//               {loading ? "Submitting..." : "Pre-Approve"}
//             </button>
//           </div>
//         </div>

//         {/* Pending Visitors */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiClock className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold">Pending Visitors</h2>
//           </div>

//           {pending.length === 0 ? (
//             <div className="text-sm text-gray-500">No pending visitors.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-blue-50 text-blue-900">
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Purpose</th>
//                     <th className="p-3">Status</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pending.map((v) => (
//                     <tr key={v._id} className="border-b hover:bg-blue-50">
//                       <td className="p-3 font-semibold">{v.name}</td>
//                       <td className="p-3">{v.purpose}</td>
//                       <td className="p-3 capitalize">
//                         <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">{v.status}</span>
//                       </td>
//                       <td className="p-3 flex justify-center gap-2">
//                         <button onClick={() => decideVisitor(v._id, "allow")} className="bg-green-700 text-white px-3 py-1 rounded-md">Allow</button>
//                         <button onClick={() => decideVisitor(v._id, "reject")} className="bg-red-700 text-white px-3 py-1 rounded-md">Reject</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }



// src/pages/resident/ResidentDashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import socket from "../../socket";
import DashboardLayout from "../../components/DashboardLayout";
import { FiUserPlus, FiClock } from "react-icons/fi";

export default function ResidentDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [datetime, setDatetime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPending = async () => {
    try {
      const res = await API.get("/resident/pending");
      setPending(res.data || []);
    } catch (err) {
      console.error("fetchPending", err);
    }
  };

  useEffect(() => {
    fetchPending();

    socket.on("visitorUpdate", () => {
      fetchPending();
    });

    return () => socket.off("visitorUpdate");
  }, []);

  const preApprove = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/resident/preapprove", {
        name,
        mobile,
        email,
        purpose,
        scheduledTime: datetime || undefined,
      });

      setName("");
      setMobile("");
      setEmail("");
      setPurpose("");
      setDatetime("");

      alert("Pre-approved successfully!");
      fetchPending();
      socket.emit("visitorUpdate");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    } finally {
      setLoading(false);
    }
  };

  const decideVisitor = async (visitorId, decision) => {
    try {
      await API.post("/resident/approve", { visitorId, decision });
      fetchPending();
      socket.emit("visitorUpdate");
    } catch (err) {
      alert("Error updating visitor status");
    }
  };

  return (
    <DashboardLayout role="resident" onLogout={logout}>
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-900 tracking-wide drop-shadow-sm">
            Resident Dashboard
          </h1>
          {/* <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Logout
          </button> */}
        </div>

        {/* Pre-Approve Form */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 mb-8 border border-purple-200 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiUserPlus className="text-purple-700 text-xl" />
            <h2 className="text-lg font-semibold">Pre-Approve / Invite a Visitor</h2>
          </div>

          <form
            onSubmit={preApprove}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Visitor name"
              className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700"
              required
            />
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
              className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Visitor email"
              className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700"
              required
            />
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700"
            />
            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose"
              className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700"
              required
            />
          </form>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              onClick={preApprove}
              disabled={loading}
              className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md transition-all"
            >
              {loading ? "Submitting..." : "Pre-Approve"}
            </button>
          </div>
        </div>

        {/* Pending Visitors */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiClock className="text-purple-700 text-xl" />
            <h2 className="text-lg font-semibold">Pending Visitors</h2>
          </div>

          {pending.length === 0 ? (
            <div className="text-sm text-gray-700">No pending visitors.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100/60 text-purple-900">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Purpose</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((v) => (
                    <tr
                      key={v._id}
                      className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
                    >
                      <td className="p-3 font-semibold text-gray-800">{v.name}</td>
                      <td className="p-3">{v.purpose}</td>
                      <td className="p-3 capitalize">
                        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                          {v.status}
                        </span>
                      </td>
                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() => decideVisitor(v._id, "allow")}
                          className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md transition-all"
                        >
                          Allow
                        </button>
                        <button
                          onClick={() => decideVisitor(v._id, "reject")}
                          className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md transition-all"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
