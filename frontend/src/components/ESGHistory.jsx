import React, { useEffect, useState } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import styles from "../styles/ESGHistory.module.css";

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
      { header: "Reporting Date", key: "submissionDate", width: 25 },
      { header: "Total Score", key: "totalScore", width: 15 },
      { header: "Grade", key: "grade", width: 15 },
      { header: "Total tCO₂e", key: "currentTotal_tCO2e", width: 20 },
      { header: "Full Results (JSON)", key: "results", width: 60 },
    ];

    history.forEach((entry) => {
      const totalEmissions = Number(
        entry.results?.sections?.section5?.breakdown?.totals
          ?.currentTotal_tCO2e
      );

      sheet.addRow({
        submissionDate: new Date(
          entry.submissionDate || entry.createdAt
        ).toLocaleDateString("en-CA"),
        totalScore: Number(entry?.results?.totalScore) || 0,
        grade: entry?.results?.grade || "N/A",
        currentTotal_tCO2e:
          Number.isNaN(totalEmissions) || totalEmissions === undefined
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

  if (loading) return <p className={styles.loading}>Loading history...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ESG Score History</h2>

      <button
        onClick={exportToExcel}
        className={styles.button}
        style={{ marginBottom: "15px" }}
      >
        Download Excel
      </button>

      {history.length === 0 ? (
        <p className={styles.empty}>No history yet.</p>
      ) : (
        <ul className={styles.list}>
          {history.map((entry) => {
            const totalEmissionsRaw =
              entry.results?.sections?.section5?.breakdown?.totals
                ?.currentTotal_tCO2e;

            const totalEmissions =
              totalEmissionsRaw === undefined || totalEmissionsRaw === null
                ? 0
                : Number(totalEmissionsRaw);

            return (
              <li key={entry._id} className={styles.item}>
                <span className={styles.label}>Score:</span>{" "}
                <span className={styles.value}>
                  {Number(entry?.results?.totalScore) || 0} (
                  <strong>{entry?.results?.grade || "N/A"}</strong>)
                </span>
                <br />

                <span className={styles.label}>Total tCO₂e:</span>{" "}
                <span className={styles.value}>{totalEmissions}</span>
                <br />

                <span className={styles.label}>Reporting Date:</span>{" "}
                <span className={styles.value}>
                  {new Date(
                    entry.submissionDate || entry.createdAt
                  ).toLocaleDateString("en-CA")}
                </span>

                <br />

                <button
                  onClick={() => handleDelete(entry._id)}
                  className={`${styles.button} ${styles.deleteButton}`}
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
