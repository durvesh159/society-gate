// import React, { useState, useEffect, useContext } from "react";
// import { io } from "socket.io-client";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function AdminDashboard() {
//   const [visitors, setVisitors] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const { logout } = useContext(AuthContext);

//   // ✅ Socket for real-time updates
//   useEffect(() => {
//     const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");

//     socket.on("visitorUpdate", fetchVisitors);
//     socket.on("staffUpdate", fetchStaff);

//     return () => socket.disconnect();
//   }, []);

//   // ✅ Fetch visitors
//   const fetchVisitors = async () => {
//     try {
//       const res = await API.get("/admin/visitors");
//       setVisitors(res.data);
//     } catch (err) {
//       console.error("Error fetching visitors:", err);
//     }
//   };

//   // ✅ Fetch staff
//   const fetchStaff = async () => {
//     try {
//       const res = await API.get("/admin/staff/all");
//       setStaffList(res.data);
//     } catch (err) {
//       console.error("Error fetching staff list:", err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     fetchStaff();
//   }, []);

//   // ✅ Add Resident
//   const addResident = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const payload = {
//       name: form.name.value,
//       wing: form.wing.value,
//       flatNo: form.flatNo.value,
//       email: form.email.value,
//       password: form.password.value,
//       mobile: form.mobile.value,
//     };

//     try {
//       await API.post("/admin/resident", payload);
//       alert("Resident added successfully!");
//       form.reset();
//     } catch (error) {
//       console.error(error);
//       alert("Error adding resident");
//     }
//   };

//   // ✅ Add Guard
//   const addGuard = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const payload = {
//       name: form.name.value,
//       address: form.address.value,
//       email: form.email.value,
//       password: form.password.value,
//       mobile: form.mobile.value,
//     };

//     try {
//       await API.post("/admin/guard", payload);
//       alert("Guard added successfully!");
//       form.reset();
//     } catch (error) {
//       console.error(error);
//       alert("Error adding guard");
//     }
//   };

//   // ✅ Add Staff (Cook, Maid, Gardener, etc.)
//   const addStaff = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const payload = {
//       name: form.name.value,
//       role: form.role.value,
//       address: form.address.value,
//       email: form.email.value,
//       password: form.password.value,
//       mobile: form.mobile.value,
//     };

//     try {
//       await API.post("/admin/staff", payload);
//       alert("Staff member added successfully!");
//       form.reset();
//       fetchStaff();
//     } catch (error) {
//       console.error(error);
//       alert("Error adding staff");
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-xl font-bold">Admin Dashboard</h1>
//         <button onClick={logout} className="text-sm text-red-500">
//           Logout
//         </button>
//       </div>

//       {/* Forms Section */}
//       <div className="grid grid-cols-3 gap-6">
//         {/* Add Resident */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">Add Resident</h2>
//           <form onSubmit={addResident}>
//             <input name="name" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
//             <input name="wing" placeholder="Wing" className="w-full mb-2 p-2 border rounded" />
//             <input name="flatNo" placeholder="Flat No" className="w-full mb-2 p-2 border rounded" />
//             <input name="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
//             <input name="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" />
//             <input name="mobile" placeholder="Mobile" className="w-full mb-2 p-2 border rounded" />
//             <button className="bg-blue-600 text-white px-3 py-1 rounded w-full">Add</button>
//           </form>
//         </div>

//         {/* Add Guard */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">Add Guard</h2>
//           <form onSubmit={addGuard}>
//             <input name="name" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
//             <input name="address" placeholder="Address" className="w-full mb-2 p-2 border rounded" />
//             <input name="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
//             <input name="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" />
//             <input name="mobile" placeholder="Mobile" className="w-full mb-2 p-2 border rounded" />
//             <button className="bg-blue-600 text-white px-3 py-1 rounded w-full">Add</button>
//           </form>
//         </div>

//         {/* Add Staff */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">Add Staff</h2>
//           <form onSubmit={addStaff}>
//             <input name="name" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
//             <select name="role" className="w-full mb-2 p-2 border rounded">
//               <option value="">Select Role</option>
//               <option value="cook">Cook</option>
//               <option value="maid">Maid</option>
//               <option value="gardener">Gardener</option>
//               <option value="driver">Driver</option>
//             </select>
//             <input name="address" placeholder="Address" className="w-full mb-2 p-2 border rounded" />
//             <input name="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
//             <input name="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" />
//             <input name="mobile" placeholder="Mobile" className="w-full mb-2 p-2 border rounded" />
//             <button className="bg-blue-600 text-white px-3 py-1 rounded w-full">Add</button>
//           </form>
//         </div>
//       </div>

//       {/* Staff Table */}
//       <div className="mt-6 bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-2">All Staff Members</h2>
//         <div className="overflow-auto max-h-[400px]">
//           <table className="w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th>Name</th>
//                 <th>Role</th>
//                 <th>Email</th>
//                 <th>Mobile</th>
//                 <th>Status</th>
//                 <th>Entry Time</th>
//                 <th>Exit Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {staffList.length > 0 ? (
//                 staffList.map((s) => (
//                   <tr key={s._id} className="border-t text-center">
//                     <td>{s.name}</td>
//                     <td>{s.role}</td>
//                     <td>{s.email}</td>
//                     <td>{s.mobile}</td>
//                     <td className={s.isPresent ? "text-green-600" : "text-gray-500"}>
//                       {s.isPresent ? "Inside" : "Outside"}
//                     </td>
//                     <td>{s.entryTime ? new Date(s.entryTime).toLocaleString() : "--"}</td>
//                     <td>{s.exitTime ? new Date(s.exitTime).toLocaleString() : "--"}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center py-4">
//                     No staff data available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Visitor Logs */}
//       <div className="mt-6 bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-2">Visitor Logs (Live)</h2>
//         <div className="overflow-auto max-h-[400px]">
//           <table className="w-full text-sm">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Flat</th>
//                 <th>Purpose</th>
//                 <th>Entry</th>
//                 <th>Exit</th>
//                 <th>Guard</th>
//               </tr>
//             </thead>
//             <tbody>
//               {visitors.length > 0 ? (
//                 visitors.map((v) => (
//                   <tr key={v._id} className="border-t">
//                     <td>{v.name}</td>
//                     <td>{v.flatVisited}</td>
//                     <td>{v.purpose}</td>
//                     <td>{v.entryTime ? new Date(v.entryTime).toLocaleString() : "--"}</td>
//                     <td>{v.exitTime ? new Date(v.exitTime).toLocaleString() : "--"}</td>
//                     <td>{v.guard?.name || "--"}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-4">
//                     No visitors yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// }



//With UI, no components
// import React, { useState, useEffect, useContext } from "react";
// import { io } from "socket.io-client";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";
// import { FiUserPlus, FiUsers } from "react-icons/fi";

// export default function AdminDashboard() {
//   const [visitors, setVisitors] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const { logout } = useContext(AuthContext);

//   useEffect(() => {
//     const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");
//     socket.on("visitorUpdate", fetchVisitors);
//     socket.on("staffUpdate", fetchStaff);
//     return () => socket.disconnect();
//   }, []);

//   const fetchVisitors = async () => {
//     try {
//       const res = await API.get("/admin/visitors");
//       setVisitors(res.data);
//     } catch (err) {
//       console.error("Error fetching visitors:", err);
//     }
//   };

//   const fetchStaff = async () => {
//     try {
//       const res = await API.get("/admin/staff/all");
//       setStaffList(res.data);
//     } catch (err) {
//       console.error("Error fetching staff list:", err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     fetchStaff();
//   }, []);

//   const addResident = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const payload = {
//       name: form.name.value,
//       wing: form.wing.value,
//       flatNo: form.flatNo.value,
//       email: form.email.value,
//       password: form.password.value,
//       mobile: form.mobile.value,
//     };

//     try {
//       await API.post("/admin/resident", payload);
//       alert("Resident added successfully!");
//       form.reset();
//     } catch (error) {
//       console.error(error);
//       alert("Error adding resident");
//     }
//   };

//   const addGuard = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const payload = {
//       name: form.name.value,
//       address: form.address.value,
//       email: form.email.value,
//       password: form.password.value,
//       mobile: form.mobile.value,
//     };

//     try {
//       await API.post("/admin/guard", payload);
//       alert("Guard added successfully!");
//       form.reset();
//     } catch (error) {
//       console.error(error);
//       alert("Error adding guard");
//     }
//   };

//   const addStaff = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const payload = {
//       name: form.name.value,
//       role: form.role.value,
//       address: form.address.value,
//       email: form.email.value,
//       password: form.password.value,
//       mobile: form.mobile.value,
//     };

//     try {
//       await API.post("/admin/staff", payload);
//       alert("Staff member added successfully!");
//       form.reset();
//       fetchStaff();
//     } catch (error) {
//       console.error(error);
//       alert("Error adding staff");
//     }
//   };

//   return (
//     <DashboardLayout role="admin" onLogout={logout}>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8 text-gray-800">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-blue-900 tracking-wide">
//             Admin Dashboard
//           </h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md shadow-md transition-all"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Add Entities Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
//           {/* Add Resident */}
//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//             <div className="flex items-center gap-2 mb-4">
//               <FiUserPlus className="text-blue-800 text-xl" />
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Add Resident
//               </h2>
//             </div>
//             <form onSubmit={addResident} className="grid gap-3">
//               <input name="name" placeholder="Name" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="wing" placeholder="Wing" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="flatNo" placeholder="Flat No" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="email" placeholder="Email" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="password" placeholder="Password" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="mobile" placeholder="Mobile" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <div className="flex justify-center">
//                 <button type="submit" className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-md transition-all">
//                   Add Resident
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Add Guard */}
//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//             <div className="flex items-center gap-2 mb-4">
//               <FiUserPlus className="text-blue-800 text-xl" />
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Add Guard
//               </h2>
//             </div>
//             <form onSubmit={addGuard} className="grid gap-3">
//               <input name="name" placeholder="Name" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="address" placeholder="Address" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="email" placeholder="Email" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="password" placeholder="Password" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="mobile" placeholder="Mobile" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <div className="flex justify-center">
//                 <button type="submit" className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-md transition-all">
//                   Add Guard
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Add Staff */}
//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//             <div className="flex items-center gap-2 mb-4">
//               <FiUserPlus className="text-blue-800 text-xl" />
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Add Staff Member
//               </h2>
//             </div>
//             <form onSubmit={addStaff} className="grid gap-3">
//               <input name="name" placeholder="Name" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <select name="role" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required>
//                 <option value="">Select Role</option>
//                 <option value="cook">Cook</option>
//                 <option value="maid">Maid</option>
//                 <option value="gardener">Gardener</option>
//                 <option value="driver">Driver</option>
//               </select>
//               <input name="address" placeholder="Address" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="email" placeholder="Email" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="password" placeholder="Password" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input name="mobile" placeholder="Mobile" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <div className="flex justify-center">
//                 <button type="submit" className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-md transition-all">
//                   Add Staff
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Staff Table */}
//         <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiUsers className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">All Staff Members</h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-blue-50 text-blue-900 text-left">
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Role</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Mobile</th>
//                   <th className="p-3">Status</th>
//                   <th className="p-3">Entry Time</th>
//                   <th className="p-3">Exit Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {staffList.length > 0 ? (
//                   staffList.map((s) => (
//                     <tr key={s._id} className="border-b hover:bg-blue-50 transition-all">
//                       <td className="p-3 font-semibold text-gray-800">{s.name}</td>
//                       <td className="p-3 text-gray-600 capitalize">{s.role}</td>
//                       <td className="p-3 text-gray-600">{s.email}</td>
//                       <td className="p-3 text-gray-600">{s.mobile}</td>
//                       <td className={`p-3 font-medium ${s.isPresent ? "text-green-700" : "text-gray-500"}`}>
//                         {s.isPresent ? "Inside" : "Outside"}
//                       </td>
//                       <td className="p-3 text-gray-600">{s.entryTime ? new Date(s.entryTime).toLocaleString() : "--"}</td>
//                       <td className="p-3 text-gray-600">{s.exitTime ? new Date(s.exitTime).toLocaleString() : "--"}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center py-4 text-gray-500">No staff data available.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Visitor Logs */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiUsers className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">Visitor Logs (Live)</h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-blue-50 text-blue-900 text-left">
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Flat</th>
//                   <th className="p-3">Purpose</th>
//                   <th className="p-3">Entry</th>
//                   <th className="p-3">Exit</th>
//                   <th className="p-3">Guard</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {visitors.length > 0 ? (
//                   visitors.map((v) => (
//                     <tr key={v._id} className="border-b hover:bg-blue-50 transition-all">
//                       <td className="p-3 font-semibold text-gray-800">{v.name}</td>
//                       <td className="p-3 text-gray-600">{v.flatVisited}</td>
//                       <td className="p-3 text-gray-600">{v.purpose}</td>
//                       <td className="p-3 text-gray-600">{v.entryTime ? new Date(v.entryTime).toLocaleString() : "--"}</td>
//                       <td className="p-3 text-gray-600">{v.exitTime ? new Date(v.exitTime).toLocaleString() : "--"}</td>
//                       <td className="p-3 text-gray-600">{v.guard?.name || "--"}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="text-center py-4 text-gray-500">No visitors yet.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }



// // src/pages/admin/AdminDashboard.jsx

// import React, { useEffect, useState, useContext } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
// import { AuthContext } from "../../contexts/AuthContext";
// import API from "../../api/api";
// import { io } from "socket.io-client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// export default function AdminDashboard() {
//   const { logout } = useContext(AuthContext);

//   const [visitorCount, setVisitorCount] = useState(0);
//   const [staffCount, setStaffCount] = useState(0);
//   const [activeStaff, setActiveStaff] = useState(0);

//   const [visitorTrend, setVisitorTrend] = useState([]);
//   const [staffStatus, setStaffStatus] = useState([]);

//   useEffect(() => {
//     const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");

//     socket.on("visitorUpdate", loadData);
//     socket.on("staffUpdate", loadData);

//     return () => socket.disconnect();
//   }, []);

//   const loadData = async () => {
//     try {
//       const visitors = await API.get("/admin/visitors");
//       const staff = await API.get("/admin/staff/all");

//       setVisitorCount(visitors.data.length);
//       setStaffCount(staff.data.length);

//       const present = staff.data.filter((s) => s.isPresent).length;
//       setActiveStaff(present);

//       // Prepare visitor trend chart (dummy grouping by days)
//       const grouped = {};
//       visitors.data.forEach((v) => {
//         const day = new Date(v.entryTime).toLocaleDateString("en-US", {
//           day: "numeric",
//           month: "short",
//         });
//         grouped[day] = (grouped[day] || 0) + 1;
//       });

//       setVisitorTrend(
//         Object.entries(grouped).map(([day, count]) => ({ day, count }))
//       );

//       // Staff Pie Chart
//       setStaffStatus([
//         { name: "Inside", value: present },
//         { name: "Outside", value: staff.data.length - present },
//       ]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const COLORS = ["#2563eb", "#93c5fd"];

//   return (
//     <DashboardLayout role="admin" onLogout={logout}>
//       <div className="p-8 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen text-gray-800">

//         {/* Title */}
//         <h1 className="text-3xl font-bold text-blue-900 mb-8">
//           Admin Analytics Dashboard
//         </h1>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-700">
//             <h3 className="text-lg">Total Visitors Today</h3>
//             <p className="text-4xl font-bold text-blue-700 mt-2">{visitorCount}</p>
//           </div>

//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-700">
//             <h3 className="text-lg">Total Staff</h3>
//             <p className="text-4xl font-bold text-blue-700 mt-2">{staffCount}</p>
//           </div>

//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-700">
//             <h3 className="text-lg">Active Staff Inside</h3>
//             <p className="text-4xl font-bold text-blue-700 mt-2">{activeStaff}</p>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//           {/* Bar Chart */}
//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-700">
//             <h2 className="text-xl font-semibold mb-4">Visitors Trend</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={visitorTrend}>
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="count" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Pie Chart */}
//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-700">
//             <h2 className="text-xl font-semibold mb-4">Staff Presence Status</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={staffStatus}
//                   dataKey="value"
//                   nameKey="name"
//                   label
//                 >
//                   {staffStatus.map((entry, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }



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
    const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");

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
        <h1 className="text-4xl font-extrabold text-purple-900 mb-10 tracking-wide drop-shadow-sm">
          Admin Dashboard
        </h1>

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
