import React from "react";

const Documentation = () => (
  <div style={{ padding: "1rem", maxWidth: "900px", margin: "auto" }}>
    <h1>📄 ESG Scoring App: How to use and how we measure</h1>

    <h2>1. Introduction</h2>
    <p>
      ESG (Environmental, Social, Governance) refers to a set of standards used
      to measure a company’s impact on society and the environment, as well as
      how transparent and accountable it is.
    </p>
    <p>
      Measuring ESG matters for transparency, investor confidence, regulatory
      compliance, and long-term sustainability.
    </p>
    <p>
      This guide aligns with the EU ESG themes and sub-criteria to ensure
      consistency and auditability.
    </p>

    <h2>2. Detailed Scoring Guide</h2>

    <h3>🌱 Environment (25%)</h3>
    <ESGTable
      data={[
        {
          criterion: "Energy Consumption",
          score:
            "0 = No tracking; 50 = Internal monitoring; 75 = Reduction targets; 100 = Public disclosure + renewables plan",
          measure:
            "Review internal energy reports, sustainability reports, utility bills, renewable energy contracts",
        },
        {
          criterion: "GHG Emissions",
          score:
            "0 = No data; 50 = Scope 1 only; 75 = Scope 1+2 + partial 3; 100 = Full scope + CDP/GRI alignment",
          measure:
            "Carbon inventory, emissions reports, external disclosures, CDP submissions",
        },
        {
          criterion: "Circular Economy",
          score:
            "0 = No initiatives; 50 = Informal recycling; 75 = Reuse programs; 100 = Closed-loop KPIs",
          measure:
            "Internal waste management programs, material sourcing records, circularity KPIs",
        },
        {
          criterion: "Pollution Management",
          score:
            "0 = No policies; 50 = Waste sorting; 75 = Monitored controls; 100 = Certified controls (ISO 14001)",
          measure:
            "Environmental audits, waste logs, ISO certificates, spill reports",
        },
        {
          criterion: "Biodiversity & Ecosystems",
          score:
            "0 = Ignored; 50 = Risk review; 75 = Conservation actions; 100 = Biodiversity plans or partnerships",
          measure:
            "Environmental impact assessments, conservation project documentation",
        },
      ]}
    />

    <h3>👥 Social (30%)</h3>
    <ESGTable
      data={[
        {
          criterion: "Worker Rights & Safety",
          score:
            "0 = No controls; 50 = HR policies; 75 = Safety audits; 100 = Certifications (SA8000, ISO 45001)",
          measure: "Safety audits, injury reports, certifications, HR policies",
        },
        {
          criterion: "DEI",
          score:
            "0 = No strategy; 50 = Policy; 75 = Data tracking; 100 = KPIs + board involvement",
          measure: "HR diversity reports, training logs, board meeting minutes",
        },
        {
          criterion: "Labor Rights in Supply Chain",
          score:
            "0 = Not assessed; 50 = Code shared; 75 = Risk due diligence; 100 = Audits + grievance systems",
          measure: "Supplier codes, audit reports, due diligence documentation",
        },
        {
          criterion: "Community Engagement",
          score:
            "0 = None; 50 = Donations; 75 = Engagement strategy; 100 = Measured impact",
          measure: "CSR reports, donation records, impact assessments",
        },
        {
          criterion: "Consumer Welfare & Privacy",
          score:
            "0 = No protections; 50 = Privacy policy; 75 = GDPR program; 100 = Independent audits",
          measure: "Privacy policies, GDPR compliance reports, audit results",
        },
      ]}
    />

    <h3>⚖️ Governance (25%)</h3>
    <ESGTable
      data={[
        {
          criterion: "Anti-Corruption & Ethics",
          score:
            "0 = No code; 50 = Policy; 75 = Training; 100 = ISO 37001 + hotline",
          measure: "Ethics policy documents, training logs, certification",
        },
        {
          criterion: "Board Diversity & Oversight",
          score:
            "0 = No diversity; 50 = Some representation; 75 = Policy + mapping; 100 = >30% diverse + oversight",
          measure: "Board composition reports, diversity statements",
        },
        {
          criterion: "Executive Pay Transparency",
          score:
            "0 = No disclosure; 50 = Disclosed; 75 = ESG bonuses; 100 = Transparent & linked to ESG",
          measure: "Executive compensation reports, proxy statements",
        },
        {
          criterion: "Data Protection & Cybersecurity",
          score:
            "0 = No program; 50 = Policy; 75 = GDPR + DPO; 100 = Breach protocol + audits",
          measure: "Security policies, GDPR compliance, certifications",
        },
        {
          criterion: "Lobbying & Political Activity Disclosure",
          score:
            "0 = Hidden; 50 = Mention; 75 = Public policy listed; 100 = Full disclosure + ethical charter",
          measure: "Lobbying reports, ethical charters",
        },
      ]}
    />

    <h3>🔗 Supply Chain & Procurement (20%)</h3>
    <ESGTable
      data={[
        {
          criterion: "Supplier Code of Conduct",
          score:
            "0 = None; 50 = Shared; 75 = Mandatory; 100 = ESG clauses + tracking",
          measure: "Supplier contracts, audit reports",
        },
        {
          criterion: "Supplier Risk Assessment",
          score:
            "0 = None; 50 = Basic map; 75 = Ongoing reviews; 100 = Data-driven risk indices",
          measure: "Risk maps, review reports",
        },
        {
          criterion: "Audits & Monitoring",
          score:
            "0 = None; 50 = Self-assessments; 75 = Sample audits; 100 = Systematic audits + remediation",
          measure: "Audit reports, supplier scorecards",
        },
        {
          criterion: "Sustainable Sourcing",
          score:
            "0 = Cost only; 50 = Soft factor; 75 = Weighted criteria; 100 = Mandatory certification",
          measure: "Procurement policies, sourcing records",
        },
        {
          criterion: "Conflict Minerals & Traceability",
          score:
            "0 = None; 50 = Statement; 75 = Traceability system; 100 = Full tracking + disclosures",
          measure: "Traceability reports, certifications",
        },
      ]}
    />

    <h2>3. Final Notes</h2>
    <ul>
      <li>
        Use the <strong>History</strong> tab to review all your previous ESG
        score submissions after logging in.
      </li>
      <li>
        Submit new ESG scores through the ESG Form — each submission will
        automatically be saved to your history.
      </li>
      <li>
        To remove a score, simply press the <strong>Delete</strong> button next
        to the entry you wish to delete.
      </li>
      <li>
        Ensure that each score includes accurate data and documentation for
        transparency and audit readiness.
      </li>
    </ul>
  </div>
);

// Table component for reuse
const ESGTable = ({ data }) => (
  <table
    style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2rem" }}
  >
    <thead>
      <tr>
        <th style={thStyle}>Sub-Criterion</th>
        <th style={thStyle}>How to Score</th>
        <th style={thStyle}>How to Measure / Collect Data</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx}>
          <td style={tdStyle}>{row.criterion}</td>
          <td style={tdStyle}>{row.score}</td>
          <td style={tdStyle}>{row.measure}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f5f5f5",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  verticalAlign: "top",
};

export default Documentation;
