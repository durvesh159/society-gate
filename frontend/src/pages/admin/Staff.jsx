// /* eslint-disable no-unused-vars */
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

// export default function StaffPage() {
//   const { logout, user } = useContext(AuthContext);

//   const [staffList, setStaffList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const [selectedStaff, setSelectedStaff] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     role: "",
//     address: "",
//     email: "",
//     password: "",
//     mobile: "",
//   });

//   const [query, setQuery] = useState("");
//   const [sortBy, setSortBy] = useState({ field: "name", dir: "asc" });

//   const handleFormChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

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
//       toastSuccess("Staff member added successfully!");
//     } catch (err) {
//       console.error("addStaff", err);
//       alert(err.response?.data?.msg || "Error adding staff");
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   const toastSuccess = (msg) => {
//     try {
//       const el = document.createElement("div");
//       el.textContent = msg;
//       el.className =
//         "fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg z-50 animate-slideIn";
//       document.body.appendChild(el);
//       setTimeout(() => el.remove(), 2600);
//     } catch (e) {
//       console.log(msg);
//     }
//   };

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
//       <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-10">
//           <h1 className="text-3xl font-bold text-purple-900 tracking-wide">
//             Staff Management
//           </h1>

//           <button
//             onClick={() => setShowAddModal(true)}
//             className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md transition-all"
//           >
//             <FiUserPlus /> Add Staff
//           </button>
//         </div>

//         {/* Table */}
//         <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-6">
//           <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center gap-2">
//             <FiUsers /> Staff List
//           </h2>

//           {/* Search + sort */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//             <div className="relative w-full md:w-72">
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search name, role, email or mobile..."
//                 className="pl-10 pr-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
//               />
//               <FiSearch className="absolute left-3 top-2.5 text-purple-400" />
//               {query && (
//                 <button
//                   onClick={() => setQuery("")}
//                   className="absolute right-2 top-2.5 text-purple-400 hover:text-purple-700"
//                 >
//                   <FiX />
//                 </button>
//               )}
//             </div>

//             <div className="flex items-center gap-2 text-sm text-purple-700">
//               <button
//                 onClick={() => toggleSort("name")}
//                 className={`px-2 py-1 rounded-md ${
//                   sortBy.field === "name" ? "bg-purple-100 text-purple-900" : "hover:bg-purple-50"
//                 }`}
//               >
//                 Sort: Name {sortBy.field === "name" ? (sortBy.dir === "asc" ? "↑" : "↓") : ""}
//               </button>

//               <button
//                 onClick={() => toggleSort("role")}
//                 className={`px-2 py-1 rounded-md ${
//                   sortBy.field === "role" ? "bg-purple-100 text-purple-900" : "hover:bg-purple-50"
//                 }`}
//               >
//                 Sort: Role {sortBy.field === "role" ? (sortBy.dir === "asc" ? "↑" : "↓") : ""}
//               </button>
//             </div>
//           </div>

//           {/* Table */}
//           {filtered.length === 0 ? (
//             <div className="text-sm text-gray-600">No staff found.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-purple-100/60 text-purple-900">
//                     <th className="p-3 text-left">Name</th>
//                     <th className="p-3 text-left">Role</th>
//                     <th className="p-3 text-left">Email</th>
//                     <th className="p-3 text-left">Mobile</th>
//                     <th className="p-3 text-left">Status</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filtered.map((s) => (
//                     <tr
//                       key={s._id}
//                       className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
//                     >
//                       <td className="p-3 font-semibold text-gray-800">{s.name}</td>
//                       <td className="p-3 capitalize">{s.role || "—"}</td>
//                       <td className="p-3">{s.email}</td>
//                       <td className="p-3">{s.mobile}</td>
//                       <td
//                         className={`p-3 font-medium ${
//                           s.isPresent ? "text-green-700" : "text-gray-500"
//                         }`}
//                       >
//                         {s.isPresent ? "Inside" : "Outside"}
//                       </td>
//                       <td className="p-3 flex justify-center gap-5">
//                         <button
//                           className="text-purple-700 hover:text-purple-900 transition"
//                           onClick={() => {
//                             setSelectedStaff(s);
//                             setShowViewModal(true);
//                           }}
//                         >
//                           <FiInfo size={20} />
//                         </button>

//                         <button
//                           className="text-red-600 hover:text-red-700 transition"
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

//         {/* ADD STAFF MODAL */}
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">
//               <h2 className="text-2xl font-bold text-purple-900 mb-4">Add Staff</h2>
//               <form className="grid gap-3" onSubmit={addStaff}>
//                 {["name", "role", "address", "email", "password", "mobile"].map((field) => (
//                   <input
//                     key={field}
//                     name={field}
//                     value={form[field]}
//                     onChange={handleFormChange}
//                     placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                     type={field === "password" ? "password" : "text"}
//                     className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
//                     required
//                   />
//                 ))}

//                 <div className="flex justify-end gap-3 mt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowAddModal(false)}
//                     className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-purple-700 hover:bg-purple-800 shadow-md text-white rounded-xl"
//                   >
//                     {loading ? "Adding..." : "Add Staff"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* VIEW STAFF MODAL */}
//         {showViewModal && selectedStaff && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">
//               <h2 className="text-2xl font-bold text-purple-900 mb-4">Staff Details</h2>
//               <div className="space-y-2 text-gray-800">
//                 <p><strong>Name:</strong> {selectedStaff.name}</p>
//                 <p><strong>Role:</strong> {selectedStaff.role}</p>
//                 <p><strong>Email:</strong> {selectedStaff.email}</p>
//                 <p><strong>Mobile:</strong> {selectedStaff.mobile}</p>
//                 <p><strong>Address:</strong> {selectedStaff.address || "—"}</p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   {selectedStaff.isPresent ? (
//                     <span className="text-green-700">Inside</span>
//                   ) : (
//                     <span className="text-gray-600">Outside</span>
//                   )}
//                 </p>
//               </div>

//               <div className="flex justify-end mt-6">
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* DELETE STAFF MODAL */}
//         {showDeleteModal && selectedStaff && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-sm p-6">
//               <h3 className="text-lg font-bold text-red-600 mb-2">Delete Staff</h3>
//               <p className="text-sm text-gray-700 mb-6">
//                 Are you sure you want to remove <strong>{selectedStaff.name}</strong> from the system? This action cannot be undone.
//               </p>

//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={deleteStaff}
//                   className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </DashboardLayout>
//   );
// }


/* eslint-disable no-unused-vars */
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
      <div className="min-h-screen p-4 s:p-6 m:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Header */}
        <div className="flex flex-col s:flex-row justify-between items-start s:items-center mb-8 gap-4">
          <h1 className="text-2xl s:text-3xl font-bold text-purple-900 tracking-wide">
            Staff Management
          </h1>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md transition-all w-full s:w-auto justify-center"
          >
            <FiUserPlus /> Add Staff
          </button>
        </div>

        {/* Table Wrapper */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-4 s:p-6">
          <h2 className="text-lg s:text-xl font-semibold text-purple-900 mb-4 flex items-center gap-2">
            <FiUsers /> Staff List
          </h2>

          {/* Search + Sort */}
          <div className="flex flex-col m:flex-row m:items-center m:justify-between gap-4 mb-4">
            <div className="relative w-full m:w-72">
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
                  sortBy.field === "name"
                    ? "bg-purple-100 text-purple-900"
                    : "hover:bg-purple-50"
                }`}
              >
                Sort: Name {sortBy.field === "name" ? (sortBy.dir === "asc" ? "↑" : "↓") : ""}
              </button>

              <button
                onClick={() => toggleSort("role")}
                className={`px-2 py-1 rounded-md ${
                  sortBy.field === "role"
                    ? "bg-purple-100 text-purple-900"
                    : "hover:bg-purple-50"
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
              <table className="w-full border-collapse text-sm s:text-base">
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

        {/* --- ALL MODALS RESPONSIVE (NO LOGIC CHANGES) --- */}

        {/* ADD STAFF MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full s:max-w-lg p-6">
              <h2 className="text-xl s:text-2xl font-bold text-purple-900 mb-4">
                Add Staff
              </h2>

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
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full s:max-w-lg p-6">
              <h2 className="text-xl s:text-2xl font-bold text-purple-900 mb-4">
                Staff Details
              </h2>

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
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full s:max-w-sm p-6">
              <h3 className="text-lg s:text-xl font-bold text-red-600 mb-2">
                Delete Staff
              </h3>

              <p className="text-sm text-gray-700 mb-6">
                Are you sure you want to remove{" "}
                <strong>{selectedStaff.name}</strong>? This action cannot be undone.
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
