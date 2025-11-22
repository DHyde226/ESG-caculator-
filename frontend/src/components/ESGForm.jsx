import React, { useState } from "react";
import axios from "axios";

const ESGForm = ({ token, companyId, companyName }) => {
  const [formData, setFormData] = useState({
    company: "", // still optional here since backend uses token
    submissionDate: "", // YYYY-MM-DD string
    environment: {
      energyConsumption: 0,
      ghgEmissions: 0,
      circularEconomy: 0,
      pollutionManagement: 0,
      biodiversity: 0,
    },
    social: {
      workerRights: 0,
      dei: 0,
      supplyChainLabor: 0,
      communityEngagement: 0,
      consumerWelfare: 0,
    },
    governance: {
      antiCorruption: 0,
      boardDiversity: 0,
      execPayTransparency: 0,
      cybersecurity: 0,
      lobbyingDisclosure: 0,
    },
    supplyChain: {
      codeOfConduct: 0,
      riskAssessment: 0,
      audits: 0,
      sustainableSourcing: 0,
      conflictMinerals: 0,
    },
  });

  const handleChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: Number(value),
      },
    }));
  };

  // Special handler for the date input, since it's not inside nested objects
  const handleDateChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      submissionDate: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting ESG data:", formData);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/esg-score`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ ESG score submitted!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "❌ Failed to submit score.");
    }
  };

  return (
    <div>
      <h2>Submit ESG Data for {companyName || "Company"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Date input field */}
        <div style={{ marginBottom: "1em" }}>
          <label>
            Submission Date:{" "}
            <input
              type="date"
              value={formData.submissionDate}
              onChange={handleDateChange}
              required
            />
          </label>
        </div>

        {["environment", "social", "governance", "supplyChain"].map(
          (section) => (
            <fieldset key={section} style={{ marginBottom: "1em" }}>
              <legend>
                <strong>{section}</strong>
              </legend>
              {Object.entries(formData[section]).map(([field, value]) => (
                <div key={field}>
                  <label>
                    {field}:{" "}
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) =>
                        handleChange(section, field, e.target.value)
                      }
                      required
                    />
                  </label>
                </div>
              ))}
            </fieldset>
          )
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ESGForm;
