const clamp = require("../clamp");

module.exports = function scoreSection11(section) {
  const finance = section.finance;

  // 🔹 If NOT a financial institution → neutral score
  if (!finance.isFinancialInstitution) {
    return {
      score: 100,
      maxScore: 100,
      notApplicable: true,
      breakdown: {
        reason: "Company is not a financial institution",
      },
    };
  }

  let score = 0;

  // ─────────────────────────────
  // 1️⃣ ESG SCREENING (35 pts)
  // ─────────────────────────────
  if (finance.portfolioESGScreenedPercent >= 80) score += 35;
  else if (finance.portfolioESGScreenedPercent >= 60) score += 25;
  else if (finance.portfolioESGScreenedPercent >= 40) score += 15;
  else if (finance.portfolioESGScreenedPercent >= 20) score += 5;

  // ─────────────────────────────
  // 2️⃣ CLIMATE RISK EXPOSURE (25 pts)
  // Lower % exposed = better
  // ─────────────────────────────
  if (finance.portfolioHighClimateRiskPercent <= 10) score += 25;
  else if (finance.portfolioHighClimateRiskPercent <= 25) score += 18;
  else if (finance.portfolioHighClimateRiskPercent <= 40) score += 10;
  else if (finance.portfolioHighClimateRiskPercent <= 60) score += 5;

  // ─────────────────────────────
  // 3️⃣ FINANCED EMISSIONS (20 pts)
  // ─────────────────────────────
  if (finance.reportsFinancedEmissions) score += 20;

  // ─────────────────────────────
  // 4️⃣ EXCLUSION LISTS (20 pts)
  // ─────────────────────────────
  if (finance.exclusionList) score += 20;

  return {
    score: clamp(score),
    maxScore: 100,
    breakdown: {
      esgScreening: finance.portfolioESGScreenedPercent,
      climateRisk: finance.portfolioHighClimateRiskPercent,
      financedEmissionsReported: finance.reportsFinancedEmissions,
      exclusionList: finance.exclusionList,
    },
  };
};
