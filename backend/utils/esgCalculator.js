const scoreSection12 = require("./sections/section12Governance");
const scoreSection11 = require("./sections/section11Governance");
const scoreSection10 = require("./sections/section10Governance");
const scoreSection9 = require("./sections/section9Governance");

const scoreSection8 = require("./sections/section8Governance");
const scoreSection7 = require("./sections/section7Governance");
const scoreSection6 = require("./sections/section6Governance");
const scoreSection5 = require("./sections/section5Governance"); // 🔥 climate

const scoreSection4 = require("./sections/section4Governance");
const scoreSection3 = require("./sections/section3Governance");
const scoreSection2 = require("./sections/section2Governance");
const scoreSection1 = require("./sections/section1Governance");

// ESG weighting model
const SECTION_WEIGHTS = {
  section1: 0.08,
  section2: 0.08,
  section3: 0.15,
  section4: 0.08,
  section5: 0.25,
  section6: 0.06,
  section7: 0.06,
  section8: 0.08,
  section9: 0.06,
  section10: 0.04,
  section11: 0.04,
  section12: 0.08,
};

module.exports = function calculateESG(form) {
  const sections = {
    section1: scoreSection1(form.Section1),
    section2: scoreSection2(form.Section2),
    section3: scoreSection3(form.Section3),
    section4: scoreSection4(form.Section4),
    section5: scoreSection5(form.Section5),
    section6: scoreSection6(form.Section6),
    section7: scoreSection7(form.Section7),
    section8: scoreSection8(form.Section8),
    section9: scoreSection9(form.Section9),
    section10: scoreSection10(form.Section10),
    section11: scoreSection11(form.Section11),
    section12: scoreSection12(form.Section12),
  };

  let weightedSum = 0;
  let weightTotal = 0;

  for (const [key, result] of Object.entries(sections)) {
    if (result.notApplicable) continue;

    const weight = SECTION_WEIGHTS[key] || 0;
    weightedSum += result.score * weight;
    weightTotal += weight;
  }

  const totalScore =
    weightTotal > 0 ? weightedSum / weightTotal : 0;

  return {
    sections,
    totalScore: Math.round(totalScore),
    grade:
      totalScore >= 85
        ? "A"
        : totalScore >= 70
        ? "B"
        : totalScore >= 55
        ? "C"
        : "High Risk",
  };
};
