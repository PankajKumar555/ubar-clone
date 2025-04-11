const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideService = require("../services/ride.service");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { pickup, destination, vehicleType, distance, duration, lat, lng } =
    req.body;
  console.log(
    "---backend-create",
    // pickup,
    // destination,
    // vehicleType,
    // distance,
    // duration,
    lat,
    lng
  );

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
      distance,
      duration,
    });
    res.status(201).json({
      success: true,
      message: "Ride created successfully",
      ride,
    });
    // const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    const captionsInRadius = await mapService.getCaptionsInTheRadius(
      // pickupCoordinates.lat,
      // pickupCoordinates.ing,
      28.5571,
      77.1637,
      10
    );
    console.log("🚕 Available captains:", captionsInRadius);
    ride.otp = "";
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    // console.log("--->>>>>>rideusersearch", rideWithUser);
    captionsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: [rideWithUser],
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { distance, duration } = req.query;
  try {
    const fare = await rideService.getFare(distance, duration);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
