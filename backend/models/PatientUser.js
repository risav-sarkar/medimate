const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      default: null,
    },
    uid: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientUser", UserSchema);
