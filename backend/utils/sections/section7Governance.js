const clamp = require("../clamp");

module.exports = function scoreSection7(section) {
  const {
    IndigineousPeoples,
    VulnerableGroups,
    Gender,
    Policies,
  } = section;

  let score = 0;

  /* ----------------------------------
     1️⃣ INDIGENOUS PEOPLES & FPIC (35)
  ----------------------------------- */

  if (!IndigineousPeoples.impactsIndigenousPeoples) {
    // Not applicable → no risk
    score += 35;
  } else {
    if (IndigineousPeoples.fpicApplied) {
      score += 35;
    } else {
      score += 0; // Serious failure
    }
  }

  /* ----------------------------------
     2️⃣ VULNERABLE GROUPS (20)
  ----------------------------------- */

  if (VulnerableGroups.vulnerableGroupsMeasures) {
    score += 20;
  }

  /* ----------------------------------
     3️⃣ GENDER EQUALITY (25)
  ----------------------------------- */

  if (Gender.genderActionPlan) score += 10;

  if (Gender.percentWomenWorkforce >= 40) score += 8;
  else if (Gender.percentWomenWorkforce >= 25) score += 4;

  if (Gender.percentWomenManagement >= 30) score += 7;
  else if (Gender.percentWomenManagement >= 15) score += 3;

  /* ----------------------------------
     4️⃣ NON-DISCRIMINATION & HARASSMENT (20)
  ----------------------------------- */

  if (Policies.nondiscriminationPolicy) score += 10;
  if (Policies.antiHarassmentPolicy) score += 10;

  return {
    score: clamp(score),
    maxScore: 100,
    breakdown: {
      indigenousPeoples: IndigineousPeoples,
      vulnerableGroups: VulnerableGroups,
      gender: Gender,
      policies: Policies,
    },
  };
};
