const mongoose = require("mongoose");

const ChamberSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      min: 3,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
      max: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chamber", ChamberSchema);
