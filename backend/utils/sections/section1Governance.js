const clamp = require("../clamp");

module.exports = function scoreSection1(section) {
  const {
    ImpactAssessments,
    HumanRightsDillagence,
    ManagementSystems,
    ProjectScreening,
    esgRisk,
    Monitoring,
  } = section;

  let score = 0;

  /* ----------------------------------
     1️⃣ IMPACT ASSESSMENTS (30)
  ----------------------------------- */

  if (ImpactAssessments.eiaConducted) score += 10;
  if (ImpactAssessments.socialImpactAssessment) score += 10;

  if (!ImpactAssessments.requiresSEA) {
    score += 10; // Not required → no risk
  } else if (ImpactAssessments.seaCompleted) {
    score += 10;
  } // else: SEA required but not completed → 0

  /* ----------------------------------
     2️⃣ HUMAN RIGHTS DUE DILIGENCE (20)
  ----------------------------------- */

  if (HumanRightsDillagence.HumanRightsSCreaningConducted) score += 10;

  if (!HumanRightsDillagence.hriaRequired) {
    score += 10;
  } else if (HumanRightsDillagence.hriaCompleted) {
    score += 10;
  }

  /* ----------------------------------
     3️⃣ MANAGEMENT SYSTEMS (25)
  ----------------------------------- */

  if (ManagementSystems.esmsInPlace) score += 10;
  if (ManagementSystems.esgPolicy) score += 10;
  if (ManagementSystems.contractorsFollowESG) score += 5;

  /* ----------------------------------
     4️⃣ PROJECT SCREENING (15)
  ----------------------------------- */

  if (
    ProjectScreening.numProjectsRequiringEIA_NotCompleted === 0 &&
    ProjectScreening.numProjectsWithEIA > 0
  ) {
    score += 15;
  } else if (ProjectScreening.numProjectsRequiringEIA_NotCompleted <= 1) {
    score += 7;
  }
  // else: weak screening → 0

  /* ----------------------------------
     5️⃣ ESG RISK MONITORING (10)
  ----------------------------------- */

  if (esgRisk.ComapnayMainatainesgRisk) score += 5;

  switch (Monitoring.monitoringFrequency) {
    case "Quarterly":
      score += 5;
      break;
    case "Semi-annual":
      score += 3;
      break;
    case "Annual":
      score += 2;
      break;
    default:
      score += 0;
  }

  return {
    score: clamp(score),
    maxScore: 100,
    breakdown: {
      impactAssessments: ImpactAssessments,
      humanRights: HumanRightsDillagence,
      managementSystems: ManagementSystems,
      projectScreening: ProjectScreening,
      riskMonitoring: {
        esgRiskRegister: esgRisk.ComapnayMainatainesgRisk,
        frequency: Monitoring.monitoringFrequency,
      },
    },
  };
};
