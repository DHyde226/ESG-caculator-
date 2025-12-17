const ESGSubmission = require("../models/ESGSubmission");
const calculateESG = require("../utils/esgCalculator");

exports.submitESG = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const form = req.body;

    const reportingDate =
      form.Section0?.CompanyInformation?.reportingDate;

    if (!reportingDate) {
      return res.status(400).json({ error: "submissionDate required" });
    }

    const calculation = calculateESG(form);

    const submission = new ESGSubmission({
      company: companyId,
      submissionDate: new Date(reportingDate),

      Section0: form.Section0,
      Section1: form.Section1,
      Section2: form.Section2,
      Section3: form.Section3,
      Section4: form.Section4,
      Section5: form.Section5,
      Section6: form.Section6,
      Section7: form.Section7,
      Section8: form.Section8,
      Section9: form.Section9,
      Section10: form.Section10,
      Section11: form.Section11,
      Section12: form.Section12,

      results: calculation,
    });

    await submission.save();

    res.status(201).json({
      message: "ESG submission stored",
      score: calculation,
    });
  } catch (err) {
    console.error("ESG submit error:", err);
    res.status(500).json({ error: err.message });
  }
};

