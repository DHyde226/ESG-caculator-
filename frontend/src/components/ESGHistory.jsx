import React, { useEffect, useState } from "react";
import axios from "axios";

const ESGHistory = ({ token }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

  useEffect(() => {
    if (!token) {
      setError("No auth token provided");
      setLoading(false);
      return;
    }

    fetchHistory();
  }, [token]);

  const fetchHistory = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`${apiBase}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!Array.isArray(res.data)) {
          setError("Invalid data format received (expected array)");
          setHistory([]);
        } else {
          setHistory(res.data);
          setError(null);
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch history");
        setHistory([]);
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) {
      return;
    }
    axios
      .delete(`${apiBase}/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Remove deleted entry from state to update UI instantly
        setHistory((prev) => prev.filter((entry) => entry._id !== id));
      })
      .catch((err) => {
        alert(
          "Failed to delete entry: " +
            (err.response?.data?.message || err.message)
        );
      });
  };

  if (loading) return <p>Loading history...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>ESG Score History</h2>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul>
          {history.map((entry) => (
            <li key={entry._id}>
              🧮 Score: {entry.totalScore} | 📅 Date:{" "}
              {new Date(entry.submittedAt || entry.createdAt).toLocaleString()}{" "}
              <button onClick={() => handleDelete(entry._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ESGHistory;
