import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import LookingForDriver from "./LookingForDriver"; // Import your component
import { endpoints, postData } from "../api/apiMethods";
import RideConfirmed from "./RideConfirmed";
import SocketContext from "../context/SocketContext";

const ConfirmPickupDrawer = ({
  isOpen,
  closeModal,
  rideDetails,
  // timeAndDistance,
  pickup,
  dropoff,
  position,
  distance,
  duration,
}) => {
  // console.log(
  //   "-------",
  //   timeAndDistance,
  //   pickup,
  //   dropoff,
  //   rideDetails,
  //   position,
  //   distance,
  //   duration
  // );
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [lookingForRide, setLookingForRide] = useState(false);
  const [confirmRideData, setConfirmRideData] = useState();
  const token = localStorage.getItem("token");
  const { socket } = useContext(SocketContext);
  // console.log("ride confirmRideData", confirmRideData);

  const handleSendRquest = () => {
    if (!socket || !socket.connected) {
      console.error("❌ Socket is not connected, cannot send ride request.");
      return;
    }
    console.log("ride socket", socket.connected);
    const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
    const pickup = { lat: position[0], lng: position[1] };
    const destination = { lat: 28.534601, lng: 77.381182 }; // Assuming these are the locations you want to send
    if (socket) {
      socket.emit("request-ride", {
        userId: user._id, // User ID from localStorage or context
        pickupLocation: pickup, // { lat: ..., lng: ... }
        destination: destination, // { lat: ..., lng: ... }
      });

      console.log(
        "🚀 Ride request sent to backend!",
        user._id,
        pickup,
        destination
      );
    } else {
      console.error("❌ Socket not connected");
    }
  };

  const handleShowRideConfirmed = () => {
    const timeoutId = setTimeout(() => {
      setRideConfirmed(true);
    }, 5000);

    return () => clearTimeout(timeoutId);
  };

  const handleConfirmRide = async () => {
    const payload = {
      pickup: pickup,
      destination: dropoff,
      vehicleType: rideDetails?.vehicleType,
      distance: distance,
      duration: duration,
      lat: position[0],
      lng: position[1],
    };
    try {
      const responce = await postData(endpoints.createRide, payload, token);
      if (responce?.status == 201) {
        handleSendRquest();
        // setLookingForRide(true);
        // setConfirmRideData(responce?.data);
        // handleShowRideConfirmed();
      } else {
        console.log("Error while confirming Ride");
      }
      console.log("+++++++", responce);
    } catch (error) {
      console.log("Error while creating ride :", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-end"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-transform duration-300 ease-out"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-200 ease-in"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          {/* Dialog Panel */}
          <Dialog.Panel className="w-full max-w-full mx-auto bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl drop-shadow-lg p-6">
            {rideConfirmed ? (
              <RideConfirmed />
            ) : lookingForRide ? (
              // Show "Looking for Driver" UI
              <LookingForDriver
                image={rideDetails?.image}
                confirmRideData={confirmRideData}
              />
            ) : (
              // Show "Confirm Pickup" UI
              <div className="text-center">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                  Confirm Pickup
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Pickup:</strong> {pickup || "Not selected"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Drop-off:</strong> {dropoff || "Not selected"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Are you sure you want to confirm this ride?
                  </p>
                </div>
                <div className="mt-4 flex justify-center flex-col sm:flex-row gap-2">
                  <button
                    onClick={closeModal}
                    className="w-full sm:w-1/4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRide}
                    className="w-full sm:w-1/4 px-4 py-2 bg-black text-white rounded-lg cursor-pointer"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default ConfirmPickupDrawer;
