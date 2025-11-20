// import React, { useEffect, useState, useContext } from "react";
// import API from "../api/api";
// import DashboardLayout from "../components/DashboardLayout";
// import { AuthContext } from "../contexts/AuthContext";
// import { FiPlus, FiTrash2, FiStar, FiHome } from "react-icons/fi";

// export default function Flats() {
//   const { user } = useContext(AuthContext);

//   const [flats, setFlats] = useState([]);
//   const [viewModal, setViewModal] = useState(null);
//   const [addModal, setAddModal] = useState(false);
//   const [images, setImages] = useState([]);

//   const [form, setForm] = useState({
//     bhk: 1,
//     area: "",
//     price: "",
//     furnished: "Unfurnished",
//     availableFrom: "",
//     description: "",
//   });

//   // Fetch flats
//   const loadFlats = async () => {
//     try {
//       const res = await API.get("/flats");
//       setFlats(res.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     loadFlats();
//   }, []);

//   // Convert to Base64
//   const convertToBase64 = (files) => {
//     [...files].forEach((file) => {
//       const r = new FileReader();
//       r.onloadend = () => setImages((prev) => [...prev, r.result]);
//       r.readAsDataURL(file);
//     });
//   };

//   // Add Flat
//   const submitFlat = async () => {
//     try {
//       await API.post("/flats/add", { ...form, images });

//       setAddModal(false);
//       setForm({
//         bhk: 1,
//         area: "",
//         price: "",
//         furnished: "Unfurnished",
//         availableFrom: "",
//         description: "",
//       });
//       setImages([]);

//       loadFlats();
//       alert("Flat added successfully!");
//     } catch (err) {
//       alert(err.response?.data?.message || "Error adding flat");
//     }
//   };

//   // Delete Flat
//   const deleteFlat = async (id) => {
//     if (!confirm("Are you sure you want to delete this flat?")) return;

//     try {
//       await API.delete(`/flats/${id}`);
//       setViewModal(null);
//       loadFlats();
//     } catch {
//       alert("Unable to delete");
//     }
//   };

//   return (
//     <DashboardLayout role={user.role}>
//       <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-10">
//           <h1 className="text-3xl font-bold text-purple-900 tracking-wide">
//             Flats for Rent
//           </h1>

//           {(user.role === "admin" || user.role === "resident") && (
//             <button
//               onClick={() => setAddModal(true)}
//               className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md transition-all"
//             >
//               <FiPlus /> Add Flat
//             </button>
//           )}
//         </div>

//         {/* Flats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {flats.map((f) => (
//             <div
//               key={f._id}
//               className="backdrop-blur-xl bg-white/60 border border-purple-200 rounded-2xl shadow-xl p-4 hover:shadow-2xl transition-all cursor-pointer"
//             >
//               {/* Featured Badge */}
//               {f.featured && (
//                 <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-semibold">
//                   ★ Featured
//                 </span>
//               )}

//               <img
//                 src={f.images[0]}
//                 className="h-48 w-full object-cover rounded-xl mt-3"
//               />

//               <div className="mt-3">
//                 <h2 className="text-xl font-bold text-purple-900 flex items-center gap-2">
//                   <FiHome /> {f.bhk} BHK
//                 </h2>
//                 <p className="text-gray-800 font-semibold">₹{f.price}</p>
//                 <p className="text-gray-600">
//                   {f.area} sqft • {f.furnished}
//                 </p>
//               </div>

//               <button
//                 onClick={() => setViewModal(f)}
//                 className="w-full mt-4 bg-purple-700 text-white py-2 rounded-xl hover:bg-purple-800 shadow-md"
//               >
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* VIEW MODAL */}
//       {viewModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="backdrop-blur-xl bg-white/70 border border-purple-200 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
//             <h2 className="text-2xl font-bold text-purple-900">
//               {viewModal.bhk} BHK Apartment
//             </h2>

//             <img
//               src={viewModal.images[0]}
//               className="w-full rounded-xl mt-4 shadow"
//             />

//             <div className="mt-4 space-y-2 text-gray-800">
//               <p><strong>Rent:</strong> ₹{viewModal.price}</p>
//               <p><strong>Area:</strong> {viewModal.area} sqft</p>
//               <p><strong>Furnished:</strong> {viewModal.furnished}</p>
//               <p><strong>Description:</strong> {viewModal.description}</p>
//             </div>

//             {/* Admin - Mark Featured */}
//             {user.role === "admin" && !viewModal.featured && (
//               <button
//                 onClick={() =>
//                   API.patch(`/flats/feature/${viewModal._id}`).then(loadFlats)
//                 }
//                 className="w-full mt-4 bg-yellow-500 text-black py-2 rounded-xl"
//               >
//                 <FiStar className="inline-block mr-1" /> Mark Featured
//               </button>
//             )}

//             {/* Mark Rented */}
//             {!viewModal.isRented &&
//               (user.role === "admin" || user.id === viewModal.ownerId) && (
//                 <button
//                   onClick={() =>
//                     API.patch(`/flats/rented/${viewModal._id}`).then(loadFlats)
//                   }
//                   className="w-full mt-3 bg-green-600 text-white py-2 rounded-xl"
//                 >
//                   Mark as Rented
//                 </button>
//               )}

//             {/* Delete */}
//             {(user.role === "admin" || user.id === viewModal.ownerId) && (
//               <button
//                 onClick={() => deleteFlat(viewModal._id)}
//                 className="w-full mt-3 bg-red-600 text-white py-2 rounded-xl flex justify-center gap-2"
//               >
//                 <FiTrash2 /> Delete
//               </button>
//             )}

//             <button
//               onClick={() => setViewModal(null)}
//               className="w-full mt-4 bg-gray-400 text-white py-2 rounded-xl"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ADD FLAT MODAL */}
//       {addModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="backdrop-blur-xl bg-white/70 border border-purple-200 rounded-2xl w-full max-w-lg p-6 shadow-2xl">

//             <h2 className="text-2xl font-bold text-purple-900 mb-4">
//               Add New Flat
//             </h2>

//             <div className="grid gap-3">
//               <input
//                 type="number"
//                 placeholder="BHK"
//                 onChange={(e) => setForm({ ...form, bhk: e.target.value })}
//                 className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
//               />

//               <input
//                 type="number"
//                 placeholder="Area (sqft)"
//                 onChange={(e) => setForm({ ...form, area: e.target.value })}
//                 className="p-3 border rounded-xl bg-white/80"
//               />

//               <input
//                 type="number"
//                 placeholder="Rent Price"
//                 onChange={(e) => setForm({ ...form, price: e.target.value })}
//                 className="p-3 border rounded-xl bg-white/80"
//               />

//               <input
//                 type="date"
//                 onChange={(e) =>
//                   setForm({ ...form, availableFrom: e.target.value })
//                 }
//                 className="p-3 border rounded-xl bg-white/80"
//               />

//               <select
//                 onChange={(e) =>
//                   setForm({ ...form, furnished: e.target.value })
//                 }
//                 className="p-3 border rounded-xl bg-white/80"
//               >
//                 <option>Unfurnished</option>
//                 <option>Semi</option>
//                 <option>Fully</option>
//               </select>

//               <textarea
//                 placeholder="Description"
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//                 className="p-3 border rounded-xl bg-white/80"
//               />

//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={(e) => convertToBase64(e.target.files)}
//                 className="p-3 border rounded-xl bg-white/80"
//               />
//             </div>

//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 onClick={() => setAddModal(false)}
//                 className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={submitFlat}
//                 className="px-6 py-2 bg-purple-700 hover:bg-purple-800 shadow-md text-white rounded-xl"
//               >
//                 Add Flat
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }



//frontend/Flats.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import { AuthContext } from "../contexts/AuthContext";
import { FiPlus, FiTrash2, FiStar, FiHome, FiPhone, FiMail } from "react-icons/fi";

export default function Flats() {
  const { user } = useContext(AuthContext);

  const [flats, setFlats] = useState([]);
  const [viewModal, setViewModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false); // Loading state

  const [form, setForm] = useState({
    bhk: 1,
    area: "",
    price: "",
    furnished: "Unfurnished",
    availableFrom: "",
    description: "",
    contact: "",
  });

  // Fetch flats
  const loadFlats = async () => {
    try {
      const res = await API.get("/flats");
      setFlats(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFlats();
  }, []);

  // Upload images as FormData for speed
  const handleImageChange = (files) => {
    setImages(files);
  };

  // Add Flat
  const submitFlat = async () => {
    if (!form.bhk || !form.area || !form.price || !form.availableFrom || !images.length) {
      alert("Please fill all required fields and add at least one image");
      return;
    }

    try {
      setUploading(true);

      const data = new FormData();
      data.append("bhk", form.bhk);
      data.append("area", form.area);
      data.append("price", form.price);
      data.append("furnished", form.furnished);
      data.append("availableFrom", form.availableFrom);
      data.append("description", form.description);
      data.append("contact", form.contact);
      Array.from(images).forEach((img) => data.append("images", img));

      await API.post("/flats/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAddModal(false);
      setForm({
        bhk: 1,
        area: "",
        price: "",
        furnished: "Unfurnished",
        availableFrom: "",
        description: "",
        contact: "",
      });
      setImages([]);
      loadFlats();
      alert("Flat added successfully!");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error adding flat");
    } finally {
      setUploading(false);
    }
  };

  // Delete Flat
  const deleteFlat = async (id) => {
    if (!confirm("Are you sure you want to delete this flat?")) return;
    try {
      await API.delete(`/flats/${id}`);
      setViewModal(null);
      loadFlats();
    } catch {
      alert("Unable to delete");
    }
  };

  // Mark as rented
  const handleMarkRented = async (id) => {
  try {
    await API.patch(`/flats/rented/${id}`);
    alert("Flat marked as rented!");
    loadFlats();
    setViewModal(null);
  } catch (err) {
    console.log(err);
    alert(err.response?.data?.msg || "Unable to mark as rented");
  }
};


  return (
    <DashboardLayout role={user.role}>
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-purple-900 tracking-wide">
            Flats for Rent
          </h1>
          {(user.role === "admin" || user.role === "resident") && (
            <button
              onClick={() => setAddModal(true)}
              className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <FiPlus /> Add Flat
            </button>
          )}
        </div>

        {/* Flats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flats.map((f) => (
            <div
              key={f._id}
              className={`backdrop-blur-xl bg-white/80 border border-purple-300 rounded-3xl shadow-xl p-4 hover:shadow-2xl transition-transform hover:-translate-y-1 cursor-pointer`}
              onClick={() => setViewModal(f)}
            >
              {f.featured && (
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold absolute mt-2 ml-2">
                  ★ Featured
                </span>
              )}
              {f.isRented && (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full font-semibold items-end absolute mt-2 ml-5">
                    Rented
                </span>
                )}


              <img
                //src={f.images[0]}
                src={`data:image/jpeg;base64,${f.images[0]}`}
                className="h-52 w-full object-cover rounded-2xl mt-3 shadow"
              />

              <div className="mt-3">
                <h2 className="text-xl font-bold text-purple-900 flex items-center gap-2">
                  <FiHome /> {f.bhk} BHK
                </h2>
                <p className="text-gray-800 font-semibold">₹{f.price}</p>
                <p className="text-gray-600">{f.area} sqft • {f.furnished}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIEW MODAL */}
      {/* VIEW MODAL */}
{viewModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="backdrop-blur-xl bg-white/90 border border-purple-200 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-4 overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl font-bold text-purple-900">{viewModal.bhk} BHK Apartment</h2>

      {/* Main image */}
      <img
        src={`data:image/jpeg;base64,${viewModal.images[0]}`}
        className="w-full rounded-2xl shadow"
      />

      <div className="space-y-2 text-gray-800">
        <p><strong>Rent:</strong> ₹{viewModal.price}</p>
        <p><strong>Area:</strong> {viewModal.area} sqft</p>
        <p><strong>Furnished:</strong> {viewModal.furnished}</p>
        <p><strong>Description:</strong> {viewModal.description}</p>
        <p className="flex items-center gap-2">
          <FiMail /> {viewModal.ownerName}
        </p>
      </div>

      {/* Rented badge */}
      {viewModal.isRented && (
        <span className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold absolute mt-2 ml-2">
          Rented
        </span>
      )}

      {/* Admin - Mark Featured */}
      {user.role === "admin" && !viewModal.featured && (
        <button
          onClick={() => API.patch(`/flats/feature/${viewModal._id}`).then(loadFlats)}
          className="w-full mt-2 bg-yellow-500 text-black py-2 rounded-xl shadow hover:scale-105 transition-transform"
        >
          <FiStar className="inline-block mr-1" /> Mark Featured
        </button>
      )}

      {/* Mark Rented button */}
      {!viewModal.isRented && (user.role === "admin" || user.id === viewModal.ownerId) && (
        <button
          onClick={() => handleMarkRented(viewModal._id)}
          className="w-full mt-2 bg-green-600 text-white py-2 rounded-xl shadow hover:scale-105 transition-transform"
        >
          Mark as Rented
        </button>
      )}

      {/* Delete button */}
      {(user.role === "admin" || user.id === viewModal.ownerId) && (
        <button
          onClick={() => deleteFlat(viewModal._id)}
          className="w-full mt-2 bg-red-600 text-white py-2 rounded-xl flex justify-center gap-2 shadow hover:scale-105 transition-transform"
        >
          <FiTrash2 /> Delete
        </button>
      )}

      <button
        onClick={() => setViewModal(null)}
        className="w-full mt-2 bg-gray-400 text-white py-2 rounded-xl shadow hover:bg-gray-500 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
)}


      {/* ADD FLAT MODAL */}
      {addModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="backdrop-blur-xl bg-white/90 border border-purple-200 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <h2 className="text-2xl font-bold text-purple-900 mb-2">Add New Flat</h2>

            <div className="grid gap-3">
              <input
                type="number"
                placeholder="BHK"
                value={form.bhk}
                onChange={(e) => setForm({ ...form, bhk: e.target.value })}
                className="p-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-purple-600"
              />

              <input
                type="number"
                placeholder="Area (sqft)"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="p-3 border rounded-xl bg-white/80"
              />

              <input
                type="number"
                placeholder="Rent Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="p-3 border rounded-xl bg-white/80"
              />

              <input
                type="date"
                value={form.availableFrom}
                onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
                className="p-3 border rounded-xl bg-white/80"
              />

              <select
                value={form.furnished}
                onChange={(e) => setForm({ ...form, furnished: e.target.value })}
                className="p-3 border rounded-xl bg-white/80"
              >
                <option>Unfurnished</option>
                <option>Semi</option>
                <option>Fully</option>
              </select>

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="p-3 border rounded-xl bg-white/80"
              />

              <input
                type="text"
                placeholder="Contact Email/Phone"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="p-3 border rounded-xl bg-white/80"
              />

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files)}
                className="p-3 border rounded-xl bg-white/80"
              />
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setAddModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={submitFlat}
                disabled={uploading}
                className="px-6 py-2 bg-purple-700 hover:bg-purple-800 shadow-md text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Add Flat"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
