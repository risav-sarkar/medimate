const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    phoneNumber: {
      type: String,
      required: true,
      max: 10,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    age: {
      type: String,
      required: true,
    },
    medicalDepartment: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoctorProfile", ProfileSchema);
