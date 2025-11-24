// // src/pages/guard/GuardVisitors.jsx
// import React, { useEffect, useState, useContext, useRef } from "react";
// import API from "../../api/api";
// import socket from "../../socket";
// import DashboardLayout from "../../components/DashboardLayout";
// import { AuthContext } from "../../contexts/AuthContext";
// import { FiUsers, FiUserPlus, FiCamera, FiCheckCircle } from "react-icons/fi";

// export default function GuardVisitors() {
//   const { logout } = useContext(AuthContext);
//   const [visitors, setVisitors] = useState([]);

//   const [flat, setFlat] = useState("");
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [documentImage, setDocumentImage] = useState("");//

//     // ===== CAMERA STATE =====
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//     const startCamera = async () => {
//     setCameraOpen(true);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       videoRef.current.play();
//     } catch (err) {
//       console.error("Camera permission denied", err);
//     }
//   };

//   const captureImage = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     const ctx = canvas.getContext("2d");

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0);

//     const imageData = canvas.toDataURL("image/jpeg");
//     setDocumentImage(imageData);
//     setCameraOpen(false);

//     const stream = video.srcObject;
//     const tracks = stream.getTracks();
//     tracks.forEach((track) => track.stop());
//   };

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
//       documentImage
//     });

//     setName("");
//     setMobile("");
//     setPurpose("");
//     setFlat("");
//     setDocumentImage("");
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

//             {/* CAMERA BUTTON */}
//             {!documentImage ? (
//               <button
//                 type="button"
//                 onClick={startCamera}
//                 className="col-span-1 md:col-span-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-700 text-white rounded-xl"
//               >
//                 <FiCamera /> Capture Document Photo
//               </button>
//             ) : (
//               <div className="col-span-2 text-green-700 font-semibold flex items-center gap-2">
//                 <FiCheckCircle /> Photo Captured
//               </div>
//             )}
//           </form>

//           <div className="flex justify-center mt-5">
//             <button
//               type="submit"
//               onClick={addVisitor}
//               className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl shadow-md transition-all"
//               disabled={!documentImage}
//             >
//               Add Visitor
//             </button>
//           </div>
//         </div>

//         {/* CAMERA MODAL */}
//         {cameraOpen && (
//           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//             <div className="bg-white p-4 rounded-xl shadow-xl">
//               <video ref={videoRef} className="rounded-xl w-80" autoPlay></video>
//               <canvas ref={canvasRef} className="hidden"></canvas>
//               <button
//                 onClick={captureImage}
//                 className="mt-4 w-full bg-purple-700 text-white py-2 rounded-xl"
//               >
//                 Capture
//               </button>
//             </div>
//           </div>
//         )}

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
import React, { useEffect, useState, useContext, useRef } from "react";
import API from "../../api/api";
import socket from "../../socket";
import DashboardLayout from "../../components/DashboardLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { FiUsers, FiUserPlus, FiCamera, FiCheckCircle } from "react-icons/fi";

export default function GuardVisitors() {
  const { logout } = useContext(AuthContext);
  const [visitors, setVisitors] = useState([]);

  const [flat, setFlat] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [purpose, setPurpose] = useState("");
  const [documentImage, setDocumentImage] = useState("");

  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Camera permission denied", err);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    setDocumentImage(imageData);
    setCameraOpen(false);

    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  };

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

  const addVisitor = async (e) => {
    e.preventDefault();

    await API.post("/guard/add-visitor", {
      name,
      mobile,
      purpose,
      flatVisited: flat,
      preapproved: false,
      documentImage,
    });

    setName("");
    setMobile("");
    setPurpose("");
    setFlat("");
    setDocumentImage("");
    socket.emit("visitorUpdate");
  };

  const allow = async (id) => {
    await API.post("/guard/allow", { visitorId: id });
    socket.emit("visitorUpdate");
  };

  const checkout = async (id) => {
    await API.post("/guard/checkout", { visitorId: id });
    socket.emit("visitorUpdate");
  };

  return (
    <DashboardLayout role="guard" onLogout={logout}>
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* HEADER */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 tracking-wide mb-6 sm:mb-8">
          Visitors Management
        </h1>

        {/* ADD NEW VISITOR */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 shadow-xl rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiUserPlus className="text-purple-700 text-lg sm:text-xl" />
            <h2 className="text-base sm:text-lg font-semibold">Add New Visitor</h2>
          </div>

          <form
            onSubmit={addVisitor}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Visitor name"
              className="p-3 border rounded-xl bg-white/80 text-sm sm:text-base focus:ring-2 focus:ring-purple-600"
              required
            />

            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
              className="p-3 border rounded-xl bg-white/80 text-sm sm:text-base focus:ring-2 focus:ring-purple-600"
              required
            />

            <input
              value={flat}
              onChange={(e) => setFlat(e.target.value)}
              placeholder="Flat visited"
              className="p-3 border rounded-xl bg-white/80 text-sm sm:text-base focus:ring-2 focus:ring-purple-600"
              required
            />

            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose"
              className="p-3 border rounded-xl bg-white/80 text-sm sm:text-base focus:ring-2 focus:ring-purple-600"
              required
            />

            {/* CAMERA BUTTON */}
            {!documentImage ? (
              <button
                type="button"
                onClick={startCamera}
                className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-700 text-white rounded-xl text-sm sm:text-base"
              >
                <FiCamera /> Capture Document Photo
              </button>
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 text-green-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
                <FiCheckCircle /> Photo Captured
              </div>
            )}
          </form>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              onClick={addVisitor}
              className="px-5 sm:px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl shadow-md text-sm sm:text-base transition-all"
              disabled={!documentImage}
            >
              Add Visitor
            </button>
          </div>
        </div>

        {/* CAMERA MODAL */}
        {cameraOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-sm">
              <video ref={videoRef} className="rounded-xl w-full" autoPlay></video>
              <canvas ref={canvasRef} className="hidden"></canvas>

              <button
                onClick={captureImage}
                className="mt-4 w-full bg-purple-700 text-white py-2 rounded-xl text-sm sm:text-base"
              >
                Capture
              </button>
            </div>
          </div>
        )}

        {/* VISITOR LIST */}
        <div className="backdrop-blur-xl bg-white/60 border border-purple-200 shadow-xl rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-4 text-purple-900">
            <FiUsers className="text-purple-700 text-lg sm:text-xl" />
            <h2 className="text-base sm:text-lg font-semibold">Current Visitors</h2>
          </div>

          {visitors.length === 0 ? (
            <p className="text-gray-600 text-sm">No visitors currently.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-purple-100/60 text-purple-900 text-sm sm:text-base">
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
                            className={`px-2 py-1 rounded text-xs sm:text-sm ${
                              v.status === "allowed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>

                        {/* ACTION BUTTONS */}
                        <td className="p-3 flex justify-center gap-2">
                          <button
                            onClick={() => allow(v._id)}
                            className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition-all"
                          >
                            Allow
                          </button>

                          <button
                            onClick={() => checkout(v._id)}
                            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition-all"
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
