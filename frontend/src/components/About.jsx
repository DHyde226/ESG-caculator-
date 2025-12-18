import React from "react";

const About = () => (
  <div style={{ padding: "1rem", maxWidth: "900px", margin: "auto" }}>
    <h1>About the ESG Scoring Application</h1>

    <h2>1. Mission Statement</h2>
    <p>
      Our mission is to provide organizations with a transparent, reliable, and
      accessible platform for assessing their Environmental, Social, and
      Governance (ESG) performance. We align our scoring methodology with
      internationally recognized sustainability frameworks to support
      accountability, investor confidence, and long-term operational resilience.
    </p>

    <h2>2. The Problem We Solve</h2>
    <p>
      As ESG reporting becomes an integral part of global regulatory and
      investor expectations, organizations face several challenges:
    </p>

    <ul>
      <li>
        <strong>Fragmented or inconsistent ESG data</strong> spread across internal
        documents and spreadsheets.
      </li>
      <li>
        <strong>Rapidly evolving regulations</strong> such as CSRD, EU Taxonomy,
        and international disclosure frameworks.
      </li>
      <li>
        <strong>Lack of accessible tooling</strong> for smaller or developing
        organizations seeking structured ESG evaluations.
      </li>
    </ul>

    <p>
      The ESG Scoring App addresses these challenges by providing a structured,
      consistent scoring system supported by secure user authentication and
      historical tracking.
    </p>

    <h2>3. Standards, Methodology & Documentation Basis</h2>
    <p>
      Our ESG scoring methodology is built on internationally accepted
      sustainability guidance to ensure reliability, comparability, and audit
      readiness.
    </p>

    <h3>Greenhouse Gas Protocol (GHG Protocol)</h3>
    <p>
      The calculator incorporates emissions measurement principles from the
      GHG Protocol, including:
    </p>
    <ul>
      <li>Scope 1, Scope 2, and Scope 3 emissions categorization</li>
      <li>Standardized carbon accounting methods</li>
      <li>
        Quantitative uncertainty guidance to support data accuracy and reliability
      </li>
    </ul>
    <p>
      This ensures alignment with globally recognized practices widely used
      across both private and public sectors.
    </p>

    <h3>European Investment Bank (EIB) Standards</h3>
    <p>
      Our scoring framework also integrates the structure and expectations set
      by the European Investment Bank’s Environmental and Social Standards.
    </p>
    <p>
      Specifically, we reference the <strong>11 EIB Environmental and Social
      Standards</strong>, which outline comprehensive requirements for risk
      management, monitoring, and sustainability performance across all EIB-funded
      projects.
    </p>

    <ul>
      <li>Standard 1 — Assessment and Management of Impacts and Risks</li>
      <li>Standard 2 — Pollution Prevention and Mitigation</li>
      <li>Standard 3 — Biodiversity and Ecosystems</li>
      <li>Standard 4 — Climate-Related Standards</li>
      <li>Standard 5 — Resource Efficiency and Circular Economy</li>
      <li>Standard 6 — Involuntary Resettlement</li>
      <li>Standard 7 — Rights and Interests of Vulnerable Groups</li>
      <li>Standard 8 — Labour Standards</li>
      <li>Standard 9 — Public Health, Safety, and Security</li>
      <li>Standard 10 — Stakeholder Engagement</li>
      <li>Standard 11 — Intermediated Finance</li>
    </ul>

    <p>
      These standards provide a structured foundation for evaluating
      environmental and social performance. Incorporating them ensures that our
      scoring model reflects credible EU-aligned sustainability expectations,
      especially regarding impact management, pollution control, biodiversity,
      and climate responsibility.
    </p>

    <h3>Additional Documentation Sources</h3>
    <ul>
      <li>EU Taxonomy for Sustainable Activities</li>
      <li>CSRD (Corporate Sustainability Reporting Directive)</li>
      <li>GRI (Global Reporting Initiative) indicators</li>
      <li>Industry best practices for ESG data traceability and disclosure</li>
    </ul>

    <h2>4. Technical Architecture</h2>
    <p>
      The platform is built using modern full-stack engineering practices to
      ensure scalability, security, and audit-ready performance.
    </p>

    <h3>Frontend — React</h3>
    <ul>
      <li>Responsive and modular components for intuitive ESG data entry.</li>
      <li>Axios used for communicating with secured backend endpoints via JWT.</li>
      <li>User dashboard, ESG forms, data tables, and documentation views.</li>
    </ul>

    <h3>Backend — Express.js</h3>
    <ul>
      <li>
        Node.js + Express architecture featuring controllers, middleware, 
        validation, and utility layers.
      </li>
      <li>Handles ESG scoring calculations and data management logic.</li>
      <li>Designed for long-term scalability as ESG standards evolve.</li>
    </ul>

    <h3>Database — MongoDB (Mongoose)</h3>
    <ul>
      <li>Stores user accounts, ESG submissions, and historical scoring data.</li>
      <li>Mongoose schemas ensure data consistency and validation.</li>
    </ul>

    <h3>Security — JWT Authentication</h3>
    <ul>
      <li>All protected routes require token-based authentication.</li>
      <li>Stateless design compatible with containerized deployments.</li>
    </ul>

    <h3>Docker-Based Infrastructure</h3>
    <ul>
      <li>Three-container architecture: frontend, backend, and MongoDB.</li>
      <li>
        Docker Compose orchestrates all services into a unified environment.
      </li>
    </ul>
        <h2>Download ESG Documentation</h2>
    <p>You can download the full ESG documentation below:</p>

    <ul>
      <li>
        <a 
          href="/ESG_documentation_English.pdf"
          download 
          style={{ color: "#007bff", textDecoration: "underline" }}
        >
          Download ESG Documentation (English)
        </a>
      </li>
      <li>
        <a 
          href="/ESG_documentation_Croatian.pdf"
          download 
          style={{ color: "#007bff", textDecoration: "underline" }}
        >
          Download ESG Documentation (Croatian)
        </a>
      </li>
    </ul>

  </div>
);

export default About;
