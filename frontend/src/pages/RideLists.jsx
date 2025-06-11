import { Button, Divider } from "@mui/material";
import React from "react";
import { FaUserCircle, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbLocationFilled } from "react-icons/tb";

const RideLists = ({ setIsOpen, rideData }) => {
  return (
    <div className="bottom-0 w-full max-w-xs mx-auto bg-white rounded-xl shadow-lg overflow-y-auto h-auto p-4 mb-4">
      {/* Header: Ride Type */}
      <div className="flex items-center gap-2 mb-2 bg-black w-fit m-auto px-3 py-2 rounded-4xl">
        <FaUserCircle className="text-md text-white" />
        <div className="flex items-center rounded-full text-sm">
          <span className="font-semibold text-white">
            {rideData?.vehicleType}
          </span>
        </div>
      </div>
      {/* Time & Payment Details */}
      <h1 className="text-4xl mb-1 m-auto text-center font-bold">
        3 mins away
      </h1>
      <p className="flex items-center text-black text-md text-center m-auto justify-center pt-2">
        <FaStar className="text-black-500 mr-1" />₹{rideData?.fare} Cash payment
      </p>
      <p className="text-gray-500 text-sm mb-3 justify-center m-auto text-center">
        0.5 km away
      </p>
      <Divider />
      {/* Pickup Location */}
      <div className="relative">
        <div className="mb-3 mt-2">
          <p className="flex items-center text-gray-700 text-sm font-semibold">
            <FaMapMarkerAlt className="mr-2 text-md" />
            Pickup: {rideData?.pickup}
          </p>
        </div>
        {/* <div className="flex flex-col items-center"> */}
        {/* <div className="w-1 h-16 bg-gray-700 absolute top-8 left-1"></div> */}
        {/* </div>{" "} */}
        {/* Trip Duration & Dropoff */}
        <div className="mb-3">
          <p className="text-gray-900 font-bold ml-6">54 mins trip</p>
          <p className="flex items-center text-gray-700 text-sm font-semibold">
            <TbLocationFilled className="mr-2 text-md" />
            Dropoff: {rideData?.destination}
          </p>
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "100%", textTransform: "capitalize", marginTop: "0.5rem" }}
        onClick={() => setIsOpen(rideData?._id)}
      >
        Confirm
      </Button>
    </div>
  );
};

export default RideLists;
