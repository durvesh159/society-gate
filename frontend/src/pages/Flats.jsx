import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

const Flats = () => {
  const { user } = useContext(AuthContext);
  const [flats, setFlats] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    API.get("/flats").then((res) => setFlats(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Flats for Rent</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {flats.map((f) => (
          <div key={f._id}
            className="bg-white rounded-xl p-4 shadow hover:shadow-xl transition">
            
            {f.featured && (
              <div className="bg-yellow-500 text-black px-3 py-1 rounded w-max mb-2">
                ★ Featured
              </div>
            )}

            <img src={f.images[0]} className="h-40 w-full object-cover rounded-lg" />

            <h2 className="text-xl font-bold mt-2">{f.bhk} BHK • ₹{f.price}</h2>
            <p className="text-gray-600">{f.area} sqft • {f.furnished}</p>

            <button
              onClick={() => setModal(f)}
              className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg">
              View Details
            </button>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-5 rounded-xl w-96">
            <h2 className="text-2xl font-bold">{modal.bhk} BHK</h2>
            <img src={modal.images[0]} className="w-full rounded mt-3" />
            <p className="mt-2 text-gray-800">Rent: ₹{modal.price}</p>
            <p className="text-gray-600">{modal.description}</p>

            {user.role === "admin" && !modal.featured && (
              <button
                onClick={() => API.put(`/flats/featured/${modal._id}`).then(() => window.location.reload())}
                className="mt-3 bg-yellow-500 px-3 py-1 rounded">
                Mark Featured
              </button>
            )}

            {!modal.isRented && (user.role === "admin" || user.id === modal.ownerId) && (
              <button
                onClick={() => API.put(`/flats/rented/${modal._id}`).then(() => window.location.reload())}
                className="mt-3 bg-green-600 text-white px-3 py-1 rounded ml-2">
                Mark as Rented
              </button>
            )}

            <button
              onClick={() => setModal(null)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded ml-2">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flats;
