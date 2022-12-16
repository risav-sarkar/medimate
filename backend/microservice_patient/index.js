const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const patientRoutes = require("./routes/patientRoutes");
const apiRoutes = require("./routes/apiRoutes");
dotenv.config();

const dbName = "patient";

mongoose
  .connect(`${process.env.MONGO_URL}${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: "majority",
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/patient", patientRoutes);
app.use("/api", apiRoutes);

app.listen(8900, () => {
  console.log("Backend server is running on port 8900");
});
