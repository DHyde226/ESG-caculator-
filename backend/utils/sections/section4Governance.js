const clamp = require("../clamp");

module.exports = function scoreSection4(section) {
  const bio = section.biodiversityContext;

  let score = 0;

  /* ----------------------------------
     CASE 1: NOT near protected areas
  ----------------------------------- */
  if (!bio.nearProtectedAreas) {
    score += 40;

    if (bio.biodiversityManagementPlan) score += 20;
    if (bio.ecosystemServicesAssessment) score += 15;
    if (bio.restorationActions) score += 15;

    if (bio.biodiversityImpactLevel === "None" || bio.biodiversityImpactLevel === "Low") {
      score += 10;
    }
  }

  /* ----------------------------------
     CASE 2: NEAR protected areas
  ----------------------------------- */
  else {
    if (bio.biodiversityManagementPlan) score += 30;
    if (bio.ecosystemServicesAssessment) score += 25;
    if (bio.restorationActions) score += 20;

    if (bio.biodiversityImpactLevel === "Low") score += 15;
    else if (bio.biodiversityImpactLevel === "Medium") score += 5;
    else score += 0; // High impact → serious concern
  }

  return {
    score: clamp(score),
    maxScore: 100,
    breakdown: {
      nearProtectedAreas: bio.nearProtectedAreas,
      biodiversityManagementPlan: bio.biodiversityManagementPlan,
      ecosystemServicesAssessment: bio.ecosystemServicesAssessment,
      restorationActions: bio.restorationActions,
      biodiversityImpactLevel: bio.biodiversityImpactLevel,
    },
  };
};
