const mongoose = require("mongoose");


const ESGSubmissionSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  submissionDate: {
    type: Date,
    required: true,
  },

  Section0: { type: mongoose.Schema.Types.Mixed, required: true },
  Section1: { type: mongoose.Schema.Types.Mixed, required: true },
  Section2: { type: mongoose.Schema.Types.Mixed, required: true },
  Section3: { type: mongoose.Schema.Types.Mixed, required: true },
  Section4: { type: mongoose.Schema.Types.Mixed, required: true },
  Section5: { type: mongoose.Schema.Types.Mixed, required: true },
  Section6: { type: mongoose.Schema.Types.Mixed, required: true },
  Section7: { type: mongoose.Schema.Types.Mixed, required: true },
  Section8: { type: mongoose.Schema.Types.Mixed, required: true },
  Section9: { type: mongoose.Schema.Types.Mixed, required: true },
  Section10: { type: mongoose.Schema.Types.Mixed, required: true },
  Section11: { type: mongoose.Schema.Types.Mixed, required: true },
  Section12: { type: mongoose.Schema.Types.Mixed, required: true },
  results: { type: mongoose.Schema.Types.Mixed, required: true },
  //score: { type: mongoose.Schema.Types.Mixed, required: true },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ESGSubmission", ESGSubmissionSchema);


