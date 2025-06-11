import { useContext, useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
// import { motion  from "framer-motion";
import { motion as Motion } from "framer-motion";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { IoMdCar } from "react-icons/io";
import "../style/HomeDriver.css";
// import { FaMapMarkerAlt } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  //   useMap,
  //   Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import RideLists from "./RideLists";
import UberProgressBar from "../components/ProgressBar";
import SocketContext from "../context/SocketContext";
import { endpoints, fetchData } from "../api/apiMethods";
import AdjustViewMap from "../components/AdjustViewMap";

const HomeDriver = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [rides, setRides] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTripAccepted, setIsTripAccepted] = useState(false);
  const [rideData, setRideData] = useState([]);
  const { socket } = useContext(SocketContext); // Get socket from context
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [mapBounds, setMapBounds] = useState([]);
  const [dropOffCoords, setDropOffCoords] = useState(null);

  const token = localStorage.getItem("token");

  console.log("📲 New ride request received:", rideData);

  useEffect(() => {
    if (!socket) return; // 🔒 Wait until socket is ready
    const storedUser = localStorage.getItem("captain");
    if (storedUser) {
      const captain = JSON.parse(storedUser);
      console.log("Socket connected home driver page:", socket, captain);
      socket.emit("join", {
        userId: captain._id,
        userType: "captain",
      });
    }
    // ✅ Set listener once
    const handleNewRide = (newRide) => {
      setRideData((prev) => [...prev, newRide[0]]);
    };

    socket.on("request-ride", handleNewRide);

    // 🧼 Clean up to prevent duplicate listeners
    return () => {
      socket.off("request-ride", handleNewRide);
    };
  }, [socket]);

  const handleShareLiveLocation = () => {
    const storedUser = localStorage.getItem("captain");
    if (storedUser && socket) {
      const captain = JSON.parse(storedUser);
      console.log("Socket connected home driver page:", socket, captain);
      socket.emit("update-location-captain", {
        userId: captain._id,
        location: { ltd: 28.6448, lng: 77.216721 }, // Example location, replace with actual coordinates},
      });
    }
  };

  const handleGoOnline = () => {
    setLoading(true);
    setIsOnline(true);
    handleShareLiveLocation();
    setTimeout(() => {
      setLoading(false);
      setIsOpen(true);
    }, 5000);
  };

  const handleAcceptRide = (acceptedRideId) => {
    setRideData((prevRides) =>
      prevRides.filter((ride) => ride._id !== acceptedRideId)
    );
    setIsOpen(false);
    setIsTripAccepted(true);
    handleFindRoute();
    setDropOffCoords();
  };

  const handleFindRoute = async () => {
    if (!position || !dropOffCoords) return;
    // {
    //   console.log(position, dropOffCoords);
    // }

    try {
      // const response = await getRoute(position, dropOffCoords);
      const response = await fetchData(
        `${endpoints.getDistanceTime}?pickup=${encodeURIComponent(
          position
        )}&dropoff=${encodeURIComponent(dropOffCoords)}`,
        token
      );
      if (response?.data?.features[0]?.geometry?.coordinates) {
        const routePoints =
          response?.data?.features[0]?.geometry?.coordinates.map(
            ([lng, lat]) => [lat, lng]
          );
        setRouteCoordinates(routePoints);
        setMapBounds([position, dropOffCoords]); // Save bounds to state
        // getFare(response);
        // setTimeAndDistance([
        //   (
        //     (response?.data?.features[0]?.properties?.segments[0]?.distance ??
        //       0) / 1000
        //   ).toFixed(2),
        //   (
        //     (response?.data?.features[0]?.properties?.segments[0]?.duration ??
        //       0) / 60
        //   ).toFixed(2),
        // ]);
      }
      // setDropoffSuggestions(response || []);
    } catch (error) {
      console.error("Error fetching dropoff suggestions:", error);
    }
  };

  const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 15); // Set map center to user's location
      }
    }, [position, map]);
    return null;
  };

  const position = [28.6139, 77.209];

  return (
    <div className="relative h-screen w-full">
      {/* Map Background Placeholder */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex-1 h-[100%] z-[-1] ">
          <MapContainer
            center={position || [28.6139, 77.209]}
            zoom={15}
            className="w-full h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <RecenterMap position={position} />
            <AdjustViewMap bounds={mapBounds} />
            {/* Show user location marker */}
            {position && (
              <Marker
                position={position}
                icon={L.icon({
                  iconUrl:
                    "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                  iconSize: [30, 30],
                })}
              >
                <Popup>Your Current Location</Popup>
              </Marker>
            )}

            {/* Draw route polyline */}
            {routeCoordinates?.length > 0 && (
              <Polyline positions={routeCoordinates} color="blue" weight={5} />
            )}

            {/* Show pickup location marker */}
            {position && (
              <Marker
                position={position}
                icon={L.icon({
                  iconUrl:
                    "https://cdn-icons-png.flaticon.com/512/684/684947.png", // Online pickup icon
                  iconSize: [30, 30],
                })}
              >
                <Popup>Pickup Location</Popup>
              </Marker>
            )}

            {/* Show dropoff location marker */}
            {dropOffCoords && (
              <Marker
                position={dropOffCoords}
                icon={L.icon({
                  iconUrl:
                    "https://cdn-icons-png.flaticon.com/512/535/535137.png", // Online dropoff icon
                  iconSize: [30, 30],
                })}
              >
                <Popup>Dropoff Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

      {/* Bottom Drawer */}
      {!isTripAccepted && (
        <div className="absolute bottom-0 w-full bg-white p-6 rounded-t-3xl shadow-lg flex flex-col items-center">
          <p className="text-black text-2xl">
            {isOnline ? "You're online" : "You're offline"}
          </p>
          {!isOnline ? (
            <div
              className="absolute flex items-center justify-center cursor-pointer"
              style={{ marginTop: "-115px" }}
              onClick={handleGoOnline}
            >
              {!loading && <div className="pulse"></div>}
              <Motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-3 w-20 h-20 rounded-full flex items-center justify-center"
                  sx={{ borderRadius: "50%" }}
                  // disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Go"
                  )}
                </Button>
              </Motion.div>
            </div>
          ) : (
            <div className="w-xs mt-2">
              <UberProgressBar />
              <p className="text-black text-2xl text-center">
                Opportunity Near by
              </p>
            </div>
          )}
        </div>
      )}
      {rideData && (
        <Motion.div
          initial={{ y: "100%" }}
          animate={{ y: isOpen ? "0%" : "100%" }}
          // transition={{ type: "spring", stiffness: 100 }}
          className="fixed left-1/2 transform -translate-x-1/2 w-[90%] bottom-0 max-w-md w-auto bg-none p-4 h-[90vh] overflow-y-scroll scrollbar-none"
          style={{
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For IE/Edge
          }}
        >
          {/* <h1 className="text-3xl font-semibold text-center mb-4">
          Nearby Rides
        </h1> */}
          {rideData?.map((item, i) => (
            <RideLists
              key={i}
              setIsOpen={(id) => handleAcceptRide(id)}
              rideData={item}
            />
          ))}
        </Motion.div>
      )}
    </div>
  );
};

export default HomeDriver;
