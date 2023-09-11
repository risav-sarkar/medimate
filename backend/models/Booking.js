const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    slotId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    patientId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    //Pending, Confirmed, Cancelled
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
