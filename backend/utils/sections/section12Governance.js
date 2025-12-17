const clamp = require("../clamp");

module.exports = function scoreSection12(section) {
  let score = 0;

  // Board & oversight (40)
  if (section.Governance.percentIndependentBoard >= 50) score += 20;
  if (section.Governance.esgBoardCommittee) score += 20;

  // Ethics & compliance (30)
  if (section.Policies.antiCorruptionPolicy) score += 15;
  if (section.Policies.whistleblowerMechanism) score += 10;
  if (section.Policies.whistleblowerReports > 0) score += 5;

  // Cybersecurity (30)
  if (section.CyberSecurity.gdprCompliance) score += 10;
  if (section.CyberSecurity.cybersecurityPolicy) score += 10;
  if (section.CyberSecurity.dataBreachResponsePlan) score += 10;

  score -= Math.min(section.CyberSecurity.cybersecurityIncidents * 5, 20);

  return {
    score: clamp(score),
    maxScore: 100,
    breakdown: {
      governance: section.Governance,
      ethics: section.Policies,
      cyber: section.CyberSecurity,
    },
  };
};
