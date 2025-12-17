const clamp = require("../clamp");

module.exports = function scoreSection6(section) {
  const resettlement = section.InvolenteryReasettlement;

  // 🔹 Not applicable → no risk
  if (!resettlement.requiresLandAcquisition) {
    return {
      score: 100,
      maxScore: 100,
      notApplicable: true,
      breakdown: {
        reason: "No land acquisition required",
      },
    };
  }

  let score = 0;

  /* ----------------------------------
     LAND ACQUISITION SAFEGUARDS
  ----------------------------------- */

  if (resettlement.resettlementPlan) {
    score += 40;
  } else {
    // Missing RAP = severe failure
    score += 0;
  }

  if (resettlement.compensationAlignedWithLaw) {
    score += 30;
  }

  if (resettlement.resettlementConsultations) {
    score += 30;
  }

  return {
    score: clamp(score),
    maxScore: 100,
    breakdown: {
      requiresLandAcquisition: resettlement.requiresLandAcquisition,
      resettlementPlan: resettlement.resettlementPlan,
      compensationAlignedWithLaw: resettlement.compensationAlignedWithLaw,
      resettlementConsultations: resettlement.resettlementConsultations,
    },
  };
};
