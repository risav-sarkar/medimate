const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    bookingId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
