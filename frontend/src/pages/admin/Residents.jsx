// // src/pages/admin/Residents.jsx

// import React, { useState, useEffect, useContext } from "react";
// import { FiUserPlus, FiInfo, FiTrash2 } from "react-icons/fi";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function Residents() {
//   const { logout, user } = useContext(AuthContext);

//   const [residents, setResidents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Modal Controls
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);

//   const [selectedResident, setSelectedResident] = useState(null);

//   // Add Resident Form
//   const [form, setForm] = useState({
//     name: "",
//     wing: "",
//     flatNo: "",
//     email: "",
//     password: "",
//     mobile: "",
//   });

//   const handleFormChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Fetch residents
//   const fetchResidents = async () => {
//     try {
//       const res = await API.get("/admin/residents");
//       setResidents(res.data || []);
//     } catch (err) {
//       console.error("fetchResidents error", err);
//     }
//   };

//   useEffect(() => {
//     if (user?.token) fetchResidents();
//   }, [user]);

//   // Add Resident
//   const addResident = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await API.post("/admin/resident", form);

//       setForm({
//         name: "",
//         wing: "",
//         flatNo: "",
//         email: "",
//         password: "",
//         mobile: "",
//       });

//       setShowAddModal(false);
//       fetchResidents();
//       alert("Resident added successfully!");
//     } catch (err) {
//       console.log("ADD RESIDENT ERROR:", err.response);
//       alert(err.response?.data?.msg || "Error adding resident");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Resident
//   const deleteResident = async (id) => {
//     if (!confirm("Are you sure you want to delete this resident?")) return;

//     try {
//       await API.delete(`/admin/resident/${id}`);
//       fetchResidents();
//     // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       alert("Unable to delete");
//     }
//   };

//   return (
//     <DashboardLayout role="admin" onLogout={logout}>
//       <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-10">
//           <h1 className="text-3xl font-bold text-purple-900 tracking-wide">
//             Residents Management
//           </h1>

//           <button
//             onClick={() => setShowAddModal(true)}
//             className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md transition-all"
//           >
//             <FiUserPlus /> Add Resident
//           </button>
//         </div>

//         {/* Residents Table */}
//         <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-6">
//           <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center gap-2">
//             Residents List
//           </h2>

//           {residents.length === 0 ? (
//             <div className="text-sm text-gray-600">No residents found.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-purple-100/60 text-purple-900">
//                     <th className="p-3 text-left">Name</th>
//                     <th className="p-3 text-left">Wing</th>
//                     <th className="p-3 text-left">Flat</th>
//                     <th className="p-3 text-left">Email</th>
//                     <th className="p-3 text-left">Mobile</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {residents.map((r) => (
//                     <tr
//                       key={r._id}
//                       className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
//                     >
//                       <td className="p-3 font-semibold text-gray-800">{r.name}</td>
//                       <td className="p-3">{r.wing}</td>
//                       <td className="p-3">{r.flatNo}</td>
//                       <td className="p-3">{r.email}</td>
//                       <td className="p-3">{r.mobile}</td>

//                       <td className="p-3 flex justify-center gap-5">
//                         <button
//                           className="text-purple-700 hover:text-purple-900 transition"
//                           onClick={() => {
//                             setSelectedResident(r);
//                             setShowViewModal(true);
//                           }}
//                         >
//                           <FiInfo size={20} />
//                         </button>

//                         <button
//                           className="text-red-600 hover:text-red-700 transition"
//                           onClick={() => deleteResident(r._id)}
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

//       {/* ADD RESIDENT MODAL */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">
//             <h2 className="text-2xl font-bold text-purple-900 mb-4">Add New Resident</h2>

//             <form className="grid gap-3" onSubmit={addResident}>
//               {["name", "wing", "flatNo", "email", "password", "mobile"].map((field) => (
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

//               <div className="flex justify-end gap-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-purple-700 hover:bg-purple-800 shadow-md text-white rounded-xl"
//                 >
//                   {loading ? "Adding..." : "Add Resident"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* VIEW RESIDENT MODAL */}
//       {showViewModal && selectedResident && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">
//             <h2 className="text-2xl font-bold text-purple-900 mb-4">
//               Resident Details
//             </h2>

//             <div className="space-y-2 text-gray-800">
//               <p><strong>Name:</strong> {selectedResident.name}</p>
//               <p><strong>Wing:</strong> {selectedResident.wing}</p>
//               <p><strong>Flat:</strong> {selectedResident.flatNo}</p>
//               <p><strong>Email:</strong> {selectedResident.email}</p>
//               <p><strong>Mobile:</strong> {selectedResident.mobile}</p>
//             </div>

//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl"
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




// src/pages/admin/Residents.jsx

import React, { useState, useEffect, useContext } from "react";
import { FiUserPlus, FiInfo, FiTrash2 } from "react-icons/fi";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";

export default function Residents() {
  const { logout, user } = useContext(AuthContext);

  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedResident, setSelectedResident] = useState(null);

  const [form, setForm] = useState({
    name: "",
    wing: "",
    flatNo: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchResidents = async () => {
    try {
      const res = await API.get("/admin/residents");
      setResidents(res.data || []);
    } catch (err) {
      console.error("fetchResidents error", err);
    }
  };

  useEffect(() => {
    if (user?.token) fetchResidents();
  }, [user]);

  const addResident = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/admin/resident", form);

      setForm({
        name: "",
        wing: "",
        flatNo: "",
        email: "",
        password: "",
        mobile: "",
      });

      setShowAddModal(false);
      fetchResidents();
      alert("Resident added successfully!");
    } catch (err) {
      alert(err.response?.data?.msg || "Error adding resident");
    } finally {
      setLoading(false);
    }
  };

  const deleteResident = async (id) => {
    if (!confirm("Are you sure you want to delete this resident?")) return;

    try {
      await API.delete(`/admin/resident/${id}`);
      fetchResidents();
    } catch {
      alert("Unable to delete");
    }
  };

  return (
    <DashboardLayout role="admin" onLogout={logout}>

      <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-900 tracking-wide">
            Residents Management
          </h1>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md transition-all w-full sm:w-auto justify-center"
          >
            <FiUserPlus size={18} /> Add Resident
          </button>
        </div>

        {/* Residents Table */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">
            Residents List
          </h2>

          {residents.length === 0 ? (
            <div className="text-sm text-gray-600">No residents found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-purple-100/60 text-purple-900">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Wing</th>
                    <th className="p-3 text-left">Flat</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Mobile</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {residents.map((r) => (
                    <tr
                      key={r._id}
                      className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
                    >
                      <td className="p-3 font-semibold text-gray-800">{r.name}</td>
                      <td className="p-3">{r.wing}</td>
                      <td className="p-3">{r.flatNo}</td>
                      <td className="p-3">{r.email}</td>
                      <td className="p-3">{r.mobile}</td>

                      <td className="p-3 flex justify-center gap-6">
                        <button
                          className="text-purple-700 hover:text-purple-900 transition"
                          onClick={() => {
                            setSelectedResident(r);
                            setShowViewModal(true);
                          }}
                        >
                          <FiInfo size={20} />
                        </button>

                        <button
                          className="text-red-600 hover:text-red-700 transition"
                          onClick={() => deleteResident(r._id)}
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
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Add New Resident</h2>

            <form className="grid gap-3" onSubmit={addResident}>
              {["name", "wing", "flatNo", "email", "password", "mobile"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleFormChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  type={field === "password" ? "password" : "text"}
                  className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600 w-full"
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
                  {loading ? "Adding..." : "Add Resident"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedResident && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Resident Details
            </h2>

            <div className="space-y-2 text-gray-800">
              <p><strong>Name:</strong> {selectedResident.name}</p>
              <p><strong>Wing:</strong> {selectedResident.wing}</p>
              <p><strong>Flat:</strong> {selectedResident.flatNo}</p>
              <p><strong>Email:</strong> {selectedResident.email}</p>
              <p><strong>Mobile:</strong> {selectedResident.mobile}</p>
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
