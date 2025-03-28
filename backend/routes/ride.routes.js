const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const rideController = require("../controllers/ride.controller");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
  body("distance").isNumeric().withMessage("Invalid distance"),
  body("duration").isNumeric().withMessage("Invalid duration time"),
  body("lat").isFloat().withMessage("Invalid latitude"),
  body("lng").isFloat().withMessage("Invalid longitude"),
  rideController.createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("distance").isLength({ min: 2 }).withMessage("Invalid distance value"),
  query("duration").isLength({ min: 2 }).withMessage("Invalid duration value"),
  rideController.getFare
);

module.exports = router;
