import React, { useState } from "react";
import API from "../../api/api";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const submitNews = async (e) => {
    e.preventDefault();
    await API.post("/news", { title, message });
    alert("News published!");
    window.location.href = "/news";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Publish News</h2>

      <form className="space-y-4" onSubmit={submitNews}>
        <input
          type="text"
          placeholder="News title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="News Description"
          className="w-full p-2 border rounded h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddNews;
