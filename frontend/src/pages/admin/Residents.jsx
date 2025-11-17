// // src/pages/admin/Residents.jsx
// import React, { useState, useEffect, useContext } from "react";
// import { FiUserPlus, FiList } from "react-icons/fi";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function Residents() {
//   const { logout } = useContext(AuthContext);

//   const [residents, setResidents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // form fields
//   const [name, setName] = useState("");
//   const [wing, setWing] = useState("");
//   const [flatNo, setFlatNo] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobile, setMobile] = useState("");

//   const fetchResidents = async () => {
//     try {
//       const res = await API.get("/admin/residents"); // expected GET endpoint
//       setResidents(res.data || []);
//     } catch (err) {
//       console.error("fetchResidents", err);
//     }
//   };

//   useEffect(() => {
//     fetchResidents();
//   }, []);

//   const addResident = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload = { name, wing, flatNo, email, password, mobile };
//       await API.post("/admin/resident", payload);
//       // reset
//       setName("");
//       setWing("");
//       setFlatNo("");
//       setEmail("");
//       setPassword("");
//       setMobile("");
//       // refresh list
//       await fetchResidents();
//       alert("Resident added successfully!");
//     } catch (err) {
//       console.error("addResident", err);
//       alert(err.response?.data?.msg || "Error adding resident");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout role="admin" onLogout={logout}>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8 text-gray-800">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-blue-900 tracking-wide">
//             Residents
//           </h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md shadow-md transition-all"
//           >
//             Logout
//           </button>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-2">
//           {/* Add Resident */}
//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//             <div className="flex items-center gap-2 mb-4">
//               <FiUserPlus className="text-blue-800 text-xl" />
//               <h2 className="text-lg font-semibold text-gray-800">Add Resident</h2>
//             </div>

//             <form onSubmit={addResident} className="grid gap-3">
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Name"
//                 className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
//                 required
//               />
//               <input
//                 value={wing}
//                 onChange={(e) => setWing(e.target.value)}
//                 placeholder="Wing"
//                 className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
//                 required
//               />
//               <input
//                 value={flatNo}
//                 onChange={(e) => setFlatNo(e.target.value)}
//                 placeholder="Flat No"
//                 className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
//                 required
//               />
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 type="email"
//                 className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
//                 required
//               />
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 type="password"
//                 className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
//                 required
//               />
//               <input
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 placeholder="Mobile"
//                 className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
//                 required
//               />

//               <div className="flex justify-center mt-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-md transition-all"
//                 >
//                   {loading ? "Adding..." : "Add Resident"}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Resident List */}
//           <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//             <div className="flex items-center gap-2 mb-4">
//               <FiList className="text-blue-800 text-xl" />
//               <h2 className="text-lg font-semibold text-gray-800">Residents List</h2>
//             </div>

//             {residents.length === 0 ? (
//               <div className="text-sm text-gray-500">No residents found.</div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-blue-50 text-blue-900 text-left">
//                       <th className="p-3">Name</th>
//                       <th className="p-3">Wing</th>
//                       <th className="p-3">Flat</th>
//                       <th className="p-3">Email</th>
//                       <th className="p-3">Mobile</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {residents.map((r) => (
//                       <tr key={r._id} className="border-b hover:bg-blue-50 transition-all">
//                         <td className="p-3 font-semibold text-gray-800">{r.name}</td>
//                         <td className="p-3 text-gray-600">{r.wing}</td>
//                         <td className="p-3 text-gray-600">{r.flatNo}</td>
//                         <td className="p-3 text-gray-600">{r.email}</td>
//                         <td className="p-3 text-gray-600">{r.mobile}</td>
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



// import React, { useState, useEffect, useContext } from "react";
// import { FiUserPlus, FiInfo, FiTrash2 } from "react-icons/fi";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function Residents() {
//   const { logout } = useContext(AuthContext);

//   const [residents, setResidents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Modal visibility
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);

//   // Selected resident for View Modal
//   const [selectedResident, setSelectedResident] = useState(null);

//   // Add Resident Form Fields
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

//   // Fetch Residents
//   const fetchResidents = async () => {
//     try {
//       const res = await API.get("/admin/residents");
//       setResidents(res.data || []);
//     } catch (err) {
//       console.error("fetchResidents error", err);
//     }
//   };

// const { user } = useContext(AuthContext);

//   useEffect(() => {
//   if (user?.token) {
//     fetchResidents();
//   }
// }, [user]);


//   // Add Resident Function
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
//       console.error("addResident error", err);
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
//     } catch (err) {
//       console.error("deleteResident error", err);
//       alert("Unable to delete");
//     }
//   };

//   return (
//     <DashboardLayout role="admin" onLogout={logout}>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8 text-gray-800">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-blue-900 tracking-wide">
//             Residents Management
//           </h1>

//           <button
//             onClick={() => setShowAddModal(true)}
//             className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md transition-all"
//           >
//             <FiUserPlus /> Add Resident
//           </button>
//         </div>

//         {/* Residents List */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//             Residents List
//           </h2>

//           {residents.length === 0 ? (
//             <div className="text-sm text-gray-500">No residents found.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-blue-50 text-blue-900 text-left">
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Wing</th>
//                     <th className="p-3">Flat</th>
//                     <th className="p-3">Email</th>
//                     <th className="p-3">Mobile</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {residents.map((r) => (
//                     <tr
//                       key={r._id}
//                       className="border-b hover:bg-blue-50 transition-all"
//                     >
//                       <td className="p-3 font-semibold">{r.name}</td>
//                       <td className="p-3">{r.wing}</td>
//                       <td className="p-3">{r.flatNo}</td>
//                       <td className="p-3">{r.email}</td>
//                       <td className="p-3">{r.mobile}</td>

//                       <td className="p-3 flex gap-4 justify-center">
//                         {/* View Details */}
//                         <button
//                           className="text-blue-700 hover:text-blue-900"
//                           onClick={() => {
//                             setSelectedResident(r);
//                             setShowViewModal(true);
//                           }}
//                         >
//                           <FiInfo size={20} />
//                         </button>

//                         {/* Delete */}
//                         <button
//                           className="text-red-600 hover:text-red-700"
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
//           <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
//             <h2 className="text-xl font-bold text-blue-900 mb-4">Add New Resident</h2>

//             <form className="grid gap-3" onSubmit={addResident}>
//               {["name", "wing", "flatNo", "email", "password", "mobile"].map((field) => (
//                 <input
//                   key={field}
//                   name={field}
//                   value={form[field]}
//                   onChange={handleFormChange}
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   type={field === "password" ? "password" : "text"}
//                   className="p-3 border rounded-md focus:ring-2 focus:ring-blue-700"
//                   required
//                 />
//               ))}

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
//           <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
//             <h2 className="text-xl font-bold text-blue-900 mb-4">
//               Resident Details
//             </h2>

//             <div className="space-y-2">
//               <p><strong>Name:</strong> {selectedResident.name}</p>
//               <p><strong>Wing:</strong> {selectedResident.wing}</p>
//               <p><strong>Flat:</strong> {selectedResident.flatNo}</p>
//               <p><strong>Email:</strong> {selectedResident.email}</p>
//               <p><strong>Mobile:</strong> {selectedResident.mobile}</p>
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

  // Modal Controls
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedResident, setSelectedResident] = useState(null);

  // Add Resident Form
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

  // Fetch residents
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

  // Add Resident
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
      console.log("ADD RESIDENT ERROR:", err.response);
      alert(err.response?.data?.msg || "Error adding resident");
    } finally {
      setLoading(false);
    }
  };

  // Delete Resident
  const deleteResident = async (id) => {
    if (!confirm("Are you sure you want to delete this resident?")) return;

    try {
      await API.delete(`/admin/resident/${id}`);
      fetchResidents();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Unable to delete");
    }
  };

  return (
    <DashboardLayout role="admin" onLogout={logout}>
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-purple-900 tracking-wide">
            Residents Management
          </h1>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md transition-all"
          >
            <FiUserPlus /> Add Resident
          </button>
        </div>

        {/* Residents Table */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center gap-2">
            Residents List
          </h2>

          {residents.length === 0 ? (
            <div className="text-sm text-gray-600">No residents found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
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

                      <td className="p-3 flex justify-center gap-5">
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

      {/* ADD RESIDENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
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
                  {loading ? "Adding..." : "Add Resident"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW RESIDENT MODAL */}
      {showViewModal && selectedResident && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
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
