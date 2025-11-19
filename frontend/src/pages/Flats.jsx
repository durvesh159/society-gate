// import React, { useEffect, useState, useContext } from "react";
// import API from "../api/api";
// import { AuthContext } from "../contexts/AuthContext";

// const Flats = () => {
//   const { user } = useContext(AuthContext);
//   const [flats, setFlats] = useState([]);
//   const [modal, setModal] = useState(null);

//   useEffect(() => {
//     API.get("/flats").then((res) => setFlats(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Flats for Rent</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//         {flats.map((f) => (
//           <div key={f._id}
//             className="bg-white rounded-xl p-4 shadow hover:shadow-xl transition">
            
//             {f.featured && (
//               <div className="bg-yellow-500 text-black px-3 py-1 rounded w-max mb-2">
//                 ★ Featured
//               </div>
//             )}

//             <img src={f.images[0]} className="h-40 w-full object-cover rounded-lg" />

//             <h2 className="text-xl font-bold mt-2">{f.bhk} BHK • ₹{f.price}</h2>
//             <p className="text-gray-600">{f.area} sqft • {f.furnished}</p>

//             <button
//               onClick={() => setModal(f)}
//               className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg">
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>

//       {modal && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
//           <div className="bg-white p-5 rounded-xl w-96">
//             <h2 className="text-2xl font-bold">{modal.bhk} BHK</h2>
//             <img src={modal.images[0]} className="w-full rounded mt-3" />
//             <p className="mt-2 text-gray-800">Rent: ₹{modal.price}</p>
//             <p className="text-gray-600">{modal.description}</p>

//             {user.role === "admin" && !modal.featured && (
//               <button
//                 onClick={() => API.put(`/flats/featured/${modal._id}`).then(() => window.location.reload())}
//                 className="mt-3 bg-yellow-500 px-3 py-1 rounded">
//                 Mark Featured
//               </button>
//             )}

//             {!modal.isRented && (user.role === "admin" || user.id === modal.ownerId) && (
//               <button
//                 onClick={() => API.put(`/flats/rented/${modal._id}`).then(() => window.location.reload())}
//                 className="mt-3 bg-green-600 text-white px-3 py-1 rounded ml-2">
//                 Mark as Rented
//               </button>
//             )}

//             <button
//               onClick={() => setModal(null)}
//               className="mt-3 bg-red-500 text-white px-3 py-1 rounded ml-2">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Flats;


import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

const Flats = () => {
  const { user } = useContext(AuthContext);

  const [flats, setFlats] = useState([]);
  const [viewModal, setViewModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    bhk: 1,
    area: "",
    price: "",
    furnished: "Unfurnished",
    availableFrom: "",
    description: "",
  });

  // FETCH FLATS
  const loadFlats = () => {
    API.get("/flats").then((res) => setFlats(res.data));
  };

  useEffect(() => {
    loadFlats();
  }, []);

  // IMAGE → BASE64
  const convertToBase64 = (files) => {
    [...files].forEach((file) => {
      const r = new FileReader();
      r.onloadend = () => setImages((prev) => [...prev, r.result]);
      r.readAsDataURL(file);
    });
  };

  // ADD FLAT
  const submitFlat = async () => {
    await API.post("/flats/add", { ...form, images });
    setAddModal(false);
    setForm({
      bhk: 1,
      area: "",
      price: "",
      furnished: "Unfurnished",
      availableFrom: "",
      description: "",
    });
    setImages([]);
    loadFlats();
  };

  // DELETE FLAT
  const deleteFlat = async (id) => {
    await API.delete(`/flats/${id}`);
    setViewModal(null);
    loadFlats();
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Flats for Rent</h1>

        {(user.role === "admin" || user.role === "resident") && (
          <button
            onClick={() => setAddModal(true)}
            className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-xl shadow-md transition">
            + Add Flat
          </button>
        )}
      </div>

      {/* GRID OF MODERN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {flats.map((f) => (
          <div
            key={f._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-4 relative">

            {f.featured && (
              <span className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded-lg font-semibold">
                ★ Featured
              </span>
            )}

            <img
              src={f.images[0]}
              className="h-44 w-full object-cover rounded-xl"
            />

            <div className="mt-3">
              <h2 className="text-xl font-bold">{f.bhk} BHK</h2>
              <p className="text-gray-700 font-semibold">₹{f.price}</p>
              <p className="text-gray-600">
                {f.area} sqft • {f.furnished}
              </p>
            </div>

            <button
              onClick={() => setViewModal(f)}
              className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg shadow hover:bg-purple-700">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* VIEW MODAL */}
      {viewModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">

            <h2 className="text-2xl font-bold">{viewModal.bhk} BHK</h2>
            <img
              src={viewModal.images[0]}
              className="w-full rounded-xl mt-3"
            />

            <p className="mt-2 text-gray-800">Rent: ₹{viewModal.price}</p>
            <p className="text-gray-600">{viewModal.description}</p>

            {/* FEATURED */}
            {user.role === "admin" && !viewModal.featured && (
              <button
                onClick={() =>
                  API.patch(`/flats/feature/${viewModal._id}`).then(loadFlats)
                }
                className="mt-3 bg-yellow-500 text-black px-3 py-2 rounded-lg w-full">
                Mark Featured
              </button>
            )}

            {/* MARK RENTED */}
            {!viewModal.isRented &&
              (user.role === "admin" ||
                user.id === viewModal.ownerId) && (
                <button
                  onClick={() =>
                    API.patch(`/flats/rented/${viewModal._id}`).then(loadFlats)
                  }
                  className="mt-3 bg-green-600 text-white px-3 py-2 rounded-lg w-full">
                  Mark as Rented
                </button>
              )}

            {/* DELETE FLAT */}
            {(user.role === "admin" ||
              user.id === viewModal.ownerId) && (
              <button
                onClick={() => deleteFlat(viewModal._id)}
                className="mt-3 bg-red-600 text-white px-3 py-2 rounded-lg w-full">
                Delete Flat
              </button>
            )}

            <button
              onClick={() => setViewModal(null)}
              className="mt-3 bg-gray-400 text-white px-3 py-2 rounded-lg w-full">
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD FLAT MODAL */}
      {addModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">

            <h2 className="text-2xl font-bold mb-3">Add Flat</h2>

            <input
              type="number"
              placeholder="BHK"
              onChange={(e) => setForm({ ...form, bhk: e.target.value })}
              className="input-modern"
            />

            <input
              type="number"
              placeholder="Area (sqft)"
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              className="input-modern"
            />

            <input
              type="number"
              placeholder="Rent Price"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="input-modern"
            />

            <input
              type="date"
              onChange={(e) =>
                setForm({ ...form, availableFrom: e.target.value })
              }
              className="input-modern"
            />

            <select
              onChange={(e) => setForm({ ...form, furnished: e.target.value })}
              className="input-modern">
              <option>Unfurnished</option>
              <option>Semi</option>
              <option>Fully</option>
            </select>

            <textarea
              placeholder="Description"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="input-modern"
            />

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => convertToBase64(e.target.files)}
              className="input-modern"
            />

            <button
              onClick={submitFlat}
              className="w-full bg-purple-700 text-white py-2 rounded-lg mt-3 shadow hover:bg-purple-800">
              Add Flat
            </button>

            <button
              onClick={() => setAddModal(false)}
              className="w-full bg-gray-400 text-white py-2 rounded-lg mt-2">
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Flats;
