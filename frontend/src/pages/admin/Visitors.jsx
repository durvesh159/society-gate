// // src/pages/admin/Visitors.jsx
// import React, { useState, useEffect, useContext } from "react";
// import { FiUsers, FiInfo } from "react-icons/fi";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function VisitorsPage() {
//   const { logout } = useContext(AuthContext);
//   const [visitors, setVisitors] = useState([]);

//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);

//   const fetchVisitors = async () => {
//     try {
//       const res = await API.get("/admin/visitors");
//       setVisitors(res.data || []);
//     } catch (err) {
//       console.error("fetchVisitors", err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//   }, []);

//   return (
//     <DashboardLayout role="admin" onLogout={logout}>
//       <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-2">
//           <h1 className="text-2xl sm:text-3xl font-bold text-purple-900 tracking-wide">
//             Visitors Management
//           </h1>
//         </div>

//         {/* Visitors Table */}
//         <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-4 sm:p-6">
          
//           <div className="flex items-center gap-2 mb-4">
//             <FiUsers className="text-purple-700 text-xl" />
//             <h2 className="text-lg sm:text-xl font-semibold text-purple-900">
//               Visitor Logs (Live)
//             </h2>
//           </div>

//           {visitors.length === 0 ? (
//             <div className="text-sm text-gray-600">No visitors yet.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse min-w-[700px] sm:min-w-full">
//                 <thead>
//                   <tr className="bg-purple-100/60 text-purple-900 text-sm sm:text-base">
//                     <th className="p-3 text-left">Name</th>
//                     <th className="p-3 text-left">Flat</th>
//                     <th className="p-3 text-left">Purpose</th>
//                     <th className="p-3 text-left">Entry</th>
//                     <th className="p-3 text-left">Exit</th>
//                     <th className="p-3 text-left">Guard</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {visitors.map((v) => (
//                     <tr
//                       key={v._id}
//                       className="border-b border-gray-200 hover:bg-purple-50/50 transition-all text-sm sm:text-base"
//                     >
//                       <td className="p-3 font-semibold text-gray-800">{v.name}</td>
//                       <td className="p-3 text-gray-600">{v.flatVisited}</td>
//                       <td className="p-3 text-gray-600">{v.purpose}</td>
//                       <td className="p-3 text-gray-600">
//                         {v.entryTime ? new Date(v.entryTime).toLocaleString() : "--"}
//                       </td>
//                       <td className="p-3 text-gray-600">
//                         {v.exitTime ? new Date(v.exitTime).toLocaleString() : "--"}
//                       </td>
//                       <td className="p-3 text-gray-600">{v.guard?.name || "--"}</td>

//                       <td className="p-3 flex justify-center">
//                         <button
//                           className="text-purple-700 hover:text-purple-900 transition"
//                           onClick={() => {
//                             setSelectedVisitor(v);
//                             setShowViewModal(true);
//                           }}
//                         >
//                           <FiInfo size={20} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             </div>
//           )}
//         </div>

//         {/* VIEW VISITOR MODAL */}
//         {showViewModal && selectedVisitor && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//             <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl 
//                             w-full max-w-sm sm:max-w-md p-6">

//               <h2 className="text-2xl font-bold text-purple-900 mb-4">
//                 Visitor Details
//               </h2>

//               <div className="space-y-2 text-gray-800 text-sm sm:text-base">
//                 <p><strong>Name:</strong> {selectedVisitor.name}</p>
//                 <p><strong>Flat:</strong> {selectedVisitor.flatVisited}</p>
//                 <p><strong>Purpose:</strong> {selectedVisitor.purpose}</p>
//                 <p>
//                   <strong>Entry:</strong>{" "}
//                   {selectedVisitor.entryTime
//                     ? new Date(selectedVisitor.entryTime).toLocaleString()
//                     : "--"}
//                 </p>
//                 <p>
//                   <strong>Exit:</strong>{" "}
//                   {selectedVisitor.exitTime
//                     ? new Date(selectedVisitor.exitTime).toLocaleString()
//                     : "--"}
//                 </p>
//                 <p><strong>Guard:</strong> {selectedVisitor.guard?.name || "--"}</p>
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
//       </div>
//     </DashboardLayout>
//   );
// }


import React, { useState, useEffect, useContext, useRef } from "react";
import { FiUsers, FiInfo, FiSearch, FiX, FiDownload } from "react-icons/fi";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import jsPDF from "jspdf";


export default function VisitorsPage() {
  const { logout } = useContext(AuthContext);
  const [visitors, setVisitors] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [flatFilter, setFlatFilter] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("");
  const [guardFilter, setGuardFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const tableRef = useRef(null);

  const fetchVisitors = async () => {
    try {
      const res = await API.get("/admin/visitors");
      setVisitors(res.data || []);
      setFiltered(res.data || []);
    } catch (err) {
      console.error("fetchVisitors", err);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const unique = (key) => [...new Set(visitors.map((v) => v[key]).filter(Boolean))];
  const uniqueGuards = [...new Set(visitors.map(v => v.guard?.name).filter(Boolean))];

  const applyFilter = () => {
    let data = [...visitors];

    if (search.trim() !== "") {
      data = data.filter(
        (v) =>
          v.name?.toLowerCase().includes(search.toLowerCase()) ||
          v.flatVisited?.toLowerCase().includes(search.toLowerCase()) ||
          v.purpose?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (flatFilter) data = data.filter((v) => v.flatVisited === flatFilter);
    if (purposeFilter) data = data.filter((v) => v.purpose === purposeFilter);
    if (guardFilter) data = data.filter((v) => v.guard?.name === guardFilter);

    if (dateFrom)
      data = data.filter((v) => new Date(v.entryTime) >= new Date(dateFrom));

    if (dateTo)
      data = data.filter(
        (v) => new Date(v.entryTime) <= new Date(dateTo + "T23:59:59")
      );

    setFiltered(data);
  };

  useEffect(() => {
    applyFilter();
  }, [search, flatFilter, purposeFilter, guardFilter, dateFrom, dateTo]);

  const clearFilter = (type) => {
    if (type === "flat") setFlatFilter("");
    if (type === "purpose") setPurposeFilter("");
    if (type === "guard") setGuardFilter("");
    if (type === "from") setDateFrom("");
    if (type === "to") setDateTo("");
  };

  

  // -------------------------------------------------------
  // EXPORT PDF (100% working)
  // -------------------------------------------------------
  const exportPDF = () => {
  if (!filtered || filtered.length === 0) return;

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 10;
  let yPos = 20;

  pdf.setFontSize(18);
  pdf.text("Visitor Logs", pageWidth / 2, 10, { align: "center" });

  pdf.setFontSize(12);
  pdf.setTextColor(50);

  const headers = ["Name", "Flat", "Purpose", "Entry", "Exit", "Guard"];
  const colWidths = [25, 20, 30, 45, 45, 25];

  let xPos = margin;
  headers.forEach((header, i) => {
    pdf.text(header, xPos, yPos);
    xPos += colWidths[i];
  });

  yPos += 8;
  pdf.setDrawColor(100);
  pdf.line(margin, yPos - 5, pageWidth - margin, yPos - 5);

  filtered.forEach((v) => {
    if (yPos > 270) {
      pdf.addPage();
      yPos = 20;
    }

    const row = [
      v.name || "--",
      v.flatVisited || "--",
      v.purpose || "--",
      v.entryTime ? new Date(v.entryTime).toLocaleString() : "--",
      v.exitTime ? new Date(v.exitTime).toLocaleString() : "--",
      v.guard?.name || "--"
    ];

    let xPos = margin;
    row.forEach((text, i) => {
      pdf.text(String(text), xPos, yPos);
      xPos += colWidths[i];
    });

    yPos += 8;
  });

  pdf.save("visitor-logs.pdf");
};


  return (
    <DashboardLayout role="admin" onLogout={logout}>
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl font-bold text-purple-900 tracking-wide">
            Visitors Management
          </h1>

          {/* PDF EXPORT */}
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <FiDownload /> Export PDF
          </button>
        </div>

        {/* FILTERS */}
        <div className="bg-white/70 border border-purple-200 rounded-xl shadow-md p-4 mb-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-white rounded-lg px-3 py-2 gap-2 border w-full sm:w-60">
              <FiSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search visitor"
                className="outline-none w-full bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Flat Filter */}
            <select
              value={flatFilter}
              onChange={(e) => setFlatFilter(e.target.value)}
              className="p-2 rounded-lg border w-full sm:w-40"
            >
              <option value="">Flat</option>
              {unique("flatVisited").map((flat) => (
                <option key={flat}>{flat}</option>
              ))}
            </select>

            {/* Purpose Filter */}
            <select
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value)}
              className="p-2 rounded-lg border w-full sm:w-40"
            >
              <option value="">Purpose</option>
              {unique("purpose").map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            {/* Guard Filter */}
            <select
              value={guardFilter}
              onChange={(e) => setGuardFilter(e.target.value)}
              className="p-2 rounded-lg border w-full sm:w-40"
            >
              <option value="">Guard</option>
              {uniqueGuards.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>

          </div>

          {/* Date Filters */}
          <div className="flex flex-wrap gap-3">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="p-2 rounded-lg border w-full sm:w-40"
            />

            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="p-2 rounded-lg border w-full sm:w-40"
            />
          </div>

          {/* Active Filters Pills */}
          <div className="flex flex-wrap gap-2">
            {flatFilter && (
              <span className="flex items-center gap-1 bg-purple-200 px-3 py-1 rounded-full text-sm">
                Flat: {flatFilter}
                <FiX onClick={() => clearFilter("flat")} className="cursor-pointer" />
              </span>
            )}
            {purposeFilter && (
              <span className="flex items-center gap-1 bg-purple-200 px-3 py-1 rounded-full text-sm">
                Purpose: {purposeFilter}
                <FiX onClick={() => clearFilter("purpose")} className="cursor-pointer" />
              </span>
            )}
            {guardFilter && (
              <span className="flex items-center gap-1 bg-purple-200 px-3 py-1 rounded-full text-sm">
                Guard: {guardFilter}
                <FiX onClick={() => clearFilter("guard")} className="cursor-pointer" />
              </span>
            )}
            {dateFrom && (
              <span className="flex items-center gap-1 bg-purple-200 px-3 py-1 rounded-full text-sm">
                From: {dateFrom}
                <FiX onClick={() => clearFilter("from")} className="cursor-pointer" />
              </span>
            )}
            {dateTo && (
              <span className="flex items-center gap-1 bg-purple-200 px-3 py-1 rounded-full text-sm">
                To: {dateTo}
                <FiX onClick={() => clearFilter("to")} className="cursor-pointer" />
              </span>
            )}
          </div>
        </div>

        {/* Visitors Table */}
        <div
          className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-4 sm:p-6"
          ref={tableRef}
        >
          <div className="flex items-center gap-2 mb-4">
            <FiUsers className="text-purple-700 text-xl" />
            <h2 className="text-lg sm:text-xl font-semibold text-purple-900">
              Visitor Logs (Filtered)
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="text-sm text-gray-600">No records found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-purple-100/60 text-purple-900">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Flat</th>
                    <th className="p-3 text-left">Purpose</th>
                    <th className="p-3 text-left">Entry</th>
                    <th className="p-3 text-left">Exit</th>
                    <th className="p-3 text-left">Guard</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v) => (
                    <tr key={v._id} className="border-b hover:bg-purple-50">
                      <td className="p-3 font-semibold">{v.name}</td>
                      <td className="p-3">{v.flatVisited}</td>
                      <td className="p-3">{v.purpose}</td>
                      <td className="p-3">
                        {v.entryTime ? new Date(v.entryTime).toLocaleString() : "--"}
                      </td>
                      <td className="p-3">
                        {v.exitTime ? new Date(v.exitTime).toLocaleString() : "--"}
                      </td>
                      <td className="p-3">{v.guard?.name || "--"}</td>
                      <td className="p-3 flex justify-center">
                        <button
                          className="text-purple-700 hover:text-purple-900"
                          onClick={() => {
                            setSelectedVisitor(v);
                            setShowViewModal(true);
                          }}
                        >
                          <FiInfo size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* VIEW MODAL */}
        {showViewModal && selectedVisitor && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="backdrop-blur-xl bg-white/70 border border-purple-200 rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">
                Visitor Details
              </h2>
              <div className="space-y-2 text-gray-800">
                <p><strong>Name:</strong> {selectedVisitor.name}</p>
                <p><strong>Flat:</strong> {selectedVisitor.flatVisited}</p>
                <p><strong>Purpose:</strong> {selectedVisitor.purpose}</p>
                <p>
                  <strong>Entry:</strong>{" "}
                  {selectedVisitor.entryTime
                    ? new Date(selectedVisitor.entryTime).toLocaleString()
                    : "--"}
                </p>
                <p>
                  <strong>Exit:</strong>{" "}
                  {selectedVisitor.exitTime
                    ? new Date(selectedVisitor.exitTime).toLocaleString()
                    : "--"}
                </p>
                <p><strong>Guard:</strong> {selectedVisitor.guard?.name || "--"}</p>
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

      </div>
    </DashboardLayout>
  );
}

