/* eslint-disable no-unused-vars */
// // src/pages/admin/Staff.jsx
// import React, { useState, useEffect, useContext } from "react";
// import { FiUserPlus, FiUsers } from "react-icons/fi";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function StaffPage() {
//   const { logout } = useContext(AuthContext);

//   const [staffList, setStaffList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // form
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobile, setMobile] = useState("");

//   const fetchStaff = async () => {
//     try {
//       const res = await API.get("/admin/staff/all");
//       setStaffList(res.data || []);
//     } catch (err) {
//       console.error("fetchStaff", err);
//     }
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const addStaff = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload = { name, role, address, email, password, mobile };
//       await API.post("/admin/staff", payload);
//       // reset
//       setName("");
//       setRole("");
//       setAddress("");
//       setEmail("");
//       setPassword("");
//       setMobile("");
//       await fetchStaff();
//       alert("Staff member added successfully!");
//     } catch (err) {
//       console.error("addStaff", err);
//       alert(err.response?.data?.msg || "Error adding staff");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout role="admin" onLogout={logout}>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8 text-gray-800">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-blue-900 tracking-wide">Staff</h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md shadow-md transition-all"
//           >
//             Logout
//           </button>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-2">
//           {/* Add Staff */}
//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//             <div className="flex items-center gap-2 mb-4">
//               <FiUserPlus className="text-blue-800 text-xl" />
//               <h2 className="text-lg font-semibold text-gray-800">Add Staff Member</h2>
//             </div>

//             <form onSubmit={addStaff} className="grid gap-3">
//               <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <select value={role} onChange={(e)=>setRole(e.target.value)} className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required>
//                 <option value="">Select Role</option>
//                 <option value="cook">Cook</option>
//                 <option value="maid">Maid</option>
//                 <option value="gardener">Gardener</option>
//                 <option value="driver">Driver</option>
//               </select>
//               <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />
//               <input value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Mobile" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700" required />

//               <div className="flex justify-center mt-2">
//                 <button disabled={loading} type="submit" className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-md transition-all">
//                   {loading ? "Adding..." : "Add Staff"}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Staff List */}
//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//             <div className="flex items-center gap-2 mb-4">
//               <FiUsers className="text-blue-800 text-xl" />
//               <h2 className="text-lg font-semibold text-gray-800">All Staff Members</h2>
//             </div>

//             {staffList.length === 0 ? (
//               <div className="text-sm text-gray-500">No staff data available.</div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-blue-50 text-blue-900 text-left">
//                       <th className="p-3">Name</th>
//                       <th className="p-3">Role</th>
//                       <th className="p-3">Email</th>
//                       <th className="p-3">Mobile</th>
//                       <th className="p-3">Status</th>
//                       <th className="p-3">Entry</th>
//                       <th className="p-3">Exit</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {staffList.map((s) => (
//                       <tr key={s._id} className="border-b hover:bg-blue-50 transition-all">
//                         <td className="p-3 font-semibold text-gray-800">{s.name}</td>
//                         <td className="p-3 text-gray-600 capitalize">{s.role}</td>
//                         <td className="p-3 text-gray-600">{s.email}</td>
//                         <td className="p-3 text-gray-600">{s.mobile}</td>
//                         <td className={`p-3 font-medium ${s.isPresent ? "text-green-700" : "text-gray-500"}`}>
//                           {s.isPresent ? "Inside" : "Outside"}
//                         </td>
//                         <td className="p-3 text-gray-600">{s.entryTime ? new Date(s.entryTime).toLocaleString() : "--"}</td>
//                         <td className="p-3 text-gray-600">{s.exitTime ? new Date(s.exitTime).toLocaleString() : "--"}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }



// // src/pages/admin/Staff.jsx
// import React, { useState, useEffect, useContext } from "react";
// import { FiUserPlus, FiUsers, FiInfo, FiTrash2 } from "react-icons/fi";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function StaffPage() {
//   const { logout, user } = useContext(AuthContext);

//   const [staffList, setStaffList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Modals
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // Selected Staff for modals
//   const [selectedStaff, setSelectedStaff] = useState(null);

//   // Form State
//   const [form, setForm] = useState({
//     name: "",
//     role: "",
//     address: "",
//     email: "",
//     password: "",
//     mobile: "",
//   });

//   const handleFormChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // Fetch Staff
//   const fetchStaff = async () => {
//     try {
//       const res = await API.get("/admin/staff/all");
//       setStaffList(res.data || []);
//     } catch (err) {
//       console.error("fetchStaff", err);
//     }
//   };

//   useEffect(() => {
//     if (user?.token) fetchStaff();
//   }, [user]);

//   // Add Staff
//   const addStaff = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await API.post("/admin/staff", form);
//       setForm({
//         name: "",
//         role: "",
//         address: "",
//         email: "",
//         password: "",
//         mobile: "",
//       });

//       setShowAddModal(false);
//       fetchStaff();
//       alert("Staff member added successfully!");
//     } catch (err) {
//       console.error("addStaff", err);
//       alert(err.response?.data?.msg || "Error adding staff");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // DELETE STAFF 🗑️
//   const deleteStaff = async () => {
//     try {
//       await API.delete(`/admin/staff/${selectedStaff._id}`);
//       setShowDeleteModal(false);
//       fetchStaff();
//       alert("Staff deleted successfully!");
//     } catch (err) {
//       console.error("deleteStaff", err);
//       alert("Failed to delete staff");
//     }
//   };

//   return (
//     <DashboardLayout role="admin" onLogout={logout}>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8 text-gray-800">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-blue-900 tracking-wide">
//             Staff Management
//           </h1>

//           <button
//             onClick={() => setShowAddModal(true)}
//             className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md transition-all"
//           >
//             <FiUserPlus /> Add Staff
//           </button>
//         </div>

//         {/* Staff List */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//             <FiUsers /> Staff List
//           </h2>

//           {staffList.length === 0 ? (
//             <div className="text-sm text-gray-500">No staff available.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-blue-50 text-blue-900 text-left">
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Role</th>
//                     <th className="p-3">Email</th>
//                     <th className="p-3">Mobile</th>
//                     <th className="p-3">Status</th>
//                     <th className="p-3">Entry</th>
//                     <th className="p-3">Exit</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {staffList.map((s) => (
//                     <tr
//                       key={s._id}
//                       className="border-b hover:bg-blue-50 transition-all"
//                     >
//                       <td className="p-3 font-semibold text-gray-800">{s.name}</td>
//                       <td className="p-3 capitalize text-gray-700">{s.role}</td>
//                       <td className="p-3 text-gray-600">{s.email}</td>
//                       <td className="p-3 text-gray-600">{s.mobile}</td>

//                       <td
//                         className={`p-3 font-medium ${
//                           s.isPresent ? "text-green-700" : "text-gray-500"
//                         }`}
//                       >
//                         {s.isPresent ? "Inside" : "Outside"}
//                       </td>

//                       <td className="p-3 text-gray-600">
//                         {s.entryTime ? new Date(s.entryTime).toLocaleString() : "--"}
//                       </td>

//                       <td className="p-3 text-gray-600">
//                         {s.exitTime ? new Date(s.exitTime).toLocaleString() : "--"}
//                       </td>

//                       <td className="p-3 flex justify-center gap-4">
//                         {/* View */}
//                         <button
//                           className="text-blue-700 hover:text-blue-900"
//                           onClick={() => {
//                             setSelectedStaff(s);
//                             setShowViewModal(true);
//                           }}
//                         >
//                           <FiInfo size={20} />
//                         </button>

//                         {/* Delete */}
//                         <button
//                           className="text-red-600 hover:text-red-800"
//                           onClick={() => {
//                             setSelectedStaff(s);
//                             setShowDeleteModal(true);
//                           }}
//                         >
//                           <FiTrash2 size={20} />
//                         </button>

//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ADD STAFF MODAL */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
//             <h2 className="text-xl font-bold text-blue-900 mb-4">
//               Add New Staff
//             </h2>

//             <form className="grid gap-3" onSubmit={addStaff}>
//               {["name", "role", "address", "email", "password", "mobile"].map(
//                 (field) => (
//                   <input
//                     key={field}
//                     name={field}
//                     value={form[field]}
//                     onChange={handleFormChange}
//                     placeholder={
//                       field.charAt(0).toUpperCase() + field.slice(1)
//                     }
//                     type={field === "password" ? "password" : "text"}
//                     className="p-3 border rounded-md focus:ring-2 focus:ring-blue-700"
//                     required
//                   />
//                 )
//               )}

//               <div className="flex justify-end gap-3 mt-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md"
//                 >
//                   {loading ? "Adding..." : "Add Staff"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* VIEW STAFF MODAL */}
//       {showViewModal && selectedStaff && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
//             <h2 className="text-xl font-bold text-blue-900 mb-4">
//               Staff Details
//             </h2>

//             <div className="space-y-2">
//               <p><strong>Name:</strong> {selectedStaff.name}</p>
//               <p><strong>Role:</strong> {selectedStaff.role}</p>
//               <p><strong>Email:</strong> {selectedStaff.email}</p>
//               <p><strong>Mobile:</strong> {selectedStaff.mobile}</p>
//               <p><strong>Address:</strong> {selectedStaff.address}</p>
//               <p><strong>Status:</strong> {selectedStaff.isPresent ? "Inside" : "Outside"}</p>
//             </div>

//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DELETE STAFF MODAL */}
//       {showDeleteModal && selectedStaff && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
//             <h2 className="text-xl font-bold text-red-700 mb-4">
//               Delete Staff?
//             </h2>

//             <p className="text-gray-700 mb-6">
//               Are you sure you want to remove <strong>{selectedStaff.name}</strong> from the system? This action cannot be undone.
//             </p>

//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={deleteStaff}
//                 className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </DashboardLayout>
//   );
// }


// // src/pages/admin/Staff.jsx
// import React, { useState, useEffect, useContext, useMemo } from "react";
// import {
//   FiUserPlus,
//   FiUsers,
//   FiInfo,
//   FiTrash2,
//   FiSearch,
//   FiX,
// } from "react-icons/fi";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// /**
//  * Modern / refreshed Staff management UI
//  * - Keep all original endpoints and behaviour
//  * - Adds search + client-side sort by name / role
//  * - Enhanced modals and badges
//  */

// export default function StaffPage() {
//   const { logout, user } = useContext(AuthContext);

//   const [staffList, setStaffList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Modals
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // Selected Staff for modals
//   const [selectedStaff, setSelectedStaff] = useState(null);

//   // Form State
//   const [form, setForm] = useState({
//     name: "",
//     role: "",
//     address: "",
//     email: "",
//     password: "",
//     mobile: "",
//   });

//   // Search & sort
//   const [query, setQuery] = useState("");
//   const [sortBy, setSortBy] = useState({ field: "name", dir: "asc" });

//   const handleFormChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // Fetch Staff
//   const fetchStaff = async () => {
//     try {
//       const res = await API.get("/admin/staff/all");
//       setStaffList(res.data || []);
//     } catch (err) {
//       console.error("fetchStaff", err);
//     }
//   };

//   useEffect(() => {
//     if (user?.token) fetchStaff();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   // Add Staff
//   const addStaff = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await API.post("/admin/staff", form);
//       setForm({
//         name: "",
//         role: "",
//         address: "",
//         email: "",
//         password: "",
//         mobile: "",
//       });

//       setShowAddModal(false);
//       await fetchStaff();
//       // nicer feedback
//       toastSuccess("Staff member added successfully!");
//     } catch (err) {
//       console.error("addStaff", err);
//       alert(err.response?.data?.msg || "Error adding staff");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // DELETE STAFF 🗑️
//   const deleteStaff = async () => {
//     if (!selectedStaff) return;
//     try {
//       await API.delete(`/admin/staff/${selectedStaff._id}`);
//       setShowDeleteModal(false);
//       await fetchStaff();
//       toastSuccess("Staff deleted successfully!");
//     } catch (err) {
//       console.error("deleteStaff", err);
//       alert("Failed to delete staff");
//     }
//   };

//   // small toast helper (simple)
//   const toastSuccess = (msg) => {
//     try {
//       // if you have any toast lib remove fallback
//       const el = document.createElement("div");
//       el.textContent = msg;
//       el.className =
//         "fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slideIn";
//       document.body.appendChild(el);
//       setTimeout(() => el.remove(), 2600);
//     // eslint-disable-next-line no-unused-vars
//     } catch (e) {
//       console.log(msg);
//     }
//   };

//   // derived filtered + sorted data
//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     let list = staffList.slice();

//     if (q) {
//       list = list.filter(
//         (s) =>
//           (s.name || "").toLowerCase().includes(q) ||
//           (s.role || "").toLowerCase().includes(q) ||
//           (s.email || "").toLowerCase().includes(q) ||
//           (s.mobile || "").includes(q)
//       );
//     }

//     list.sort((a, b) => {
//       const A = (a[sortBy.field] || "").toString().toLowerCase();
//       const B = (b[sortBy.field] || "").toString().toLowerCase();
//       if (A < B) return sortBy.dir === "asc" ? -1 : 1;
//       if (A > B) return sortBy.dir === "asc" ? 1 : -1;
//       return 0;
//     });

//     return list;
//   }, [staffList, query, sortBy]);

//   const toggleSort = (field) => {
//     setSortBy((s) => {
//       if (s.field === field) {
//         return { field, dir: s.dir === "asc" ? "desc" : "asc" };
//       }
//       return { field, dir: "asc" };
//     });
//   };

//   return (
//     <DashboardLayout role="admin" onLogout={logout}>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-8 text-slate-900">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-extrabold tracking-tight text-indigo-700">
//               Staff Management
//             </h1>
//             <p className="text-sm text-slate-500 mt-1">
//               Manage staff accounts, attendance and contact details.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search name, role, email or mobile..."
//                 className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm w-72"
//               />
//               <FiSearch className="absolute left-3 top-2.5 text-slate-400" />
//               {query && (
//                 <button
//                   onClick={() => setQuery("")}
//                   className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-600"
//                 >
//                   <FiX />
//                 </button>
//               )}
//             </div>

//             <button
//               onClick={() => setShowAddModal(true)}
//               className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-emerald-500 hover:scale-[1.02] transition-transform text-white px-4 py-2 rounded-xl shadow-lg"
//             >
//               <FiUserPlus /> Add Staff
//             </button>
//           </div>
//         </div>

//         {/* Content grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Left: summary / quick stats */}
//           <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-md border border-slate-100">
//             <h3 className="text-sm font-semibold text-slate-600 mb-4">
//               Overview
//             </h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-slate-500">Total Staff</p>
//                   <p className="text-2xl font-bold text-indigo-700">
//                     {staffList.length}
//                   </p>
//                 </div>
//                 <div className="bg-indigo-50 rounded-full w-12 h-12 flex items-center justify-center">
//                   <FiUsers className="text-indigo-600" />
//                 </div>
//               </div>

//               <div>
//                 <p className="text-xs text-slate-500">Present</p>
//                 <p className="text-lg font-semibold text-emerald-600">
//                   {staffList.filter((s) => s.isPresent).length}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs text-slate-500">Outside</p>
//                 <p className="text-lg font-semibold text-slate-500">
//                   {staffList.filter((s) => !s.isPresent).length}
//                 </p>
//               </div>

//               <div className="mt-3">
//                 <button
//                   onClick={fetchStaff}
//                   className="w-full px-3 py-2 bg-slate-100 rounded-lg text-sm hover:bg-slate-200"
//                 >
//                   Refresh
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right: table */}
//           <div className="lg:col-span-3 bg-white rounded-2xl p-4 shadow-md border border-slate-100">
//             <div className="flex items-center justify-between px-2 mb-3">
//               <h3 className="text-base font-semibold text-slate-700">All Staff</h3>

//               <div className="flex items-center gap-3 text-sm text-slate-500">
//                 <button
//                   onClick={() => toggleSort("name")}
//                   className={`px-2 py-1 rounded-md ${
//                     sortBy.field === "name" ? "bg-indigo-50 text-indigo-700" : "hover:bg-slate-50"
//                   }`}
//                 >
//                   Sort: Name {sortBy.field === "name" ? (sortBy.dir === "asc" ? "↑" : "↓") : ""}
//                 </button>

//                 <button
//                   onClick={() => toggleSort("role")}
//                   className={`px-2 py-1 rounded-md ${
//                     sortBy.field === "role" ? "bg-indigo-50 text-indigo-700" : "hover:bg-slate-50"
//                   }`}
//                 >
//                   Sort: Role {sortBy.field === "role" ? (sortBy.dir === "asc" ? "↑" : "↓") : ""}
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full text-left">
//                 <thead>
//                   <tr className="text-slate-600 text-sm">
//                     <th className="px-4 py-3">Name</th>
//                     <th className="px-4 py-3">Role</th>
//                     <th className="px-4 py-3">Email</th>
//                     <th className="px-4 py-3">Mobile</th>
//                     <th className="px-4 py-3">Status</th>
//                     <th className="px-4 py-3">Entry</th>
//                     <th className="px-4 py-3">Exit</th>
//                     <th className="px-4 py-3 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filtered.length === 0 && (
//                     <tr>
//                       <td colSpan={8} className="px-4 py-6 text-center text-slate-400">
//                         No staff found.
//                       </td>
//                     </tr>
//                   )}

//                   {filtered.map((s) => (
//                     <tr
//                       key={s._id}
//                       className="border-t hover:bg-slate-50 transition-colors"
//                     >
//                       <td className="px-4 py-4">
//                         <div className="font-semibold text-slate-800">{s.name}</div>
//                         <div className="text-xs text-slate-400">{s.address || "—"}</div>
//                       </td>

//                       <td className="px-4 py-4 capitalize text-slate-700">{s.role || "—"}</td>
//                       <td className="px-4 py-4 text-slate-600">{s.email}</td>
//                       <td className="px-4 py-4 text-slate-600">{s.mobile}</td>

//                       <td className="px-4 py-4">
//                         {s.isPresent ? (
//                           <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
//                             Inside
//                           </span>
//                         ) : (
//                           <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
//                             Outside
//                           </span>
//                         )}
//                       </td>

//                       <td className="px-4 py-4 text-slate-600 text-sm">
//                         {s.entryTime ? new Date(s.entryTime).toLocaleString() : "--"}
//                       </td>

//                       <td className="px-4 py-4 text-slate-600 text-sm">
//                         {s.exitTime ? new Date(s.exitTime).toLocaleString() : "--"}
//                       </td>

//                       <td className="px-4 py-4 text-center">
//                         <div className="inline-flex items-center gap-3">
//                           <button
//                             title="View details"
//                             onClick={() => {
//                               setSelectedStaff(s);
//                               setShowViewModal(true);
//                             }}
//                             className="text-indigo-600 hover:text-indigo-800"
//                           >
//                             <FiInfo />
//                           </button>

//                           <button
//                             title="Delete staff"
//                             onClick={() => {
//                               setSelectedStaff(s);
//                               setShowDeleteModal(true);
//                             }}
//                             className="text-rose-600 hover:text-rose-800"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* subtle footer */}
//             <div className="mt-4 text-xs text-slate-400 px-2">
//               Showing <strong>{filtered.length}</strong> of <strong>{staffList.length}</strong> staff members.
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ADD STAFF MODAL */}
//       {showAddModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black/40 transition-opacity"
//             onClick={() => setShowAddModal(false)}
//           />

//           <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-slate-800">Add New Staff</h3>
//               <button
//                 onClick={() => setShowAddModal(false)}
//                 className="text-slate-400 hover:text-slate-600"
//               >
//                 <FiX />
//               </button>
//             </div>

//             <form className="grid gap-3" onSubmit={addStaff}>
//               <input
//                 name="name"
//                 value={form.name}
//                 onChange={handleFormChange}
//                 placeholder="Full name"
//                 className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-100"
//                 required
//               />

//               <input
//                 name="role"
//                 value={form.role}
//                 onChange={handleFormChange}
//                 placeholder="Role (cook, maid, gardener, driver...)"
//                 className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-100"
//                 required
//               />

//               <input
//                 name="address"
//                 value={form.address}
//                 onChange={handleFormChange}
//                 placeholder="Address"
//                 className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-100"
//               />

//               <input
//                 name="email"
//                 value={form.email}
//                 onChange={handleFormChange}
//                 placeholder="Email"
//                 type="email"
//                 className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-100"
//                 required
//               />

//               <input
//                 name="password"
//                 value={form.password}
//                 onChange={handleFormChange}
//                 placeholder="Password"
//                 type="password"
//                 className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-100"
//                 required
//               />

//               <input
//                 name="mobile"
//                 value={form.mobile}
//                 onChange={handleFormChange}
//                 placeholder="Mobile number"
//                 className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-100"
//               />

//               <div className="flex justify-end gap-3 mt-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-500 text-white"
//                 >
//                   {loading ? "Adding..." : "Add Staff"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* VIEW STAFF MODAL */}
//       {showViewModal && selectedStaff && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black/30"
//             onClick={() => setShowViewModal(false)}
//           />
//           <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-slate-800">Staff Details</h3>
//               <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600">
//                 <FiX />
//               </button>
//             </div>

//             <div className="space-y-3 text-slate-700">
//               <div>
//                 <p className="text-xs text-slate-500">Name</p>
//                 <p className="font-medium">{selectedStaff.name}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-slate-500">Role</p>
//                 <p className="capitalize">{selectedStaff.role}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-slate-500">Email</p>
//                 <p>{selectedStaff.email}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-slate-500">Mobile</p>
//                 <p>{selectedStaff.mobile}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-slate-500">Address</p>
//                 <p>{selectedStaff.address || "—"}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-slate-500">Status</p>
//                 <p className={selectedStaff.isPresent ? "text-emerald-600" : "text-amber-600"}>
//                   {selectedStaff.isPresent ? "Inside (Present)" : "Outside"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DELETE STAFF MODAL */}
//       {showDeleteModal && selectedStaff && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black/30"
//             onClick={() => setShowDeleteModal(false)}
//           />
//           <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border">
//             <h3 className="text-lg font-bold text-rose-600 mb-2">Delete Staff</h3>
//             <p className="text-sm text-slate-600 mb-6">
//               Are you sure you want to remove <strong>{selectedStaff.name}</strong> from the system? This action cannot be undone.
//             </p>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 rounded-lg bg-slate-100"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={deleteStaff}
//                 className="px-4 py-2 rounded-lg bg-rose-600 text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }


// src/pages/admin/Staff.jsx
import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  FiUserPlus,
  FiUsers,
  FiInfo,
  FiTrash2,
  FiSearch,
  FiX,
} from "react-icons/fi";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";

export default function StaffPage() {
  const { logout, user } = useContext(AuthContext);

  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    address: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState({ field: "name", dir: "asc" });

  const handleFormChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fetchStaff = async () => {
    try {
      const res = await API.get("/admin/staff/all");
      setStaffList(res.data || []);
    } catch (err) {
      console.error("fetchStaff", err);
    }
  };

  useEffect(() => {
    if (user?.token) fetchStaff();
  }, [user]);

  const addStaff = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/admin/staff", form);
      setForm({
        name: "",
        role: "",
        address: "",
        email: "",
        password: "",
        mobile: "",
      });
      setShowAddModal(false);
      await fetchStaff();
      toastSuccess("Staff member added successfully!");
    } catch (err) {
      console.error("addStaff", err);
      alert(err.response?.data?.msg || "Error adding staff");
    } finally {
      setLoading(false);
    }
  };

  const deleteStaff = async () => {
    if (!selectedStaff) return;
    try {
      await API.delete(`/admin/staff/${selectedStaff._id}`);
      setShowDeleteModal(false);
      await fetchStaff();
      toastSuccess("Staff deleted successfully!");
    } catch (err) {
      console.error("deleteStaff", err);
      alert("Failed to delete staff");
    }
  };

  const toastSuccess = (msg) => {
    try {
      const el = document.createElement("div");
      el.textContent = msg;
      el.className =
        "fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg z-50 animate-slideIn";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2600);
    } catch (e) {
      console.log(msg);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = staffList.slice();
    if (q) {
      list = list.filter(
        (s) =>
          (s.name || "").toLowerCase().includes(q) ||
          (s.role || "").toLowerCase().includes(q) ||
          (s.email || "").toLowerCase().includes(q) ||
          (s.mobile || "").includes(q)
      );
    }

    list.sort((a, b) => {
      const A = (a[sortBy.field] || "").toString().toLowerCase();
      const B = (b[sortBy.field] || "").toString().toLowerCase();
      if (A < B) return sortBy.dir === "asc" ? -1 : 1;
      if (A > B) return sortBy.dir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [staffList, query, sortBy]);

  const toggleSort = (field) => {
    setSortBy((s) => {
      if (s.field === field) {
        return { field, dir: s.dir === "asc" ? "desc" : "asc" };
      }
      return { field, dir: "asc" };
    });
  };

  return (
    <DashboardLayout role="admin" onLogout={logout}>
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-purple-900 tracking-wide">
            Staff Management
          </h1>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md transition-all"
          >
            <FiUserPlus /> Add Staff
          </button>
        </div>

        {/* Table */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center gap-2">
            <FiUsers /> Staff List
          </h2>

          {/* Search + sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="relative w-full md:w-72">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, role, email or mobile..."
                className="pl-10 pr-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
              />
              <FiSearch className="absolute left-3 top-2.5 text-purple-400" />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-2.5 text-purple-400 hover:text-purple-700"
                >
                  <FiX />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-purple-700">
              <button
                onClick={() => toggleSort("name")}
                className={`px-2 py-1 rounded-md ${
                  sortBy.field === "name" ? "bg-purple-100 text-purple-900" : "hover:bg-purple-50"
                }`}
              >
                Sort: Name {sortBy.field === "name" ? (sortBy.dir === "asc" ? "↑" : "↓") : ""}
              </button>

              <button
                onClick={() => toggleSort("role")}
                className={`px-2 py-1 rounded-md ${
                  sortBy.field === "role" ? "bg-purple-100 text-purple-900" : "hover:bg-purple-50"
                }`}
              >
                Sort: Role {sortBy.field === "role" ? (sortBy.dir === "asc" ? "↑" : "↓") : ""}
              </button>
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="text-sm text-gray-600">No staff found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100/60 text-purple-900">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Mobile</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((s) => (
                    <tr
                      key={s._id}
                      className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
                    >
                      <td className="p-3 font-semibold text-gray-800">{s.name}</td>
                      <td className="p-3 capitalize">{s.role || "—"}</td>
                      <td className="p-3">{s.email}</td>
                      <td className="p-3">{s.mobile}</td>
                      <td
                        className={`p-3 font-medium ${
                          s.isPresent ? "text-green-700" : "text-gray-500"
                        }`}
                      >
                        {s.isPresent ? "Inside" : "Outside"}
                      </td>
                      <td className="p-3 flex justify-center gap-5">
                        <button
                          className="text-purple-700 hover:text-purple-900 transition"
                          onClick={() => {
                            setSelectedStaff(s);
                            setShowViewModal(true);
                          }}
                        >
                          <FiInfo size={20} />
                        </button>

                        <button
                          className="text-red-600 hover:text-red-700 transition"
                          onClick={() => {
                            setSelectedStaff(s);
                            setShowDeleteModal(true);
                          }}
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ADD STAFF MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Add Staff</h2>
              <form className="grid gap-3" onSubmit={addStaff}>
                {["name", "role", "address", "email", "password", "mobile"].map((field) => (
                  <input
                    key={field}
                    name={field}
                    value={form[field]}
                    onChange={handleFormChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    type={field === "password" ? "password" : "text"}
                    className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
                    required
                  />
                ))}

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-700 hover:bg-purple-800 shadow-md text-white rounded-xl"
                  >
                    {loading ? "Adding..." : "Add Staff"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* VIEW STAFF MODAL */}
        {showViewModal && selectedStaff && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Staff Details</h2>
              <div className="space-y-2 text-gray-800">
                <p><strong>Name:</strong> {selectedStaff.name}</p>
                <p><strong>Role:</strong> {selectedStaff.role}</p>
                <p><strong>Email:</strong> {selectedStaff.email}</p>
                <p><strong>Mobile:</strong> {selectedStaff.mobile}</p>
                <p><strong>Address:</strong> {selectedStaff.address || "—"}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedStaff.isPresent ? (
                    <span className="text-green-700">Inside</span>
                  ) : (
                    <span className="text-gray-600">Outside</span>
                  )}
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE STAFF MODAL */}
        {showDeleteModal && selectedStaff && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-sm p-6">
              <h3 className="text-lg font-bold text-red-600 mb-2">Delete Staff</h3>
              <p className="text-sm text-gray-700 mb-6">
                Are you sure you want to remove <strong>{selectedStaff.name}</strong> from the system? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={deleteStaff}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
