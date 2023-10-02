const router = require("express").Router();
const DoctorProfile = require("../models/DoctorProfile");
const DoctorUser = require("../models/DoctorUser");
const Chamber = require("../models/Chamber");
const Slot = require("../models/Slot");
const { format } = require("date-fns");

//GET All Doctors
router.get("/doctors", async (req, res) => {
  try {
    const allDoctors = await DoctorProfile.find();
    return res.status(200).json(allDoctors);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Doctor By Id
router.get("/doctor/:id", async (req, res) => {
  try {
    const doctor = await DoctorProfile.findOne({ _id: req.params.id });
    return res.status(200).json(doctor);
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
          arr[j].slots.push(allSlots[i]);
          break;
        }
      }
      if (t === 0) {
        arr.push({ date: { ...slotDate }, slots: [allSlots[i]] });
      }
    }
    return res.status(200).json(arr);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Slots By ChamberId and Month
router.get("/slots/:chamberId/:date", async (req, res) => {
  try {
    const allSlots = await Slot.find({ chamberId: req.params.chamberId });
    let arr = [];
    for (let i = 0; i < allSlots.length; i++) {
      let slotDate = {
        dateNumber: format(new Date(allSlots[i].date), "YMMdd"),
        jsDate: allSlots[i].date,
      };
      if (
        slotDate.dateNumber.toString().substring(0, 6) ===
        req.params.date.toString().substring(0, 6)
      ) {
        let t = 0;
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].date.dateNumber === slotDate.dateNumber) {
            t = t + 1;
            arr[j].slots.push(allSlots[i]);
            break;
          }
        }
        if (t === 0) {
          arr.push({ date: { ...slotDate }, slots: [allSlots[i]] });
        }
      }
    }
    arr.sort(function (a, b) {
      let keyA = a.date.dateNumber;
      let keyB = b.date.dateNumber;

      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    return res.status(200).json(arr);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Slots By DoctorId and Month
router.get("/slots/doctor/:doctorId/:date", async (req, res) => {
  try {
    const allSlots = await Slot.find({ doctorId: req.params.doctorId });
    let arr = [];
    for (let i = 0; i < allSlots.length; i++) {
      let slotDate = {
        dateNumber: format(new Date(allSlots[i].date), "YMMdd"),
        jsDate: allSlots[i].date,
      };
      if (
        slotDate.dateNumber.toString().substring(0, 6) ===
        req.params.date.toString().substring(0, 6)
      ) {
        let t = 0;
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].date.dateNumber === slotDate.dateNumber) {
            t = t + 1;
            const chamber = await Chamber.findOne({
              _id: allSlots[i].chamberId,
            });
            arr[j].slots.push({ slotData: allSlots[i], chamberData: chamber });
            break;
          }
        }
        if (t === 0) {
          const chamber = await Chamber.findOne({
            _id: allSlots[i].chamberId,
          });
          arr.push({
            date: { ...slotDate },
            slots: [{ slotData: allSlots[i], chamberData: chamber }],
          });
        }
      }
    }
    return res.status(200).json(arr);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Slots By DoctorId and Date
router.get("/slots/doctor/date/:doctorId/:date", async (req, res) => {
  try {
    const allSlots = await Slot.find({ doctorId: req.params.doctorId });
    let arr = [];
    let chambers = [];
    let slots = [];
    let patients = 0;

    for (let i = 0; i < allSlots.length; i++) {
      let slotDate = format(new Date(allSlots[i].date), "YMMdd");

      if (slotDate.toString() === req.params.date.toString()) {
        const chamber = await Chamber.findOne({
          _id: allSlots[i].chamberId,
        });
        arr.push({ slotData: allSlots[i], chamberData: chamber });
        slots.push(allSlots[i]._id);
        chambers.push(allSlots[i].chamberId);
        patients = patients + allSlots[i].numberOfBookings;
      }
    }
    return res.status(200).json({
      slots: arr,
      stats: {
        chambers: new Set(chambers).size,
        slots: new Set(slots).size,
        patients: patients,
      },
    });
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

//GET SEARCH Doctors
router.get("/searchdoctors/:searchString", async (req, res) => {
  try {
    const doctors = await DoctorProfile.find({
      name: { $regex: req.params.searchString, $options: "i" },
    });
    return res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SEARCH Chambers
router.get("/searchchambers/:searchString", async (req, res) => {
  try {
    const chambers = await Chamber.find({
      name: { $regex: req.params.searchString, $options: "i" },
    });
    return res.status(200).json(chambers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SEARCH Medical Department
router.get("/searchmedicaldepartment/:searchString", async (req, res) => {
  try {
    const doctors = await DoctorProfile.find({
      medicalDepartment: { $regex: req.params.searchString, $options: "i" },
    });
    return res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Check Email Of doctor exists
router.get("/doctoremail/:email", async (req, res) => {
  try {
    const doctor = await DoctorUser.findOne({ email: req.params.email });
    if (doctor) return res.status(200).json({ message: "Email Found" });
    else return res.status(404).json({ message: "Email Not Found" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
