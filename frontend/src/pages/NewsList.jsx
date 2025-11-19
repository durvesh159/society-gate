import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

const NewsList = () => {
  const { user } = useContext(AuthContext);
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const res = await API.get("/news");
    setNews(res.data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Latest News</h2>

      {user.role === "admin" && (
        <a
          href="/news/add"
          className="bg-green-600 text-white px-3 py-2 rounded-md mb-4 inline-block"
        >
          + Publish News
        </a>
      )}

      <div className="space-y-4">
        {news.map((n) => (
          <div key={n._id} className="bg-white p-4 shadow rounded-md border">
            <h3 className="text-lg font-bold">{n.title}</h3>
            <p className="text-gray-700 mt-1">{n.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
