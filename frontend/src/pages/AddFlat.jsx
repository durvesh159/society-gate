import React, { useState } from "react";
import API from "../api/api";

const AddFlat = () => {
  const [form, setForm] = useState({
    bhk: 1,
    price: "",
    area: "",
    furnished: "Unfurnished",
    availableFrom: "",
    description: "",
  });
  const [images, setImages] = useState([]);

  const convertToBase64 = (files) => {
    // eslint-disable-next-line no-unused-vars
    const arr = [];
    [...files].forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => setImages((prev) => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
  };

  const submit = async () => {
    await API.post("/flats/add", { ...form, images });
    alert("Flat added!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Add Flat</h1>

      <input type="number" placeholder="BHK"
        onChange={(e) => setForm({ ...form, bhk: e.target.value })}
        className="input" />

      <input type="number" placeholder="Area (sqft)"
        onChange={(e) => setForm({ ...form, area: e.target.value })}
        className="input" />

      <input type="number" placeholder="Rent Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="input" />

      <input type="date"
        onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
        className="input" />

      <select
        onChange={(e) => setForm({ ...form, furnished: e.target.value })}
        className="input">
        <option>Unfurnished</option>
        <option>Semi</option>
        <option>Fully</option>
      </select>

      <textarea placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="input" />

      <input type="file" multiple accept="image/*"
        onChange={(e) => convertToBase64(e.target.files)}
        className="input" />

      <button onClick={submit} className="btn-primary mt-4">
        Add Flat
      </button>
    </div>
  );
};

export default AddFlat;
