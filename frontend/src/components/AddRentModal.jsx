/* eslint-disable no-unused-vars */
// src/components/AddRentModal.jsx
import React, { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

export default function AddRentModal({ onClose, prefill }) {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    deposit: "",
    area: "",
    bhk: "",
    furnished: "Unfurnished",
    availableFrom: "",
    ownerMobile: user?.role === "resident" ? "" : ""
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    setImages(Array.from(e.target.files).slice(0,5));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => { if (v !== "") fd.append(k, v); });
      images.forEach(img => fd.append("images", img));
      const res = await API.post("/rent", fd, { headers: { "Content-Type": "multipart/form-data" }});
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error posting");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/80 border border-purple-200 rounded-2xl w-full max-w-2xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-700">✖</button>
        <h3 className="text-xl font-semibold text-purple-900 mb-3">Post Flat for Rent</h3>

        <form className="grid grid-cols-1 gap-3" onSubmit={submit}>
          <input required placeholder="Title (e.g., A-101 2BHK Furnished)" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="p-2 border rounded" />
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="p-2 border rounded" rows={3} />
          <div className="flex gap-2">
            <input required type="number" placeholder="Price/month" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} className="p-2 border rounded w-1/2" />
            <input type="number" placeholder="Deposit" value={form.deposit} onChange={e=>setForm({...form, deposit:e.target.value})} className="p-2 border rounded w-1/2" />
          </div>
          <div className="flex gap-2">
            <input type="number" placeholder="Area (sqft)" value={form.area} onChange={e=>setForm({...form, area:e.target.value})} className="p-2 border rounded w-1/2" />
            <input type="number" placeholder="BHK" value={form.bhk} onChange={e=>setForm({...form, bhk:e.target.value})} className="p-2 border rounded w-1/2" />
          </div>
          <select value={form.furnished} onChange={e=>setForm({...form, furnished:e.target.value})} className="p-2 border rounded">
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Furnished">Furnished</option>
          </select>
          <input type="date" value={form.availableFrom} onChange={e=>setForm({...form, availableFrom:e.target.value})} className="p-2 border rounded" />
          <input placeholder="Contact mobile" value={form.ownerMobile} onChange={e=>setForm({...form, ownerMobile:e.target.value})} className="p-2 border rounded" />
          <input type="file" accept="image/*" multiple onChange={handleFile} className="p-2" />
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded">{loading ? "Posting..." : "Post"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
