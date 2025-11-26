// /* eslint-disable no-unused-vars */
// // src/pages/admin/Guards.jsx

// import React, { useState, useEffect, useContext } from "react";
// import { FiUserPlus, FiInfo, FiTrash2, FiUsers } from "react-icons/fi";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function Guards() {
//   const { logout, user } = useContext(AuthContext);

//   const [guards, setGuards] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Modal Controls
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);

//   const [selectedGuard, setSelectedGuard] = useState(null);

//   // Add Guard Form
//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     email: "",
//     password: "",
//     mobile: "",
//   });

//   const handleFormChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Fetch Guards
//   const fetchGuards = async () => {
//     try {
//       const res = await API.get("/admin/guards");
//       setGuards(res.data || []);
//     } catch (err) {
//       console.error("fetchGuards error", err);
//     }
//   };

//   useEffect(() => {
//     if (user?.token) fetchGuards();
//   }, [user]);

//   // Add Guard
//   const addGuard = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await API.post("/admin/guard", form);

//       setForm({
//         name: "",
//         address: "",
//         email: "",
//         password: "",
//         mobile: "",
//       });

//       setShowAddModal(false);
//       fetchGuards();
//       alert("Guard added successfully!");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Error adding guard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Guard
//   const deleteGuard = async (id) => {
//     if (!confirm("Are you sure you want to delete this guard?")) return;

//     try {
//       await API.delete(`/admin/guard/${id}`);
//       fetchGuards();
//     } catch (err) {
//       alert("Unable to delete");
//     }
//   };

//   return (
//     <DashboardLayout role="admin" onLogout={logout}>
//       <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
//           <h1 className="text-2xl md:text-3xl font-bold text-purple-900 tracking-wide">
//             Guards Management
//           </h1>

//           <button
//             onClick={() => setShowAddModal(true)}
//             className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md transition-all w-full md:w-auto justify-center"
//           >
//             <FiUserPlus /> Add Guard
//           </button>
//         </div>

//         {/* Guards Table */}
//         <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-4 md:p-6">
//           <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center gap-2">
//             <FiUsers /> Guards List
//           </h2>

//           {guards.length === 0 ? (
//             <p className="text-sm text-gray-600">No guards found.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse min-w-[700px]">
//                 <thead>
//                   <tr className="bg-purple-100/60 text-purple-900 text-sm md:text-base">
//                     <th className="p-3 text-left">Name</th>
//                     <th className="p-3 text-left">Address</th>
//                     <th className="p-3 text-left">Email</th>
//                     <th className="p-3 text-left">Mobile</th>
//                     <th className="p-3 text-left">Status</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {guards.map((g) => (
//                     <tr
//                       key={g._id}
//                       className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
//                     >
//                       <td className="p-3 font-semibold text-gray-800">{g.name}</td>
//                       <td className="p-3">{g.address}</td>
//                       <td className="p-3">{g.email}</td>
//                       <td className="p-3">{g.mobile}</td>

//                       <td
//                         className={`p-3 font-medium ${
//                           g.isPresent ? "text-green-700" : "text-gray-500"
//                         }`}
//                       >
//                         {g.isPresent ? "Inside" : "Outside"}
//                       </td>

//                       <td className="p-3 flex justify-center gap-5">

//                         {/* View Button */}
//                         <button
//                           className="text-purple-700 hover:text-purple-900 transition"
//                           onClick={() => {
//                             setSelectedGuard(g);
//                             setShowViewModal(true);
//                           }}
//                         >
//                           <FiInfo size={20} />
//                         </button>

//                         {/* Delete Button */}
//                         <button
//                           className="text-red-600 hover:text-red-700 transition"
//                           onClick={() => deleteGuard(g._id)}
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

//       {/* ADD GUARD MODAL */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">

//             <h2 className="text-2xl font-bold text-purple-900 mb-4">Add Guard</h2>

//             <form className="grid gap-3" onSubmit={addGuard}>
//               {["name", "address", "email", "password", "mobile"].map((field) => (
//                 <input
//                   key={field}
//                   name={field}
//                   value={form[field]}
//                   onChange={handleFormChange}
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   type={field === "password" ? "password" : "text"}
//                   className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
//                   required
//                 />
//               ))}

//               <div className="flex justify-end gap-3 mt-4 flex-wrap">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl w-full sm:w-auto"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-purple-700 hover:bg-purple-800 shadow-md text-white rounded-xl w-full sm:w-auto"
//                 >
//                   {loading ? "Adding..." : "Add Guard"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* VIEW GUARD MODAL */}
//       {showViewModal && selectedGuard && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">

//             <h2 className="text-2xl font-bold text-purple-900 mb-4">Guard Details</h2>

//             <div className="space-y-2 text-gray-800 text-sm md:text-base">
//               <p><strong>Name:</strong> {selectedGuard.name}</p>
//               <p><strong>Address:</strong> {selectedGuard.address}</p>
//               <p><strong>Email:</strong> {selectedGuard.email}</p>
//               <p><strong>Mobile:</strong> {selectedGuard.mobile}</p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 {selectedGuard.isPresent ? (
//                   <span className="text-green-700">Inside</span>
//                 ) : (
//                   <span className="text-gray-600">Outside</span>
//                 )}
//               </p>
//             </div>

//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl w-full sm:w-auto"
//               >
//                 Close
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }




import React, { useState, useEffect, useContext } from "react";
import { FiUserPlus, FiInfo, FiTrash2, FiUsers, FiSearch, FiDownload, FiX } from "react-icons/fi";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import jsPDF from "jspdf";
import DashboardLayout from "../../components/DashboardLayout";

export default function Guards() {
  const { logout, user } = useContext(AuthContext);

  const [guards, setGuards] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedGuard, setSelectedGuard] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchGuards = async () => {
    try {
      const res = await API.get("/admin/guards");
      setGuards(res.data || []);
      setFiltered(res.data || []);
    } catch (err) {
      console.error("fetchGuards error", err);
    }
  };

  useEffect(() => {
    if (user?.token) fetchGuards();
  }, [user]);

  const addGuard = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/admin/guard", form);
      setForm({ name: "", address: "", email: "", password: "", mobile: "" });
      setShowAddModal(false);
      fetchGuards();
      alert("Guard added successfully!");
    } catch (err) {
      alert(err.response?.data?.msg || "Error adding guard");
    } finally {
      setLoading(false);
    }
  };

  const deleteGuard = async (id) => {
    if (!confirm("Are you sure you want to delete this guard?")) return;
    try {
      await API.delete(`/admin/guard/${id}`);
      fetchGuards();
    } catch {
      alert("Unable to delete");
    }
  };

  // Filtering Logic
  useEffect(() => {
    let data = [...guards];

    if (search.trim() !== "")
      data = data.filter((g) => g.name?.toLowerCase().includes(search.toLowerCase()));

    if (nameFilter)
      data = data.filter((g) => g.name === nameFilter);

    if (statusFilter)
      data = data.filter((g) =>
        statusFilter === "Inside" ? g.isPresent : !g.isPresent
      );

    setFiltered(data);
  }, [search, nameFilter, statusFilter, guards]);

  const clearFilter = (type) => {
    if (type === "name") setNameFilter("");
    if (type === "status") setStatusFilter("");
  };

  const unique = (key) => [...new Set(guards.map((g) => g[key]).filter(Boolean))];

  const exportPDF = () => {
    if (!filtered.length) return;
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("Guards Report", 105, 10, { align: "center" });

    let y = 20;
    filtered.forEach((g) => {
      pdf.text(`${g.name} | ${g.email} | ${g.mobile} | ${g.isPresent ? "Inside" : "Outside"}`, 10, y);
      y += 8;
      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
    });

    pdf.save("guards.pdf");
  };

  return (
    <DashboardLayout role="admin" onLogout={logout}>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-900">Guards Management</h1>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-xl shadow"
            >
              <FiUserPlus /> Add Guard
            </button>

            <button
              onClick={exportPDF}
              className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-xl shadow"
            >
              <FiDownload /> Export PDF
            </button>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="bg-white/70 border border-purple-200 rounded-xl shadow-md p-4 mb-6 space-y-4">
          <div className="flex flex-wrap gap-3">

            {/* Search */}
            <div className="flex items-center bg-white rounded-lg px-3 py-2 gap-2 border w-full sm:w-60">
              <FiSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by name"
                className="outline-none w-full bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Name Filter */}
            <select
              className="p-2 border rounded-lg"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            >
              <option value="">Name</option>
              {unique("name").map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="p-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Inside">Inside</option>
              <option value="Outside">Outside</option>
            </select>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {nameFilter && (
              <span className="px-3 py-1 bg-purple-300 rounded-full text-sm flex items-center gap-1">
                Name: {nameFilter}
                <FiX className="cursor-pointer" onClick={() => clearFilter("name")} />
              </span>
            )}
            {statusFilter && (
              <span className="px-3 py-1 bg-purple-300 rounded-full text-sm flex items-center gap-1">
                Status: {statusFilter}
                <FiX className="cursor-pointer" onClick={() => clearFilter("status")} />
              </span>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-4 md:p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center gap-2">
            <FiUsers /> Guards List
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">
              <thead className="bg-purple-100 text-purple-900">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Address</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Mobile</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((g) => (
                  <tr key={g._id} className="border-b hover:bg-purple-50/50">
                    <td className="p-3 font-semibold">{g.name}</td>
                    <td className="p-3">{g.address}</td>
                    <td className="p-3">{g.email}</td>
                    <td className="p-3">{g.mobile}</td>
                    <td className={`p-3 font-medium ${g.isPresent ? "text-green-700" : "text-gray-500"}`}>
                      {g.isPresent ? "Inside" : "Outside"}
                    </td>
                    <td className="p-3 flex justify-center gap-5">
                      <button
                        className="text-purple-700 hover:text-purple-900"
                        onClick={() => {
                          setSelectedGuard(g);
                          setShowViewModal(true);
                        }}
                      >
                        <FiInfo size={20} />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-700"
                        onClick={() => deleteGuard(g._id)}
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!filtered.length && (
              <p className="text-sm text-gray-600 p-4">No guards found.</p>
            )}
          </div>
        </div>
      </div>

      {/* ADD GUARD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">

            <h2 className="text-2xl font-bold text-purple-900 mb-4">Add Guard</h2>

            <form className="grid gap-3" onSubmit={addGuard}>
              {["name", "address", "email", "password", "mobile"].map((field) => (
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

              <div className="flex justify-end gap-3 mt-4 flex-wrap">
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
                  {loading ? "Adding..." : "Add Guard"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedGuard && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">

            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Guard Details
            </h2>

            <div className="space-y-2 text-gray-800 text-sm md:text-base">
              <p><strong>Name:</strong> {selectedGuard.name}</p>
              <p><strong>Address:</strong> {selectedGuard.address}</p>
              <p><strong>Email:</strong> {selectedGuard.email}</p>
              <p><strong>Mobile:</strong> {selectedGuard.mobile}</p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedGuard.isPresent ? (
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
    </DashboardLayout>
  );
}
