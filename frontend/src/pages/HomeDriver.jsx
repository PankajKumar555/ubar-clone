import { useState } from "react";
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
  //   useMap,
  //   Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import RideLists from "./RideLists";
import UberProgressBar from "../components/ProgressBar";

const HomeDriver = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [rides, setRides] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTripAccepted, setIsTripAccepted] = useState(false);

  const handleGoOnline = () => {
    setLoading(true);
    setIsOnline(true);
    setTimeout(() => {
      setLoading(false);
      setIsOpen(true);
      // setRides([
      //   {
      //     id: 1,
      //     pickup: "Lane Number 3, Wadgaon Sheri",
      //     dropoff: "Hinjawadi, Pune",
      //     time: "3 mins away",
      //   },
      //   {
      //     id: 2,
      //     pickup: "MG Road, Pune",
      //     dropoff: "Shivajinagar",
      //     time: "5 mins away",
      //   },
      // ]);
    }, 5000);
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
            {/* <RecenterMap position={position} /> */}
            {/* <AdjustViewMap bounds={mapBounds} /> */}
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
            {/* {routeCoordinates?.length > 0 && (
                      <Polyline positions={routeCoordinates} color="blue" weight={5} />
                    )} */}

            {/* Show pickup location marker */}
            {/* {position && (
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
                    )} */}

            {/* Show dropoff location marker */}
            {/* {dropOffCoords && (
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
                    )} */}
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
      {isOpen && (
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
          {Array.from({ length: 5 }).map((_, i) => (
            <RideLists
              key={i}
              setIsOpen={() => {
                setIsOpen(false), setIsTripAccepted(true);
              }}
            />
          ))}
        </Motion.div>
      )}
    </div>
  );
};

export default HomeDriver;
