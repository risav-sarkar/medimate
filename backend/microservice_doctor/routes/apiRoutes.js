const router = require("express").Router();
const Profile = require("../models/Profile");
const Chamber = require("../models/Chamber");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");

//GET AllDoctors
router.get("/doctors", async (req, res) => {
  try {
    const allDoctors = await Profile.find();
    return res.status(200).json(allDoctors);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ChambersByDoctorId
router.get("/chambers/:doctorId", async (req, res) => {
  try {
    const allChambers = await Chamber.find({ doctorId: req.params.doctorId });
    return res.status(200).json(allChambers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Slots By ChamberId
router.get("/slot/:chamberId", async (req, res) => {
  try {
    const allSlots = await Slot.find({ chamberId: req.params.chamberId });
    return res.status(200).json(allSlots);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST Booking
router.post("/booking", async (req, res) => {
  try {
    const slot = await Slot.findOne({ _id: req.body.slotId });

    if (slot) {
      const booking = await Booking.findOne({
        slotId: req.body.slotId,
        patientId: req.body.patientId,
      });

      if (booking) {
        return res.status(404).json({ message: "Booking exists" });
      } else {
        const newBooking = new Booking({
          slotId: req.body.slotId,
          patientId: req.body.patientId,
          status: "Booked",
        });

        await newBooking.save();
        return res.status(200).json({ message: "Booking created" });
      }
    } else {
      return res.status(404).json({ message: "Slot does not exist" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Bookings By PatientId
router.get("/booking/:patientId", async (req, res) => {
  try {
    const allBookings = await Booking.find({ patientId: req.params.patientId });
    return res.status(200).json(allBookings);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
