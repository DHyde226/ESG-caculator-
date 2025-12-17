const clamp = require("../clamp");

module.exports = function scoreSection8(section) {
  const {
    LabourRights,
    OccupationalHealth,
    WorkerGrievence,
    SupplyChainLabour,
  } = section;

  let score = 0;

  /* -------------------------------
     1️⃣ LABOUR RIGHTS (25)
  -------------------------------- */

  if (LabourRights.collectiveBargargingCoveragePercent >= 50) score += 10;
  if (LabourRights.childLabourPolicy) score += 8;
  if (LabourRights.forcedLabourPolicy) score += 7;

  /* -------------------------------
     2️⃣ OCCUPATIONAL HEALTH & SAFETY (35)
  -------------------------------- */

  if (OccupationalHealth.ohsPolicy) score += 10;

  if (OccupationalHealth.lostTimeInjuryRate <= 1) score += 10;
  else if (OccupationalHealth.lostTimeInjuryRate <= 3) score += 5;

  if (OccupationalHealth.fatalities === 0) score += 10;

  if (OccupationalHealth.trainingHoursPerEmployee >= 20) score += 5;

  /* -------------------------------
     3️⃣ WORKER GRIEVANCE (20)
  -------------------------------- */

  if (WorkerGrievence.workerGrievanceMechanism) score += 10;

  if (WorkerGrievence.workerResolutionRatePercent >= 75) score += 10;
  else if (WorkerGrievence.workerResolutionRatePercent >= 50) score += 5;

  /* -------------------------------
     4️⃣ SUPPLY CHAIN LABOUR (20)
  -------------------------------- */

  if (SupplyChainLabour.supplyChainRiskAssessment) score += 5;

  if (SupplyChainLabour.suppliersScreenedPercent >= 60) score += 10;
  else if (SupplyChainLabour.suppliersScreenedPercent >= 30) score += 5;

  if (SupplyChainLabour.suppliersFollowESG) score += 5;

  return {
    score: clamp(score),
    maxScore: 100,
    breakdown: {
      labourRights: LabourRights,
      ohs: OccupationalHealth,
      grievance: WorkerGrievence,
      supplyChain: SupplyChainLabour,
    },
  };
};
