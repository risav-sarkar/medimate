const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      require: true,
      min: 3,
    },
    phoneNumber: {
      type: String,
      required: true,
      max: 10,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientProfile", ProfileSchema);
