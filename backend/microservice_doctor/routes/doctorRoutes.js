const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getTokenData } = require("../util");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Chamber = require("../models/Chamber");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const doctor = await User.findOne({ email: req.body.email });
    if (doctor) {
      return res.status(403).json({ message: "Email already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newDoctor = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await newDoctor.save();
    return res.status(200).json({ message: "Doctor Registered" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const doctor = await User.findOne({ email: req.body.email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      doctor.password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        _id: doctor._id,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PROFILE
router.get("/profile", async (req, res) => {
  try {
    const token = await getTokenData(req);
    if (token) {
      const profile = await Profile.findOne({ userId: token._id });
      return res.status(200).json(profile);
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST PROFILE
router.post("/profile", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await Profile.findOne({ userId: token._id });

      if (profile) {
        return res.status(404).json({ message: "Profile already exists" });
      } else {
        const newProfile = new Profile({
          ...req.body,
          userId: token._id,
        });

        await newProfile.save();
        return res.status(200).json({ message: "Profile created" });
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//PATCH PROFILE
router.patch("/profile", async (req, res) => {
  try {
    const token = await getTokenData(req);
    if (token) {
      const profile = await Profile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        await Profile.findOneAndUpdate(
          { userId: token._id },
          {
            $set: req.body,
          }
        );
        return res.status(200).json({ message: "Profile updated" });
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST CHAMBER
router.post("/chamber", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await Profile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        const newChamber = new Chamber({
          ...req.body,
          doctorId: token._id,
        });

        await newChamber.save();
        return res.status(200).json({ message: "Chamber created" });
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//PATCH CHAMBER
router.patch("/chamber/:chamberId", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await Profile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        await Chamber.findByIdAndUpdate(req.params.chamberId, {
          $set: req.body,
        });
        return res.status(200).json({ message: "Chamber updated" });
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CHAMBER
router.delete("/chamber/:chamberId", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await Profile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        await Chamber.findByIdAndDelete(req.params.chamberId);
        return res.status(200).json({ message: "Chamber deleted" });
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
