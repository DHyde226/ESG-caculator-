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
          setError("Invalid data format received");
          setHistory([]);
        } else {
          setHistory(res.data);
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
  // 📊 EXPORT TO EXCEL
  // ----------------------------
  const exportToExcel = async () => {
    if (!history.length) {
      alert("No history to export");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("ESG History");

    sheet.columns = [
      { header: "Submission Date", key: "submissionDate", width: 25 },
      { header: "Total Score", key: "totalScore", width: 15 },
      { header: "Grade", key: "grade", width: 15 },
      { header: "Total tCO₂e", key: "currentTotal_tCO2e", width: 20 },
      { header: "Full Results (JSON)", key: "results", width: 60 },
    ];

    history.forEach((entry) => {
      const totalEmissions = Number(
        entry.results?.sections?.section5?.breakdown?.totals?.currentTotal_tCO2e

      );

      sheet.addRow({
        submissionDate: new Date(
          entry.submissionDate || entry.createdAt
        ).toLocaleString(),
        totalScore: Number(entry?.results?.totalScore) || 0,
        grade: entry?.results?.grade || "N/A",
        currentTotal_tCO2e:
          totalEmissions === undefined || Number.isNaN(totalEmissions)
            ? 0
            : totalEmissions,
        results: JSON.stringify(entry.results),
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "ESG_History.xlsx");
  };

  if (loading) return <p>Loading history...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>ESG Score History</h2>

      <button onClick={exportToExcel} style={{ marginBottom: "15px" }}>
        📊 Download Excel
      </button>

      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul>
          {history.map((entry) => {
            const totalEmissionsRaw =
              entry.results?.sections?.section5?.breakdown?.totals?.currentTotal_tCO2e


            const totalEmissions =
              totalEmissionsRaw === undefined || totalEmissionsRaw === null
                ? 0
                : Number(totalEmissionsRaw);

            return (
              <li key={entry._id} style={{ marginBottom: "10px" }}>
                🧮 <strong>Score:</strong>{" "}
                {Number(entry?.results?.totalScore) || 0} (
                <strong>{entry?.results?.grade || "N/A"}</strong>)
                <br />
                🌍 <strong>Total tCO₂e:</strong> {totalEmissions}
                <br />
                📅{" "}
                {new Date(
                  entry.submissionDate || entry.createdAt
                ).toLocaleString()}
                <br />
                <button
                  onClick={() => handleDelete(entry._id)}
                  style={{ marginTop: "5px" }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ESGHistory;
