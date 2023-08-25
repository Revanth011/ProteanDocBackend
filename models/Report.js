const mongoose = require("mongoose");
const ReportSchema = new mongoose.Schema(
    {
        ReportTitle: {
            type: String,
            trim: true,
            unique: [true, "Report title should be unique"],
            required: [true, "Report title required"],
        },
        Observations: {
            type: Array,
        },
        Company: {
            type: String,
            trim: true,
            required: [true, "Company required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
