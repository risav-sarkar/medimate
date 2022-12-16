const router = require("express").Router();
const Profile = require("../models/Profile");
const Chamber = require("../models/Chamber");

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

module.exports = router;
