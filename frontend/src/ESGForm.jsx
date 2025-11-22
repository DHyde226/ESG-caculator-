import React, { useState } from "react";

const WEIGHTS = {
  environment: 0.25,
  social: 0.3,
  governance: 0.25,
  procurement: 0.2,
};

const ESGForm = () => {
  const [scores, setScores] = useState({
    // Environment
    energyConsumption: "",
    ghgEmissions: "",
    circularEconomy: "",
    pollutionManagement: "",
    biodiversity: "",

    // Social
    workerRightsSafety: "",
    dei: "",
    laborRightsSupplyChain: "",
    communityEngagement: "",
    consumerWelfarePrivacy: "",

    // Governance
    antiCorruption: "",
    boardDiversityOversight: "",
    execPayTransparency: "",
    dataProtection: "",
    lobbyingDisclosure: "",

    // Procurement
    supplierCodeConduct: "",
    supplierRiskAssessment: "",
    auditsMonitoring: "",
    sustainableSourcing: "",
    conflictMineralsTraceability: "",
  });

  const [result, setResult] = useState(null);

  // Handle input change (validate 0-100)
  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = Number(value);
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    setScores((prev) => ({ ...prev, [name]: val }));
  };

  // Calculate average of array elements (ignoring empty)
  const average = (arr) => {
    const filtered = arr.filter((v) => v !== "");
    if (filtered.length === 0) return 0;
    return filtered.reduce((a, b) => a + b, 0) / filtered.length;
  };

  // Calculate weighted ESG score
  const calculateScores = () => {
    const environmentAvg = average([
      scores.energyConsumption,
      scores.ghgEmissions,
      scores.circularEconomy,
      scores.pollutionManagement,
      scores.biodiversity,
    ]);

    const socialAvg = average([
      scores.workerRightsSafety,
      scores.dei,
      scores.laborRightsSupplyChain,
      scores.communityEngagement,
      scores.consumerWelfarePrivacy,
    ]);

    const governanceAvg = average([
      scores.antiCorruption,
      scores.boardDiversityOversight,
      scores.execPayTransparency,
      scores.dataProtection,
      scores.lobbyingDisclosure,
    ]);

    const procurementAvg = average([
      scores.supplierCodeConduct,
      scores.supplierRiskAssessment,
      scores.auditsMonitoring,
      scores.sustainableSourcing,
      scores.conflictMineralsTraceability,
    ]);

    const totalScore =
      environmentAvg * WEIGHTS.environment +
      socialAvg * WEIGHTS.social +
      governanceAvg * WEIGHTS.governance +
      procurementAvg * WEIGHTS.procurement;

    setResult({
      environmentAvg,
      socialAvg,
      governanceAvg,
      procurementAvg,
      totalScore,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateScores();
  };

  // Render input field with label and name
  const renderInput = (label, name) => (
    <div className="mb-3">
      <label className="block font-medium mb-1" htmlFor={name}>
        {label} (0–100)
      </label>
      <input
        type="number"
        id={name}
        name={name}
        min="0"
        max="100"
        step="1"
        value={scores[name]}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 w-full"
      />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">EU ESG Score Calculator</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <h2 className="text-xl font-semibold mb-4">🌱 Environment (25%)</h2>
          {renderInput("Energy Consumption", "energyConsumption")}
          {renderInput("GHG Emissions (Scope 1-3)", "ghgEmissions")}
          {renderInput("Circular Economy Practices", "circularEconomy")}
          {renderInput("Pollution Management", "pollutionManagement")}
          {renderInput("Biodiversity & Ecosystems", "biodiversity")}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 mt-8">👥 Social (30%)</h2>
          {renderInput("Worker Rights & Safety", "workerRightsSafety")}
          {renderInput("Diversity, Equity & Inclusion (DEI)", "dei")}
          {renderInput(
            "Labor Rights in Supply Chain",
            "laborRightsSupplyChain"
          )}
          {renderInput("Community Engagement", "communityEngagement")}
          {renderInput(
            "Consumer Welfare & Data Privacy",
            "consumerWelfarePrivacy"
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 mt-8">
            ⚖️ Governance (25%)
          </h2>
          {renderInput("Anti-Corruption & Ethics", "antiCorruption")}
          {renderInput(
            "Board Diversity & Oversight",
            "boardDiversityOversight"
          )}
          {renderInput("Executive Pay Transparency", "execPayTransparency")}
          {renderInput("Data Protection & Cybersecurity", "dataProtection")}
          {renderInput(
            "Lobbying & Political Activity Disclosure",
            "lobbyingDisclosure"
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 mt-8">
            🔗 Supply Chain & Procurement (20%)
          </h2>
          {renderInput("Supplier Code of Conduct", "supplierCodeConduct")}
          {renderInput("Supplier Risk Assessment", "supplierRiskAssessment")}
          {renderInput("Audits & Monitoring", "auditsMonitoring")}
          {renderInput("Sustainable Sourcing", "sustainableSourcing")}
          {renderInput(
            "Conflict Minerals & Traceability",
            "conflictMineralsTraceability"
          )}
        </section>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Calculate ESG Score
        </button>
      </form>

      {result && (
        <div className="mt-8 bg-gray-100 p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <p>
            <strong>Environment:</strong> {result.environmentAvg.toFixed(1)} /
            100
          </p>
          <p>
            <strong>Social:</strong> {result.socialAvg.toFixed(1)} / 100
          </p>
          <p>
            <strong>Governance:</strong> {result.governanceAvg.toFixed(1)} / 100
          </p>
          <p>
            <strong>Supply Chain & Procurement:</strong>{" "}
            {result.procurementAvg.toFixed(1)} / 100
          </p>
          <hr className="my-4" />
          <p className="text-xl font-semibold">
            <strong>Total ESG Score:</strong> {result.totalScore.toFixed(1)} /
            100
          </p>
        </div>
      )}
    </div>
  );
};

export default ESGForm;
