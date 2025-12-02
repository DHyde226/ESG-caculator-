import React, { useEffect, useState } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    axios
      .delete(`${apiBase}/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setHistory((prev) => prev.filter((entry) => entry._id !== id));
      })
      .catch((err) => {
        alert(
          "Failed to delete entry: " +
            (err.response?.data?.message || err.message)
        );
      });
  };

  // ----------------------------
  // 📄 Generate PDF History File
  // ----------------------------
   const exportToExcel = async () => {
    if (!history.length) {
      alert("No history to export");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("ESG History");

    // Collect all keys from history entries (so every field/category is included)
    const keySet = new Set();
    history.forEach((entry) => {
      Object.keys(entry).forEach((key) => keySet.add(key));
    });

    // Filter out internal Mongo / system fields you don't care about
    const excludedKeys = new Set(["_id", "__v"]);
    const columns = Array.from(keySet).filter((k) => !excludedKeys.has(k));

    // Header row
    sheet.addRow(columns);

    // Data rows
    history.forEach((entry) => {
      const row = columns.map((key) => {
        const value = entry[key];

        if (value == null) return "";

        // Format dates nicely
        if (key === "submittedAt" || key === "createdAt" || key === "updatedAt") {
          try {
            return new Date(value).toLocaleString();
          } catch {
            return value;
          }
        }

        // If it's an object (e.g. nested), stringify it
        if (typeof value === "object") {
          return JSON.stringify(value);
        }

        return value;
      });

      sheet.addRow(row);
    });

    // Auto-size columns for readability
    sheet.columns.forEach((column) => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : "";
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = maxLength + 2;
    });

    // Generate Excel file buffer and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ESG_History.xlsx");
  };

  if (loading) return <p>Loading history...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>ESG Score History</h2>

      {/* NEW EXCEL BUTTON */}
      <button onClick={exportToExcel} style={{ marginBottom: "15px" }}>
        📊 Download Excel
      </button>

      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul>
          {history.map((entry) => (
            <li key={entry._id}>
              🧮 Score: {entry.totalScore} | 📅 Date:{" "}
              {new Date(entry.submittedAt || entry.createdAt).toLocaleString()}
              <button
                onClick={() => handleDelete(entry._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ESGHistory;