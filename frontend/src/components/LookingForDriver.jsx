import React from "react";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import UberProgressBar from "./ProgressBar";

const LookingForDriver = ({ confirmRideData, image }) => {
  // console.log("confirmRideData=========", confirmRideData);
  return (
    <div className="max-w-sm bg-white text-center m-auto ">
      {/* Title */}
      <UberProgressBar />
      <h2 className="text-lg font-semibold mb-2">Looking for a Driver</h2>

      {/* Car Image */}
      <img
        src={image} // Replace with actual image URL
        alt={confirmRideData?.vehicleType}
        className="mx-auto w-35"
      />

      {/* Pickup Location */}
      <div className="flex items-center gap-2 border-b border-gray-400 py-2">
        <FaMapMarkerAlt className="text-gray-600 mr-2" />
        <div>
          <p className="font-semibold text-start">{confirmRideData?.pickup}</p>
          <p className="text-sm text-gray-500 text-start">
            {confirmRideData?.pickup}
          </p>
        </div>
      </div>

      {/* Drop-off Location */}
      <div className="flex items-center gap-2 border-b border-gray-400 py-2">
        <FaMapMarkerAlt className="text-gray-600 mr-2" />
        <div>
          <p className="font-semibold text-start">
            {confirmRideData?.destination}
          </p>
          <p className="text-sm text-gray-500 text-start">
            {confirmRideData?.destination}
          </p>
        </div>
      </div>

      {/* Fare Information */}
      <div className="flex items-center gap-2 py-2">
        <FaMoneyBillWave className="text-gray-600 mr-2" />
        <div>
          <p className="font-semibold text-lg text-start">
            ₹{confirmRideData?.fare}
          </p>
          <p className="text-sm text-gray-500 text-start">Cash</p>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
