import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import ConfirmPickupDialog from "./ConfirmPickup";

const RideSelection = ({
  timeAndDistance,
  pickup,
  dropoff,
  position,
  distance,
  duration,
}) => {
  const [name, setname] = React.useState("");
  const [confirmDialog, setConfirmDialog] = React.useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [rideDetails, setRideDetails] = useState();

  const rides = [
    {
      name: "Car",
      vehicleType: "car",
      seats: 4,
      time: timeAndDistance[1]?.time + "km away",
      arrival: timeAndDistance[1]?.dist + "mins",
      description: "Affordable compact cars",
      price: timeAndDistance[1]?.fare,
      oldPrice: timeAndDistance[1]?.fare / 5 + timeAndDistance[1]?.fare,
      discount: 20,
      image:
        "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png",
    },
    {
      name: "Bike",
      vehicleType: "moto",
      seats: 1,
      time: timeAndDistance[2]?.time + "km away",
      arrival: timeAndDistance[2]?.dist + "mins",
      description: "Affordable, motorcycle rides ",
      price: timeAndDistance[2]?.fare,
      oldPrice: timeAndDistance[2]?.fare / 5 + timeAndDistance[2]?.fare,
      discount: 20,
      image:
        "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png",
    },
    {
      name: "Auto",
      vehicleType: "auto",
      seats: 3,
      time: timeAndDistance[0]?.time + "km away",
      arrival: timeAndDistance[0]?.dist + "mins",
      description: "Affordable, auto rides",
      price: timeAndDistance[0]?.fare,
      oldPrice: timeAndDistance[0]?.fare / 4 + timeAndDistance[0]?.fare,
      discount: 25,
      image:
        "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png",
    },
  ];

  const handleSelectedRide = (ride, index) => {
    setname(ride.name);
    setRideDetails(ride);
    setSelectedRide(index);
  };
  // console.log(timeAndDistance);
  return (
    <>
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-4xl font-bold mb-4">Choose a ride</h2>
        <div className="space-y-4">
          {rides.map((ride, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 bg-white rounded-lg ${
                selectedRide === index ? "" : "shadow-sm"
              } cursor-pointer shadow-[0_0_0_2px_black] ${
                selectedRide === index
                  ? "shadow-[0_0_0_2px_black]"
                  : "hover:shadow-[0_0_0_2px_black]"
              }`}
              onClick={() => handleSelectedRide(ride, index)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={ride.image}
                  alt={ride.name}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 ">
                    {ride.name} <FaUserFriends className="text-gray-500" />{" "}
                    {ride.seats}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {ride.time} {ride.arrival && `• ${ride.arrival}`}
                  </p>
                  <p className="text-sm text-gray-500">{ride.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-600 text-sm font-medium">
                  {ride.discount}% off
                </span>
                <p className="text-lg font-bold">₹{ride.price}</p>
                <p className="text-sm text-gray-400 line-through">
                  ₹{ride.oldPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-full bg-black text-white p-3 rounded-lg text-md font-medium cursor-pointer mt-2"
          onClick={() => setConfirmDialog(true)}
          disabled={!selectedRide}
        >
          Choose Ubar {name}
        </button>
      </div>
      <ConfirmPickupDialog
        isOpen={confirmDialog}
        closeModal={() => {
          setConfirmDialog(false),
            setname(),
            setRideDetails(),
            setSelectedRide();
        }}
        rideDetails={rideDetails}
        pickup={pickup}
        dropoff={dropoff}
        timeAndDistance={timeAndDistance}
        position={position}
        distance={distance}
        duration={duration}
      />
    </>
  );
};

export default RideSelection;
