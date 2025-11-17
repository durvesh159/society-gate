// // src/pages/admin/Visitors.jsx
// import React, { useState, useEffect, useContext } from "react";
// import { FiUsers } from "react-icons/fi";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function VisitorsPage() {
//   const { logout } = useContext(AuthContext);
//   const [visitors, setVisitors] = useState([]);

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
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8 text-gray-800">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-blue-900 tracking-wide">Visitors</h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md shadow-md transition-all"
//           >
//             Logout
//           </button>
//         </div>

//         <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-800">
//           <div className="flex items-center gap-2 mb-4">
//             <FiUsers className="text-blue-800 text-xl" />
//             <h2 className="text-lg font-semibold text-gray-800">Visitor Logs (Live)</h2>
//           </div>

//           {visitors.length === 0 ? (
//             <div className="text-sm text-gray-500">No visitors yet.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-blue-50 text-blue-900 text-left">
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Flat</th>
//                     <th className="p-3">Purpose</th>
//                     <th className="p-3">Entry</th>
//                     <th className="p-3">Exit</th>
//                     <th className="p-3">Guard</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {visitors.map((v) => (
//                     <tr key={v._id} className="border-b hover:bg-blue-50 transition-all">
//                       <td className="p-3 font-semibold text-gray-800">{v.name}</td>
//                       <td className="p-3 text-gray-600">{v.flatVisited}</td>
//                       <td className="p-3 text-gray-600">{v.purpose}</td>
//                       <td className="p-3 text-gray-600">{v.entryTime ? new Date(v.entryTime).toLocaleString() : "--"}</td>
//                       <td className="p-3 text-gray-600">{v.exitTime ? new Date(v.exitTime).toLocaleString() : "--"}</td>
//                       <td className="p-3 text-gray-600">{v.guard?.name || "--"}</td>
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



// src/pages/admin/Visitors.jsx
import React, { useState, useEffect, useContext } from "react";
import { FiUsers, FiInfo } from "react-icons/fi";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";

export default function VisitorsPage() {
  const { logout } = useContext(AuthContext);
  const [visitors, setVisitors] = useState([]);

  // For modal view of visitor details (optional, matching guards/staff)
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const fetchVisitors = async () => {
    try {
      const res = await API.get("/admin/visitors");
      setVisitors(res.data || []);
    } catch (err) {
      console.error("fetchVisitors", err);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <DashboardLayout role="admin" onLogout={logout}>
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-900 tracking-wide">
            Visitors Management
          </h1>
          {/* <button
            onClick={logout}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl shadow-md transition-all"
          >
            Logout
          </button> */}
        </div>

        {/* Visitors Table */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiUsers className="text-purple-700 text-xl" />
            <h2 className="text-lg font-semibold text-purple-900">
              Visitor Logs (Live)
            </h2>
          </div>

          {visitors.length === 0 ? (
            <div className="text-sm text-gray-600">No visitors yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
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
                  {visitors.map((v) => (
                    <tr
                      key={v._id}
                      className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
                    >
                      <td className="p-3 font-semibold text-gray-800">{v.name}</td>
                      <td className="p-3 text-gray-600">{v.flatVisited}</td>
                      <td className="p-3 text-gray-600">{v.purpose}</td>
                      <td className="p-3 text-gray-600">
                        {v.entryTime ? new Date(v.entryTime).toLocaleString() : "--"}
                      </td>
                      <td className="p-3 text-gray-600">
                        {v.exitTime ? new Date(v.exitTime).toLocaleString() : "--"}
                      </td>
                      <td className="p-3 text-gray-600">{v.guard?.name || "--"}</td>
                      <td className="p-3 flex justify-center">
                        <button
                          className="text-purple-700 hover:text-purple-900 transition"
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

        {/* VIEW VISITOR MODAL */}
        {showViewModal && selectedVisitor && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="backdrop-blur-xl bg-white/70 border border-purple-200 shadow-2xl rounded-2xl w-full max-w-md p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">
                Visitor Details
              </h2>
              <div className="space-y-2 text-gray-800">
                <p><strong>Name:</strong> {selectedVisitor.name}</p>
                <p><strong>Flat:</strong> {selectedVisitor.flatVisited}</p>
                <p><strong>Purpose:</strong> {selectedVisitor.purpose}</p>
                <p><strong>Entry:</strong> {selectedVisitor.entryTime ? new Date(selectedVisitor.entryTime).toLocaleString() : "--"}</p>
                <p><strong>Exit:</strong> {selectedVisitor.exitTime ? new Date(selectedVisitor.exitTime).toLocaleString() : "--"}</p>
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
