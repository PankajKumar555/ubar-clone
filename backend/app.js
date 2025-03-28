const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookiesParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captionRoutes = require("./routes/caption.routes");
const locationRoutes = require("./routes/maps.routes");
const rideRoute = require("./routes/ride.routes");

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", userRoutes);
app.use("/captions", captionRoutes);
app.use("/location", locationRoutes);
app.use("/rides", rideRoute);
module.exports = app;
