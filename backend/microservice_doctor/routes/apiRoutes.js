const router = require("express").Router();
const Profile = require("../models/Profile");
const Chamber = require("../models/Chamber");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const { format } = require("date-fns");

//GET All Doctors
router.get("/doctors", async (req, res) => {
  try {
    const allDoctors = await Profile.find();
    return res.status(200).json(allDoctors);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Chambers By DoctorId
router.get("/chambers/:doctorId", async (req, res) => {
  try {
    const allChambers = await Chamber.find({ doctorId: req.params.doctorId });
    return res.status(200).json(allChambers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Chamber By Id
router.get("/chamber/:id", async (req, res) => {
  try {
    const chamber = await Chamber.findOne({ _id: req.params.id });
    return res.status(200).json(chamber);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Slots By ChamberId
router.get("/slots/:chamberId", async (req, res) => {
  try {
    const allSlots = await Slot.find({ chamberId: req.params.chamberId });
    let arr = [];
    for (let i = 0; i < allSlots.length; i++) {
      let slotDate = {
        dateNumber: format(new Date(allSlots[i].date), "YMMdd"),
        jsDate: allSlots[i].date,
      };

      let t = 0;
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].date.dateNumber === slotDate.dateNumber) {
          t = t + 1;
          arr[j].slot.push(allSlots[i]);
          break;
        }
      }
      if (t === 0) {
        arr.push({ date: { ...slotDate }, slot: [allSlots[i]] });
      }
    }
    return res.status(200).json(arr);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Slot By Id
router.get("/slot/:id", async (req, res) => {
  try {
    const slot = await Slot.findOne({ _id: req.params.id });
    return res.status(200).json(slot);
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
