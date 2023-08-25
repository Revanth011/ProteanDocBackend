const mongoose = require("mongoose");
const ObservationSchema = new mongoose.Schema(
  {
    ObservationNo: {
      type: Number,
      trim: true,
      required: [true, "ObservationNo. required"],
    },
    Vulnerability: {
      type: String,
      trim: true,
      required: [true, "Vulnerability required"],
    },
    Status: {
      type: String,
      trim: true,
      required: [true, "Status required"],
    },
    Severity: {
      type: String,
      trim: true,
      required: [true, "Severity required"],
    },
    Description: {
      type: String,
      trim: true,
      required: [true, "Description required"],
    },
    Remediation: {
      type: String,
      trim: true,
      required: [true, "Description required"],
    },
    AffectedURLs: {
      type: Array,
      required: [true, "Affected URLs required"],
    },
    References: {
      type: String,
      trim: true,
      required: [true, "Description required"],
    },
    POC: {
      type: Array,
      required: [true, "POC required"],
    },
    ReportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Observation", ObservationSchema);
