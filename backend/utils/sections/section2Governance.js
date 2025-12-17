const clamp = require("../clamp");

module.exports = function scoreSection2(section) {
  const {
    EngagmentPlanning,
    GrievenceMechanism,
    Discloser,
    EngagmentCloser,
  } = section;

  let score = 0;

  /* ----------------------------------
     1️⃣ ENGAGEMENT PLANNING (30)
  ----------------------------------- */

  if (EngagmentPlanning.stakeholderEngagementPlan) score += 15;

  if (EngagmentPlanning.numPublicMeetings >= 3) score += 15;
  else if (EngagmentPlanning.numPublicMeetings >= 1) score += 8;

  /* ----------------------------------
     2️⃣ GRIEVANCE MECHANISM (30)
  ----------------------------------- */

  if (GrievenceMechanism.grievanceMechanism) score += 10;
  if (GrievenceMechanism.grievancePublicAccess) score += 10;

  if (GrievenceMechanism.grievancesResolvedPercent >= 75) score += 10;
  else if (GrievenceMechanism.grievancesResolvedPercent >= 50) score += 5;

  /* ----------------------------------
     3️⃣ DISCLOSURE (20)
  ----------------------------------- */

  if (Discloser.projectInformationDisclosed) score += 20;

  /* ----------------------------------
     4️⃣ ENGAGEMENT COVERAGE (20)
  ----------------------------------- */

  switch (EngagmentCloser.engagementCoverage) {
    case "All projects":
      score += 20;
      break;
    case "Most projects":
      score += 15;
      break;
    case "Limited projects":
      score += 5;
      break;
    default:
      score += 0;
  }

  return {
    score: clamp(score),
    maxScore: 100,
    breakdown: {
      engagementPlan: EngagmentPlanning,
      grievance: GrievenceMechanism,
      disclosure: Discloser,
      coverage: EngagmentCloser.engagementCoverage,
    },
  };
};
