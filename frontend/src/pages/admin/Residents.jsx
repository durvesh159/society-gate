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
import { FiUserPlus, FiInfo, FiTrash2, FiSearch, FiDownload, FiX } from "react-icons/fi";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import jsPDF from "jspdf";
import DashboardLayout from "../../components/DashboardLayout";

export default function Residents() {
  const { logout, user } = useContext(AuthContext);

  const [residents, setResidents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [wingFilter, setWingFilter] = useState("");
  const [flatFilter, setFlatFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");

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

  const fetchResidents = async () => {
    try {
      const res = await API.get("/admin/residents");
      setResidents(res.data || []);
      setFiltered(res.data || []);
    } catch (err) {
      console.error("fetchResidents error", err);
    }
  };

  useEffect(() => {
    if (user?.token) fetchResidents();
  }, [user]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    if (!confirm("Are you sure?")) return;

    try {
      await API.delete(`/admin/resident/${id}`);
      fetchResidents();
    } catch {
      alert("Unable to delete");
    }
  };

  // Filters
  useEffect(() => {
    let data = [...residents];

    if (search.trim() !== "")
      data = data.filter((r) =>
        r.name?.toLowerCase().includes(search.toLowerCase())
      );

    if (wingFilter)
      data = data.filter((r) => r.wing === wingFilter);

    if (flatFilter)
      data = data.filter((r) => r.flatNo === flatFilter);

    if (emailFilter)
      data = data.filter((r) => r.email === emailFilter);

    if (mobileFilter)
      data = data.filter((r) => r.mobile === mobileFilter);

    setFiltered(data);
  }, [search, wingFilter, flatFilter, emailFilter, mobileFilter, residents]);

  const clearFilter = (type) => {
    if (type === "wing") setWingFilter("");
    if (type === "flat") setFlatFilter("");
    if (type === "email") setEmailFilter("");
    if (type === "mobile") setMobileFilter("");
  };

  const unique = (key) => [...new Set(residents.map(r => r[key]).filter(Boolean))];

  // Export PDF
  const exportPDF = () => {
    if (!filtered.length) return;
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    let yPos = 20;

    pdf.setFontSize(18);
    pdf.text("Residents Report", pageWidth / 2, 10, { align: "center" });

    pdf.setFontSize(12);
    pdf.setTextColor(50);

    const headers = ["Name", "Wing", "Flat", "Email", "Mobile"];
    const widths = [40, 20, 25, 70, 30];

    let xPos = margin;
    headers.forEach((h, i) => {
      pdf.text(h, xPos, yPos);
      xPos += widths[i];
    });

    yPos += 8;

    filtered.forEach((r) => {
      if (yPos > 270) {
        pdf.addPage();
        yPos = 20;
      }

      let row = [
        r.name || "--",
        r.wing || "--",
        r.flatNo || "--",
        r.email || "--",
        r.mobile || "--"
      ];

      let x = margin;
      row.forEach((text, i) => {
        pdf.text(String(text), x, yPos);
        x += widths[i];
      });

      yPos += 8;
    });

    pdf.save("residents.pdf");
  };

  return (
    <DashboardLayout role="admin" onLogout={logout}>
      <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-900">Residents Management</h1>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-xl shadow"
            >
              <FiUserPlus /> Add
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

            <select className="p-2 border rounded-lg" value={wingFilter} onChange={(e) => setWingFilter(e.target.value)}>
              <option value="">Wing</option>
              {unique("wing").map((w) => <option key={w}>{w}</option>)}
            </select>

            <select className="p-2 border rounded-lg" value={flatFilter} onChange={(e) => setFlatFilter(e.target.value)}>
              <option value="">Flat</option>
              {unique("flatNo").map((f) => <option key={f}>{f}</option>)}
            </select>

            <select className="p-2 border rounded-lg" value={emailFilter} onChange={(e) => setEmailFilter(e.target.value)}>
              <option value="">Email</option>
              {unique("email").map((e) => <option key={e}>{e}</option>)}
            </select>

            <select className="p-2 border rounded-lg" value={mobileFilter} onChange={(e) => setMobileFilter(e.target.value)}>
              <option value="">Mobile</option>
              {unique("mobile").map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {wingFilter && <span className="px-3 py-1 bg-purple-300 rounded-full text-sm flex items-center gap-1">Wing: {wingFilter} <FiX onClick={() => clearFilter("wing")} className="cursor-pointer" /></span>}
            {flatFilter && <span className="px-3 py-1 bg-purple-300 rounded-full text-sm flex items-center gap-1">Flat: {flatFilter} <FiX onClick={() => clearFilter("flat")} className="cursor-pointer" /></span>}
            {emailFilter && <span className="px-3 py-1 bg-purple-300 rounded-full text-sm flex items-center gap-1">Email: {emailFilter} <FiX onClick={() => clearFilter("email")} className="cursor-pointer" /></span>}
            {mobileFilter && <span className="px-3 py-1 bg-purple-300 rounded-full text-sm flex items-center gap-1">Mobile: {mobileFilter} <FiX onClick={() => clearFilter("mobile")} className="cursor-pointer" /></span>}
          </div>
        </div>

        {/* Table */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-4 sm:p-6">
          <table className="w-full min-w-[700px]">
            <thead className="bg-purple-100 text-purple-900">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Wing</th>
                <th className="p-3 text-left">Flat</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-b hover:bg-purple-50">
                  <td className="p-3 font-semibold">{r.name}</td>
                  <td className="p-3">{r.wing}</td>
                  <td className="p-3">{r.flatNo}</td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.mobile}</td>
                  <td className="p-3 flex justify-center gap-4">
                    <FiInfo size={18} className="cursor-pointer text-purple-700" onClick={() => { setSelectedResident(r); setShowViewModal(true); }} />
                    <FiTrash2 size={18} className="cursor-pointer text-red-600" onClick={() => deleteResident(r._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-gray-600 mt-4 text-sm">No results found.</p>
          )}
        </div>
      </div>

      {/* Modals remain unchanged — keeping your original design */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Add Resident</h2>
            <form onSubmit={addResident} className="grid gap-3">
              {["name", "wing", "flatNo", "email", "password", "mobile"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleFormChange}
                  placeholder={field.toUpperCase()}
                  type={field === "password" ? "password" : "text"}
                  className="p-3 border rounded-lg"
                  required
                />
              ))}
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded-lg">
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedResident && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Resident Details</h2>
            <p><strong>Name:</strong> {selectedResident.name}</p>
            <p><strong>Wing:</strong> {selectedResident.wing}</p>
            <p><strong>Flat:</strong> {selectedResident.flatNo}</p>
            <p><strong>Email:</strong> {selectedResident.email}</p>
            <p><strong>Mobile:</strong> {selectedResident.mobile}</p>

            <button onClick={() => setShowViewModal(false)} className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
