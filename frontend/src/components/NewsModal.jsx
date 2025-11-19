// src/components/NewsModal.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import socket from "../socket";

const NewsModal = ({ role, onClose }) => {
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await API.get("/news/all");
      // res.data may be { success: true, news: [...] } or earlier shape; handle both
      const arr = res.data.news || res.data;
      setNewsList(arr);
    } catch (err) {
      console.error("fetchNews", err);
    }
  };

  useEffect(() => {
    fetchNews();

    // listen to server events
    socket.on("newsCreated", fetchNews);
    socket.on("newsUpdated", fetchNews);
    socket.on("newsDeleted", fetchNews);

    return () => {
      socket.off("newsCreated", fetchNews);
      socket.off("newsUpdated", fetchNews);
      socket.off("newsDeleted", fetchNews);
    };
  }, []);

  const clearForm = () => {
    setTitle("");
    setMessage("");
    setEditingId(null);
  };

  const handlePublish = async () => {
    if (!title.trim() || !message.trim()) return alert("Fill title & message");
    setLoading(true);
    try {
      if (editingId) {
        await API.put(`/news/${editingId}`, { title, message });
      } else {
        await API.post("/news/publish", {
          title,
          message,
          createdBy: role || "admin",
        });
      }
      clearForm();
      await fetchNews();
      // socket will broadcast, but ensure immediate UI update also
    } catch (err) {
      console.error("publish error", err);
      alert(err.response?.data?.msg || "Error publishing news");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setTitle(item.title);
    setMessage(item.message);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this news?")) return;
    try {
      await API.delete(`/news/${id}`);
      await fetchNews();
    } catch (err) {
      console.error("delete news", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span>📢</span>
            Society News
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { clearForm(); onClose(); }}
              className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Admin publish/edit area */}
          {role === "admin" && (
            <div className="bg-gray-50 p-4 rounded-md border">
              <h4 className="font-semibold mb-2">
                {editingId ? "Edit News" : "Publish News"}
              </h4>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                rows={3}
                className="w-full p-2 border rounded mb-2"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  {editingId ? (loading ? "Saving..." : "Save") : (loading ? "Publishing..." : "Publish")}
                </button>

                {editingId && (
                  <button
                    onClick={() => clearForm()}
                    className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}

          {/* News list */}
          <div className="max-h-80 overflow-auto space-y-3">
            {newsList.length === 0 ? (
              <div className="text-center text-gray-500">No news available</div>
            ) : (
              newsList.map((n) => (
                <div key={n._id} className="p-4 border rounded-md bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-semibold text-gray-800">{n.title}</h5>
                      <p className="text-gray-700 mt-1 whitespace-pre-wrap">{n.message}</p>
                      <div className="text-xs text-gray-400 mt-2">
                        By {n.createdBy || "Admin"} • {new Date(n.createdAt).toLocaleString()}
                      </div>
                    </div>

                    {/* Admin actions */}
                    {role === "admin" && (
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <button
                          onClick={() => startEdit(n)}
                          className="text-sm px-3 py-1 rounded bg-yellow-100 text-yellow-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(n._id)}
                          className="text-sm px-3 py-1 rounded bg-red-100 text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
