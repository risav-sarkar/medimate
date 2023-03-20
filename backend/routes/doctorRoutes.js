const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const { getTokenData, verifyIdToken } = require("../util");

const DoctorUser = require("../models/DoctorUser");
const DoctorProfile = require("../models/DoctorProfile");
const Chamber = require("../models/Chamber");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const DoctorEmailOTP = require("../models/DoctorEmailOTP");
const { eachDayOfInterval, format } = require("date-fns");

//OTP
router.post("/generateotp", async (req, res) => {
  try {
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await DoctorEmailOTP.remove({
      email: req.body.email,
      type: req.body.type,
    });

    const emailOtp = new DoctorEmailOTP({
      email: req.body.email,
      type: req.body.type,
      otp,
    });
    await emailOtp.save();

    return res
      .status(200)
      .json({ message: "Otp have been send to your email" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ---------------Auth---------------

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const emailOtp = await DoctorEmailOTP.findOne({
      email: req.body.email,
      type: "email",
    });

    if (!emailOtp)
      return res.status(404).json({ message: "OTP not generated" });

    if (emailOtp.otp !== req.body.otp) {
      return res.status(400).json({ message: "OTP Invalid" });
    }

    await DoctorEmailOTP.remove({
      email: req.body.email,
      type: "email",
    });

    const doctor = await DoctorUser.findOne({ email: req.body.email });
    if (doctor) {
      return res.status(403).json({ message: "Email already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newDoctor = new DoctorUser({
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
    const doctor = await DoctorUser.findOne({ email: req.body.email });
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
    console.log(err);
    res.status(500).json(err);
  }
});

//GOOGLE LOGIN
router.post("/googlelogin", async (req, res) => {
  try {
    const { uid, email } = await verifyIdToken(req.body.idToken);
    if (uid && email) {
      const doctor = await DoctorUser.findOne({ email: email });

      if (!doctor) {
        const newDoctor = new DoctorUser({
          email: email,
          uid: uid,
        });
        await newDoctor.save();
        const doctor = await DoctorUser.findOne({ uid: uid });
        const token = jwt.sign(
          {
            _id: doctor._id,
          },
          process.env.JWT_SECRET
        );
        return res.status(200).json({ token: token });
      }

      if (doctor.uid && doctor.email) {
        const token = jwt.sign(
          {
            _id: doctor._id,
          },
          process.env.JWT_SECRET
        );
        return res.status(200).json({ token: token });
      }

      if (!doctor.uid && doctor.email) {
        await DoctorUser.findByIdAndUpdate(doctor._id, {
          uid: uid,
        });
        const token = jwt.sign(
          {
            _id: doctor._id,
          },
          process.env.JWT_SECRET
        );
        return res.status(200).json({ token: token });
      }
    } else return res.status(404).json({ message: "Invalid token" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//RESET PASSWORD
router.post("/resetpassword", async (req, res) => {
  try {
    const emailOtp = await DoctorEmailOTP.findOne({
      email: req.body.email,
      type: "password",
    });

    if (!emailOtp)
      return res.status(404).json({ message: "OTP not generated" });

    if (emailOtp.otp !== req.body.otp) {
      return res.status(400).json({ message: "OTP Invalid" });
    }

    await DoctorEmailOTP.remove({
      email: req.body.email,
      type: "password",
    });

    const doctor = await DoctorUser.findOne({ email: req.body.email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await DoctorUser.findByIdAndUpdate(doctor._id, {
      password: hashedPassword,
    });
    return res.status(200).json({ message: "Password Updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//RESET EMAIL
router.post("/resetemail", async (req, res) => {
  try {
    const emailOtp1 = await DoctorEmailOTP.findOne({
      email: req.body.email1,
      type: "emailreset",
    });
    const emailOtp2 = await DoctorEmailOTP.findOne({
      email: req.body.email2,
      type: "emailreset",
    });

    if (!emailOtp1 || !emailOtp2)
      return res.status(404).json({ message: "OTP not generated" });

    if (emailOtp1.otp !== req.body.otp1 || emailOtp2.otp !== req.body.otp2) {
      return res.status(400).json({ message: "OTP Invalid" });
    }

    await DoctorEmailOTP.remove({
      email: req.body.email1,
      type: "emailreset",
    });

    await DoctorEmailOTP.remove({
      email: req.body.email2,
      type: "emailreset",
    });

    await DoctorUser.findOneAndUpdate(
      { email: req.body.email1 },
      {
        email: req.body.email2,
        uid: null,
      }
    );
    return res.status(200).json({ message: "Email Changed" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ---------------Profile---------------

//GET PROFILE
router.get("/profile", async (req, res) => {
  try {
    const token = await getTokenData(req);
    if (token) {
      let profile = await DoctorProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(200).json(null);
      }
      const userData = await DoctorUser.findOne({ _id: profile.userId });

      return res.status(200).json({
        ...JSON.parse(JSON.stringify(profile)),
        email: userData.email || "",
      });
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
      const profile = await DoctorProfile.findOne({ userId: token._id });

      if (profile) {
        return res.status(404).json({ message: "Profile already exists" });
      } else {
        const newProfile = new DoctorProfile({
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
      const profile = await DoctorProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        await DoctorProfile.findOneAndUpdate(
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

// ---------------Chamber---------------

//POST CHAMBER
router.post("/chamber", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await DoctorProfile.findOne({ userId: token._id });

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
      const profile = await DoctorProfile.findOne({ userId: token._id });

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
      const profile = await DoctorProfile.findOne({ userId: token._id });

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

// ---------------Slot---------------

//POST Slot
router.post("/slot", async (req, res) => {
  try {
    const token = await getTokenData(req);
    if (token) {
      const profile = await DoctorProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        const newSlot = new Slot({
          ...req.body,
          doctorId: token._id,
        });

        await newSlot.save();
        return res.status(200).json({ message: "Slot created" });
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST Multipleslots
router.post("/slot/multiple", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await DoctorProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        const result = eachDayOfInterval({
          start: new Date(req.body.startDate),
          end: new Date(req.body.endDate),
        });

        result.forEach(async (i) => {
          let day = format(i, "EEEEEE");
          if (req.body.days.includes(day)) {
            const newSlot = new Slot({
              chamberId: req.body.chamberId,
              time: req.body.time,
              date: i,
              doctorId: token._id,
            });

            await newSlot.save();
          }
        });
        return res.status(200).json({ message: "Slots created" });
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//PATCH Slot
router.patch("/slot/:slotId", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await DoctorProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        await Slot.findByIdAndUpdate(req.params.slotId, {
          $set: req.body,
        });
        return res.status(200).json({ message: "Slot updated" });
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/slot/:slotId", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await DoctorProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        await Slot.findByIdAndDelete(req.params.slotId);
        return res.status(200).json({ message: "Slot deleted" });
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// ---------------Bookings---------------

//PATCH BookingStatus
router.patch("/booking/:bookingId", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await DoctorProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        await Booking.findByIdAndUpdate(req.params.bookingId, {
          status: req.body.status,
        });
        return res.status(200).json({ message: "Booking updated" });
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Bookings By SlotId
router.get("/booking/:slotId", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await DoctorProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        const allbookings = await Booking.find({
          slotId: req.params.slotId,
        });
        return res.status(200).json(allbookings);
      }
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
