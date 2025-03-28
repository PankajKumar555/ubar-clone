const { validationResult } = require("express-validator");
const mapsService = require("../services/maps.service");

module.exports.getCoordinates = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await mapsService.getAddressCoordinate(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { pickup, dropoff } = req.query;
  if (!pickup || !dropoff) {
    return res
      .status(400)
      .json({ message: "Missing pickup or dropoff location" });
  }
  const pickupCoords = pickup.split(",").map(Number);
  const dropoffCoords = dropoff.split(",").map(Number);

  if (pickupCoords.length !== 2 || dropoffCoords.length !== 2) {
    return res.status(400).json({ message: "Invalid coordinate format" });
  }

  const coordinates = {
    pickup: { lat: pickupCoords[0], lng: pickupCoords[1] },
    dropoff: { lat: dropoffCoords[0], lng: dropoffCoords[1] },
  };
  try {
    const distanceAndTime = await mapsService.getRoutes(coordinates);
    return res.status(200).json(distanceAndTime);
  } catch (error) {
    res.status(404).json({ message: "Route not found" });
  }
};
