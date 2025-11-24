
// // // src/pages/resident/ResidentDashboard.jsx
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect, useContext } from "react";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import socket from "../../socket";
// import DashboardLayout from "../../components/DashboardLayout";
// import { FiUserPlus, FiClock } from "react-icons/fi";

// export default function ResidentDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [datetime, setDatetime] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [pending, setPending] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [selectedImage, setSelectedImage] = useState(null); // NEW STATE FOR MODAL IMAGE

//   const fetchPending = async () => {
//     try {
//       const res = await API.get("/resident/pending");
//       setPending(res.data || []);
//     } catch (err) {
//       console.error("fetchPending", err);
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//     socket.on("visitorUpdate", () => {
//       fetchPending();
//     });

//     return () => socket.off("visitorUpdate");
//   }, []);

//   const preApprove = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await API.post("/resident/preapprove", {
//         name,
//         mobile,
//         email,
//         purpose,
//         scheduledTime: datetime || undefined,
//       });

//       setName("");
//       setMobile("");
//       setEmail("");
//       setPurpose("");
//       setDatetime("");

//       alert("Pre-approved successfully!");
//       fetchPending();
//       socket.emit("visitorUpdate");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const decideVisitor = async (visitorId, decision) => {
//     try {
//       await API.post("/resident/approve", { visitorId, decision });
//       fetchPending();
//       socket.emit("visitorUpdate");
//     } catch (err) {
//       alert("Error updating visitor status");
//     }
//   };

//   return (
//     <DashboardLayout role="resident" onLogout={logout}>
//       <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-extrabold text-purple-900 tracking-wide drop-shadow-sm">
//             Resident Dashboard
//           </h1>
//         </div>

//         {/* Pre-Approve Form */}
//         <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 mb-8 border border-purple-200 hover:shadow-2xl transition-all">
//           <div className="flex items-center gap-2 mb-4 text-purple-900">
//             <FiUserPlus className="text-purple-700 text-xl" />
//             <h2 className="text-lg font-semibold">Pre-Approve / Invite a Visitor</h2>
//           </div>

//           <form
//             onSubmit={preApprove}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
//           >
//             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Visitor name" className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700" required />
//             <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700" required />
//             <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Visitor email" className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700" required />
//             <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700" />
//             <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700" required />
//           </form>

//           <div className="flex justify-center mt-5">
//             <button type="submit" onClick={preApprove} disabled={loading} className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md transition-all">
//               {loading ? "Submitting..." : "Pre-Approve"}
//             </button>
//           </div>
//         </div>

//         {/* Pending Visitors */}
//         <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 border border-purple-200 hover:shadow-2xl transition-all">
//           <div className="flex items-center gap-2 mb-4 text-purple-900">
//             <FiClock className="text-purple-700 text-xl" />
//             <h2 className="text-lg font-semibold">Pending Visitors</h2>
//           </div>

//           {pending.length === 0 ? (
//             <div className="text-sm text-gray-700">No pending visitors.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-purple-100/60 text-purple-900">
//                     <th className="p-3 text-left">Name</th>
//                     <th className="p-3 text-left">Purpose</th>
//                     <th className="p-3 text-left">Status</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pending.map((v) => (
//                     <tr
//                       key={v._id}
//                       className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
//                     >
//                       <td className="p-3 font-semibold text-gray-800">{v.name}</td>
//                       <td className="p-3">{v.purpose}</td>
//                       <td className="p-3 capitalize">
//                         <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
//                           {v.status}
//                         </span>
//                       </td>

//                       {/* Updated Actions */}
//                       <td className="p-3 flex justify-center gap-2">
//                         <button
//                           onClick={() => setSelectedImage(v.documentImage)}
//                           className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-md transition-all"
//                         >
//                           View Document
//                         </button>

//                         <button
//                           onClick={() => decideVisitor(v._id, "allow")}
//                           className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md transition-all"
//                         >
//                           Allow
//                         </button>

//                         <button
//                           onClick={() => decideVisitor(v._id, "reject")}
//                           className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md transition-all"
//                         >
//                           Reject
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Document Preview Modal */}
//         {selectedImage && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//             <div className="bg-white p-4 rounded-xl shadow-xl max-w-lg">
//               <img src={selectedImage} alt="doc" className="w-full h-auto mb-4 rounded-lg" />

//               <div className="flex justify-between">
//                 <a
//                   download="document.jpg"
//                   href={selectedImage}
//                   className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md"
//                 >
//                   Download
//                 </a>
//                 <button
//                   onClick={() => setSelectedImage(null)}
//                   className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md"
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


// src/pages/resident/ResidentDashboard.jsx
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import socket from "../../socket";
import DashboardLayout from "../../components/DashboardLayout";
import { FiUserPlus, FiClock } from "react-icons/fi";

export default function ResidentDashboard() {
  const { user, logout } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [datetime, setDatetime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const fetchPending = async () => {
    try {
      const res = await API.get("/resident/pending");
      setPending(res.data || []);
    } catch (err) {
      console.error("fetchPending", err);
    }
  };

  useEffect(() => {
    fetchPending();

    socket.on("visitorUpdate", () => fetchPending());
    return () => socket.off("visitorUpdate");
  }, []);

  const preApprove = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/resident/preapprove", {
        name,
        mobile,
        email,
        purpose,
        scheduledTime: datetime || undefined,
      });

      setName("");
      setMobile("");
      setEmail("");
      setPurpose("");
      setDatetime("");

      alert("Pre-approved successfully!");
      fetchPending();
      socket.emit("visitorUpdate");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    } finally {
      setLoading(false);
    }
  };

  const decideVisitor = async (visitorId, decision) => {
    try {
      await API.post("/resident/approve", { visitorId, decision });
      fetchPending();
      socket.emit("visitorUpdate");
    } catch (err) {
      alert("Error updating visitor status");
    }
  };

  return (
    <DashboardLayout role="resident" onLogout={logout}>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-purple-900 tracking-wide drop-shadow-sm">
            Resident Dashboard
          </h1>
        </div>

        {/* ========================== */}
        {/* PRE-APPROVE FORM CARD */}
        {/* ========================== */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-4 md:p-6 mb-8 border border-purple-200 hover:shadow-2xl transition-all">

          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiUserPlus className="text-purple-700 text-xl" />
            <h2 className="text-lg md:text-xl font-semibold">
              Pre-Approve / Invite a Visitor
            </h2>
          </div>

          <form
            onSubmit={preApprove}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Visitor name" className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700" required />

            <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700" required />

            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Visitor email" className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700" required />

            <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700" />

            <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className="p-3 border rounded-md focus:ring-2 focus:ring-purple-700" required />
          </form>

          <div className="flex justify-center mt-4 md:mt-5">
            <button
              type="submit"
              onClick={preApprove}
              disabled={loading}
              className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md transition-all w-full sm:w-auto"
            >
              {loading ? "Submitting..." : "Pre-Approve"}
            </button>
          </div>
        </div>

        {/* ========================== */}
        {/* PENDING VISITORS CARD */}
        {/* ========================== */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-4 md:p-6 border border-purple-200 hover:shadow-2xl transition-all">

          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiClock className="text-purple-700 text-xl" />
            <h2 className="text-lg md:text-xl font-semibold">Pending Visitors</h2>
          </div>

          {pending.length === 0 ? (
            <div className="text-sm md:text-base text-gray-700">No pending visitors.</div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="bg-purple-100/60 text-purple-900 text-sm md:text-base">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Purpose</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {pending.map((v) => (
                    <tr
                      key={v._id}
                      className="border-b border-gray-200 hover:bg-purple-50/50 transition-all text-sm md:text-base"
                    >
                      <td className="p-3 font-semibold text-gray-800">{v.name}</td>
                      <td className="p-3">{v.purpose}</td>
                      <td className="p-3 capitalize">
                        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                          {v.status}
                        </span>
                      </td>

                      <td className="p-3 flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => setSelectedImage(v.documentImage)}
                          className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-md"
                        >
                          View
                        </button>

                        <button
                          onClick={() => decideVisitor(v._id, "allow")}
                          className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md"
                        >
                          Allow
                        </button>

                        <button
                          onClick={() => decideVisitor(v._id, "reject")}
                          className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>

        {/* ========================== */}
        {/* IMAGE PREVIEW MODAL */}
        {/* ========================== */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 rounded-xl shadow-xl max-w-lg w-full">
              <img src={selectedImage} alt="doc" className="w-full h-auto mb-4 rounded-lg" />

              <div className="flex justify-between gap-3">
                <a
                  download="document.jpg"
                  href={selectedImage}
                  className="flex-1 text-center px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md"
                >
                  Download
                </a>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md"
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
