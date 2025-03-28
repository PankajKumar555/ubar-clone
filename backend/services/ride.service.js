const rideModel = require("../models/ride.model");
const mapService = require("../controllers/map.controller");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function getFare(distance, duration) {
  if (!distance || !duration) {
    throw new Error("distance and duration are required");
  }

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 7,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distance / 1000) * perKmRate.auto +
        (duration / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distance / 1000) * perKmRate.car +
        (duration / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distance / 1000) * perKmRate.moto +
        (duration / 60) * perMinuteRate.moto
    ),
  };

  const time = {
    auto: Math.floor(duration / 60),
    car: Math.floor(duration / 60),
    moto: Math.floor(duration / 60),
  };

  const dist = {
    auto: Math.floor(distance / 1000),
    car: Math.floor(distance / 1000),
    moto: Math.floor(distance / 1000),
  };
  return [
    { type: "auto", fare: fare.auto, time: time.auto, dist: dist.auto },
    { type: "car", fare: fare.car, time: time.car, dist: dist.car },
    { type: "moto", fare: fare.moto, time: time.moto, dist: dist.moto },
  ];
}

module.exports.getFare = getFare;

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
  distance,
  duration,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fareList = await getFare(distance, duration);
  const fareObject = fareList.find((f) => f.type === vehicleType); // ✅ Find the correct fare
  console.log("---------fare", fareObject.fare);
  if (!fareObject) {
    throw new Error("Invalid vehicle type");
  }

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: 555, // ✅ Corrected
    vehicleType: fareObject.type,
  });

  return ride;
};

// module.exports.confirmRide = async ({ rideId, captain }) => {
//   if (!rideId) {
//     throw new Error("Ride id is required");
//   }

//   await rideModel.findOneAndUpdate(
//     {
//       _id: rideId,
//     },
//     {
//       status: "accepted",
//       captain: captain._id,
//     }
//   );

//   const ride = await rideModel
//     .findOne({
//       _id: rideId,
//     })
//     .populate("user")
//     .populate("captain")
//     .select("+otp");

//   if (!ride) {
//     throw new Error("Ride not found");
//   }

//   return ride;
// };

// module.exports.startRide = async ({ rideId, otp, captain }) => {
//   if (!rideId || !otp) {
//     throw new Error("Ride id and OTP are required");
//   }

//   const ride = await rideModel
//     .findOne({
//       _id: rideId,
//     })
//     .populate("user")
//     .populate("captain")
//     .select("+otp");

//   if (!ride) {
//     throw new Error("Ride not found");
//   }

//   if (ride.status !== "accepted") {
//     throw new Error("Ride not accepted");
//   }

//   if (ride.otp !== otp) {
//     throw new Error("Invalid OTP");
//   }

//   await rideModel.findOneAndUpdate(
//     {
//       _id: rideId,
//     },
//     {
//       status: "ongoing",
//     }
//   );

//   return ride;
// };

// module.exports.endRide = async ({ rideId, captain }) => {
//   if (!rideId) {
//     throw new Error("Ride id is required");
//   }

//   const ride = await rideModel
//     .findOne({
//       _id: rideId,
//       captain: captain._id,
//     })
//     .populate("user")
//     .populate("captain")
//     .select("+otp");

//   if (!ride) {
//     throw new Error("Ride not found");
//   }

//   if (ride.status !== "ongoing") {
//     throw new Error("Ride not ongoing");
//   }

//   await rideModel.findOneAndUpdate(
//     {
//       _id: rideId,
//     },
//     {
//       status: "completed",
//     }
//   );

//   return ride;
// };
