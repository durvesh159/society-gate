
// // src/pages/guard/GuardVisitors.jsx
// import React, { useEffect, useState, useContext } from "react";
// import API from "../../api/api";
// import socket from "../../socket";
// import DashboardLayout from "../../components/DashboardLayout";
// import { AuthContext } from "../../contexts/AuthContext";
// import { FiUsers, FiUserPlus } from "react-icons/fi";

// export default function GuardVisitors() {
//   const { logout } = useContext(AuthContext);
//   const [visitors, setVisitors] = useState([]);

//   const [flat, setFlat] = useState("");
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [purpose, setPurpose] = useState("");

//   const fetchVisitors = async () => {
//     try {
//       const res = await API.get("/guard/visitors");
//       setVisitors(res.data);
//     } catch (err) {
//       console.error("fetchVisitors error", err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     socket.on("visitorUpdate", fetchVisitors);
//     return () => socket.off("visitorUpdate");
//   }, []);

//   // =========================
//   // ADD VISITOR
//   // =========================
//   const addVisitor = async (e) => {
//     e.preventDefault();

//     await API.post("/guard/add-visitor", {
//       name,
//       mobile,
//       purpose,
//       flatVisited: flat,
//       preapproved: false,
//     });

//     setName("");
//     setMobile("");
//     setPurpose("");
//     setFlat("");

//     socket.emit("visitorUpdate");
//   };

//   // =========================
//   // ALLOW VISITOR
//   // =========================
//   const allow = async (id) => {
//     await API.post("/guard/allow", { visitorId: id });
//     socket.emit("visitorUpdate");
//   };

//   // =========================
//   // CHECKOUT VISITOR
//   // =========================
//   const checkout = async (id) => {
//     await API.post("/guard/checkout", { visitorId: id });
//     socket.emit("visitorUpdate");
//   };

//   return (
//     <DashboardLayout role="guard" onLogout={logout}>
//       <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         {/* HEADER */}
//         <h1 className="text-3xl font-bold text-purple-900 tracking-wide mb-8">
//           Visitors Management
//         </h1>

//         {/* ADD NEW VISITOR */}
//         <div className="backdrop-blur-xl bg-white/60 border border-purple-200 shadow-xl rounded-2xl p-6 mb-8 hover:shadow-2xl transition-all">
//           <div className="flex items-center gap-2 mb-4 text-purple-900">
//             <FiUserPlus className="text-purple-700 text-xl" />
//             <h2 className="text-lg font-semibold">Add New Visitor</h2>
//           </div>

//           <form
//             onSubmit={addVisitor}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
//           >
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Visitor name"
//               className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
//               required
//             />
//             <input
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               placeholder="Mobile"
//               className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
//               required
//             />
//             <input
//               value={flat}
//               onChange={(e) => setFlat(e.target.value)}
//               placeholder="Flat visited"
//               className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
//               required
//             />
//             <input
//               value={purpose}
//               onChange={(e) => setPurpose(e.target.value)}
//               placeholder="Purpose"
//               className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
//               required
//             />
//           </form>

//           <div className="flex justify-center mt-5">
//             <button
//               type="submit"
//               onClick={addVisitor}
//               className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl shadow-md transition-all"
//             >
//               Add Visitor
//             </button>
//           </div>
//         </div>

//         {/* VISITOR LIST */}
//         <div className="backdrop-blur-xl bg-white/60 border border-purple-200 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all">
//           <div className="flex items-center gap-2 mb-4 text-purple-900">
//             <FiUsers className="text-purple-700 text-xl" />
//             <h2 className="text-lg font-semibold">Current Visitors</h2>
//           </div>

//           {visitors.length === 0 ? (
//             <p className="text-gray-600 text-sm">No visitors currently.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-purple-100/60 text-purple-900">
//                     <th className="p-3 text-left">Name</th>
//                     <th className="p-3 text-left">Flat</th>
//                     <th className="p-3 text-left">Purpose</th>
//                     <th className="p-3 text-left">Status</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {visitors
//                     .filter((v) => v.status !== "checkedout")
//                     .map((v) => (
//                       <tr
//                         key={v._id}
//                         className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
//                       >
//                         <td className="p-3 font-semibold text-gray-800">{v.name}</td>
//                         <td className="p-3">{v.flatVisited}</td>
//                         <td className="p-3">{v.purpose}</td>
//                         <td className="p-3 capitalize">
//                           <span
//                             className={`px-2 py-1 rounded text-sm ${
//                               v.status === "allowed"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-yellow-100 text-yellow-700"
//                             }`}
//                           >
//                             {v.status}
//                           </span>
//                         </td>
//                         <td className="p-3 flex justify-center gap-2">
//                           <button
//                             onClick={() => allow(v._id)}
//                             className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded-md text-sm transition-all"
//                           >
//                             Allow
//                           </button>

//                           <button
//                             onClick={() => checkout(v._id)}
//                             className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm transition-all"
//                           >
//                             Checkout
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//       </div>
//     </DashboardLayout>
//   );
// }



// src/pages/guard/GuardVisitors.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import socket from "../../socket";
import DashboardLayout from "../../components/DashboardLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { FiUsers, FiUserPlus } from "react-icons/fi";

export default function GuardVisitors() {
  const { logout } = useContext(AuthContext);
  const [visitors, setVisitors] = useState([]);

  const [flat, setFlat] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [purpose, setPurpose] = useState("");
  const [documentImage, setDocumentImage] = useState("");//

  const fetchVisitors = async () => {
    try {
      const res = await API.get("/guard/visitors");
      setVisitors(res.data);
    } catch (err) {
      console.error("fetchVisitors error", err);
    }
  };

  useEffect(() => {
    fetchVisitors();
    socket.on("visitorUpdate", fetchVisitors);
    return () => socket.off("visitorUpdate");
  }, []);

 //Yaha changes hue hai
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setDocumentImage(reader.result);
    reader.readAsDataURL(file);
  };

  // =========================
  // ADD VISITOR
  // =========================
  const addVisitor = async (e) => {
    e.preventDefault();

    await API.post("/guard/add-visitor", {
      name,
      mobile,
      purpose,
      flatVisited: flat,
      preapproved: false,
      documentImage
    });

    setName("");
    setMobile("");
    setPurpose("");
    setFlat("");
    setDocumentImage("");
    socket.emit("visitorUpdate");
  };

  // =========================
  // ALLOW VISITOR
  // =========================
  const allow = async (id) => {
    await API.post("/guard/allow", { visitorId: id });
    socket.emit("visitorUpdate");
  };

  // =========================
  // CHECKOUT VISITOR
  // =========================
  const checkout = async (id) => {
    await API.post("/guard/checkout", { visitorId: id });
    socket.emit("visitorUpdate");
  };

  return (
    <DashboardLayout role="guard" onLogout={logout}>
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-purple-900 tracking-wide mb-8">
          Visitors Management
        </h1>

        {/* ADD NEW VISITOR */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 shadow-xl rounded-2xl p-6 mb-8 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiUserPlus className="text-purple-700 text-xl" />
            <h2 className="text-lg font-semibold">Add New Visitor</h2>
          </div>

          <form
            onSubmit={addVisitor}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Visitor name"
              className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
              className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              value={flat}
              onChange={(e) => setFlat(e.target.value)}
              placeholder="Flat visited"
              className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose"
              className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
              required
            />
            {/*Yaha changes hue hai*/}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleDocumentUpload}
              className="p-2 border rounded-xl col-span-1 md:col-span-2"
              required
            />
          </form>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              onClick={addVisitor}
              className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl shadow-md transition-all"
            >
              Add Visitor
            </button>
          </div>
        </div>

        {/* VISITOR LIST */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiUsers className="text-purple-700 text-xl" />
            <h2 className="text-lg font-semibold">Current Visitors</h2>
          </div>

          {visitors.length === 0 ? (
            <p className="text-gray-600 text-sm">No visitors currently.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100/60 text-purple-900">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Flat</th>
                    <th className="p-3 text-left">Purpose</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors
                    .filter((v) => v.status !== "checkedout")
                    .map((v) => (
                      <tr
                        key={v._id}
                        className="border-b border-gray-200 hover:bg-purple-50/50 transition-all"
                      >
                        <td className="p-3 font-semibold text-gray-800">{v.name}</td>
                        <td className="p-3">{v.flatVisited}</td>
                        <td className="p-3">{v.purpose}</td>
                        <td className="p-3 capitalize">
                          <span
                            className={`px-2 py-1 rounded text-sm ${
                              v.status === "allowed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td className="p-3 flex justify-center gap-2">
                          <button
                            onClick={() => allow(v._id)}
                            className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded-md text-sm transition-all"
                          >
                            Allow
                          </button>

                          <button
                            onClick={() => checkout(v._id)}
                            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm transition-all"
                          >
                            Checkout
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
    </DashboardLayout>
  );
}
