const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
    },
    otp: {
      type: String,
      min: 6,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientEmailOTP", UserSchema);
