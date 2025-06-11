const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

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

router.post(
  "/confirm",
  authMiddleware.authCaption,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  rideController.confirmRide
);

router.get(
  "/start-ride",
  authMiddleware.authCaption,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  rideController.startRide
);

router.post(
  "/end-ride",
  authMiddleware.authCaption,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  rideController.endRide
);

module.exports = router;
