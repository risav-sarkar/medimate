const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getTokenData, verifyIdToken } = require("../util");
const otpGenerator = require("otp-generator");
const PatientUser = require("../models/PatientUser");
const PatientProfile = require("../models/PatientProfile");
const PatientEmailOTP = require("../models/PatientEmailOTP");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const { format } = require("date-fns");

//OTP
router.post("/generateotp", async (req, res) => {
  try {
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await PatientEmailOTP.remove({
      email: req.body.email,
      type: req.body.type,
    });

    const emailOtp = new PatientEmailOTP({
      email: req.body.email,
      type: req.body.type,
      otp,
    });
    await emailOtp.save();

    return res
      .status(200)
      .json({ message: "Otp have been send to your email" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ---------------Auth---------------

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const emailOtp = await PatientEmailOTP.findOne({
      email: req.body.email,
      type: "email",
    });

    if (!emailOtp)
      return res.status(404).json({ message: "OTP not generated" });

    if (emailOtp.otp !== req.body.otp) {
      return res.status(400).json({ message: "OTP Invalid" });
    }

    await PatientEmailOTP.remove({
      email: req.body.email,
      type: "email",
    });

    const doctor = await PatientUser.findOne({ email: req.body.email });
    if (doctor) {
      return res.status(403).json({ message: "Email already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newDoctor = new PatientUser({
      email: req.body.email,
      password: hashedPassword,
    });

    await newDoctor.save();
    return res.status(200).json({ message: "Patient Registered" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const patient = await PatientUser.findOne({ email: req.body.email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      patient.password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        _id: patient._id,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GOOGLE LOGIN
router.post("/googlelogin", async (req, res) => {
  try {
    const { uid, email } = await verifyIdToken(req.body.idToken);
    if (uid && email) {
      const doctor = await PatientUser.findOne({ email: email });

      if (!doctor) {
        const newDoctor = new PatientUser({
          email: email,
          uid: uid,
        });
        await newDoctor.save();
        const doctor = await PatientUser.findOne({ uid: uid });
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
        await PatientUser.findByIdAndUpdate(doctor._id, {
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
    const emailOtp = await PatientEmailOTP.findOne({
      email: req.body.email,
      type: "password",
    });

    if (!emailOtp)
      return res.status(404).json({ message: "OTP not generated" });

    if (emailOtp.otp !== req.body.otp) {
      return res.status(400).json({ message: "OTP Invalid" });
    }

    await PatientEmailOTP.remove({
      email: req.body.email,
      type: "password",
    });

    const doctor = await PatientUser.findOne({ email: req.body.email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await PatientUser.findByIdAndUpdate(doctor._id, {
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
    const emailOtp1 = await PatientEmailOTP.findOne({
      email: req.body.email1,
      type: "emailreset",
    });
    const emailOtp2 = await PatientEmailOTP.findOne({
      email: req.body.email2,
      type: "emailreset",
    });

    if (!emailOtp1 || !emailOtp2)
      return res.status(404).json({ message: "OTP not generated" });

    if (emailOtp1.otp !== req.body.otp1 || emailOtp2.otp !== req.body.otp2) {
      return res.status(400).json({ message: "OTP Invalid" });
    }

    await PatientEmailOTP.remove({
      email: req.body.email1,
      type: "emailreset",
    });

    await PatientEmailOTP.remove({
      email: req.body.email2,
      type: "emailreset",
    });

    await PatientUser.findOneAndUpdate(
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
      let profile = await PatientProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(200).json(null);
      }
      const userData = await PatientUser.findOne({ _id: profile.userId });

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
      const profile = await PatientProfile.findOne({ userId: token._id });

      if (profile) {
        return res.status(404).json({ message: "Profile already exists" });
      } else {
        const newProfile = new PatientProfile({
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
      const profile = await PatientProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        await PatientProfile.findOneAndUpdate(
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

// ---------------Booking---------------

//POST Booking
router.post("/booking", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await PatientProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        const slot = await Slot.findOne({ _id: req.body.slotId });

        if (!slot)
          return res.status(404).json({ message: "Slot does not exist" });

        if (slot.numberOfBookings < slot.bookingLimit) {
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
              status: "Pending",
            });

            await newBooking.save();

            await Slot.findByIdAndUpdate(slot._id, {
              numberOfBookings: slot.numberOfBookings + 1,
            });

            return res.status(200).json({ message: "Booking created" });
          }
        } else {
          return res.status(400).json({ message: "Slot full" });
        }
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Bookings
router.get("/bookings", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await PatientProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        const aggregatedData = await Booking.aggregate([
          {
            $match: {
              patientId: profile.userId,
            },
          },
          {
            $lookup: {
              from: "slots",
              localField: "slotId",
              foreignField: "_id",
              as: "slotData",
            },
          },
          {
            $unwind: "$slotData",
          },
          {
            $lookup: {
              from: "doctorprofiles",
              localField: "slotData.doctorId",
              foreignField: "userId",
              as: "doctorData",
            },
          },
          {
            $project: {
              _id: 1,
              patientId: 1,
              slotData: 1,
              doctorData: {
                $arrayElemAt: ["$doctorData", 0],
              },
            },
          },
          {
            $unwind: "$doctorData",
          },
          {
            $lookup: {
              from: "chambers",
              localField: "slotData.chamberId",
              foreignField: "_id",
              as: "chamberData",
            },
          },
          {
            $project: {
              _id: 1,
              patientId: 1,
              slotData: 1,
              doctorData: 1,
              chamberData: {
                $arrayElemAt: ["$chamberData", 0],
              },
            },
          },
        ]).exec();

        let bookings = { today: [], upcoming: [], past: [] };
        for (let i = 0; i < aggregatedData.length; i++) {
          if (
            format(new Date(aggregatedData[i].slotData.date), "YMMdd") ===
            format(new Date(), "YMMdd")
          ) {
            bookings = {
              ...bookings,
              today: [...bookings.today, aggregatedData[i]],
            };
          } else if (
            parseInt(
              format(new Date(aggregatedData[i].slotData.date), "YMMdd")
            ) > parseInt(format(new Date(), "YMMdd"))
          ) {
            bookings = {
              ...bookings,
              upcoming: [...bookings.upcoming, aggregatedData[i]],
            };
          } else {
            bookings = {
              ...bookings,
              past: [...bookings.past, aggregatedData[i]],
            };
          }
        }
        return res.status(200).json(bookings);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Booking By Id
router.get("/booking/:id", async (req, res) => {
  try {
    const token = await getTokenData(req);

    if (token) {
      const profile = await PatientProfile.findOne({ userId: token._id });

      if (!profile) {
        return res.status(404).json({ message: "Profile does not exist" });
      } else {
        const booking = await Booking.findOne({
          patientId: profile.userId,
          _id: req.params.id,
        });
        return res.status(200).json(booking);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
