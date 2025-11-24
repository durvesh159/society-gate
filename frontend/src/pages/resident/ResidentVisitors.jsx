
// // src/pages/resident/ResidentVisitors.jsx
// import React, { useEffect, useState, useContext } from "react";
// import API from "../../api/api";
// import DashboardLayout from "../../components/DashboardLayout";
// import { AuthContext } from "../../contexts/AuthContext";
// import { FiUsers, FiInfo } from "react-icons/fi";

// export default function ResidentVisitors() {
//   const { logout } = useContext(AuthContext);
//   const [history, setHistory] = useState([]);

//   // For modal view of visitor details
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);

//   const fetchHistory = async () => {
//     try {
//       const res = await API.get("/resident/visitors");
//       setHistory(res.data || []);
//     } catch (err) {
//       console.error("fetchHistory error", err);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   // Status color logic
//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "pending verification":
//         return "bg-yellow-100 text-yellow-700";
//       case "allowed":
//         return "bg-green-100 text-green-700";
//       case "checkedout":
//         return "bg-gray-200 text-gray-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-blue-100 text-blue-700";
//     }
//   };

//   return (
//     <DashboardLayout role="resident" onLogout={logout}>
//       <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-purple-900 tracking-wide">
//             Visitor History
//           </h1>
//           {/* <button
//             onClick={logout}
//             className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl shadow-md transition-all"
//           >
//             Logout
//           </button> */}
//         </div>

//         {/* Visitor Table */}
//         <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-6">
//           <div className="flex items-center gap-2 mb-4">
//             <FiUsers className="text-purple-700 text-xl" />
//             <h2 className="text-lg font-semibold text-purple-900">
//               All Visitor Records
//             </h2>
//           </div>

//           {history.length === 0 ? (
//             <div className="text-sm text-gray-600">No history yet.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-purple-100/60 text-purple-900">
//                     <th className="p-3 text-left">Name</th>
//                     <th className="p-3 text-left">Purpose</th>
//                     <th className="p-3 text-left">Status</th>
//                     <th className="p-3 text-left">Passcode</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {history.map((v) => (
//                     <tr
//                       key={v._id}
//                       className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
//                     >
//                       <td className="p-3 font-semibold text-gray-800">{v.name}</td>
//                       <td className="p-3 text-gray-600">{v.purpose}</td>
//                       <td className="p-3 capitalize">
//                         <span
//                           className={`px-2 py-1 text-sm rounded ${getStatusColor(
//                             v.status
//                           )}`}
//                         >
//                           {v.status}
//                         </span>
//                       </td>
//                       <td className="p-3 text-gray-600">{v.passcode || "--"}</td>
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
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-md p-6">
//               <h2 className="text-2xl font-bold text-purple-900 mb-4">
//                 Visitor Details
//               </h2>
//               <div className="space-y-2 text-gray-800">
//                 <p><strong>Name:</strong> {selectedVisitor.name}</p>
//                 <p><strong>Purpose:</strong> {selectedVisitor.purpose}</p>
//                 <p><strong>Status:</strong> {selectedVisitor.status}</p>
//                 <p><strong>Passcode:</strong> {selectedVisitor.passcode || "--"}</p>
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


// src/pages/resident/ResidentVisitors.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import DashboardLayout from "../../components/DashboardLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { FiUsers, FiInfo } from "react-icons/fi";

export default function ResidentVisitors() {
  const { logout } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/resident/visitors");
      setHistory(res.data || []);
    } catch (err) {
      console.error("fetchHistory error", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending verification":
        return "bg-yellow-100 text-yellow-700";
      case "allowed":
        return "bg-green-100 text-green-700";
      case "checkedout":
        return "bg-gray-200 text-gray-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <DashboardLayout role="resident" onLogout={logout}>
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-900 tracking-wide">
            Visitor History
          </h1>
        </div>

        {/* Visitor Table */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiUsers className="text-purple-700 text-xl sm:text-2xl" />
            <h2 className="text-lg sm:text-xl font-semibold text-purple-900">
              All Visitor Records
            </h2>
          </div>

          {history.length === 0 ? (
            <div className="text-sm text-gray-600">No history yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-purple-100/60 text-purple-900">
                    <th className="p-2 sm:p-3 text-left">Name</th>
                    <th className="p-2 sm:p-3 text-left">Purpose</th>
                    <th className="p-2 sm:p-3 text-left">Status</th>
                    <th className="p-2 sm:p-3 text-left">Passcode</th>
                    <th className="p-2 sm:p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((v) => (
                    <tr
                      key={v._id}
                      className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
                    >
                      <td className="p-2 sm:p-3 font-semibold text-gray-800">
                        {v.name}
                      </td>
                      <td className="p-2 sm:p-3 text-gray-600">{v.purpose}</td>
                      <td className="p-2 sm:p-3 capitalize">
                        <span
                          className={`px-2 py-1 text-xs sm:text-sm rounded ${getStatusColor(
                            v.status
                          )}`}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td className="p-2 sm:p-3 text-gray-600">{v.passcode || "--"}</td>

                      <td className="p-2 sm:p-3 flex justify-center">
                        <button
                          className="text-purple-700 hover:text-purple-900 transition"
                          onClick={() => {
                            setSelectedVisitor(v);
                            setShowViewModal(true);
                          }}
                        >
                          <FiInfo size={8} className="sm:size-20" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* VIEW VISITOR MODAL */}
        {showViewModal && selectedVisitor && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-md p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mb-4">
                Visitor Details
              </h2>

              <div className="space-y-2 text-gray-800 text-sm sm:text-base">
                <p><strong>Name:</strong> {selectedVisitor.name}</p>
                <p><strong>Purpose:</strong> {selectedVisitor.purpose}</p>
                <p><strong>Status:</strong> {selectedVisitor.status}</p>
                <p><strong>Passcode:</strong> {selectedVisitor.passcode || "--"}</p>
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
