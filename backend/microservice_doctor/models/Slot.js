const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const SlotSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    chamberId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: TimeSchema,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slot", SlotSchema);
