import React, { useCallback, useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import NavbarUser from "../components/NavbarUser";
// import { getRoute } from "../api/apiMethodsMaps";
import AdjustViewMap from "../components/AdjustViewMap";
import RideSelection from "../components/RideSelection";
import { endpoints, fetchData } from "../api/apiMethods";

const HomeUser = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [isPickupSelected, setIsPickupSelected] = useState(false);
  const [isDropoffSelected, setIsDropoffSelected] = useState(false);
  const [position, setPosition] = useState(null);
  const [dropOffCoords, setDropOffCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [mapBounds, setMapBounds] = useState([]);
  const [timeAndDistance, setTimeAndDistance] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 15); // Set map center to user's location
      }
    }, [position, map]);
    return null;
  };

  const getPickupSuggestions = useCallback(async () => {
    // console.log("-------->>>>>>>>>>>");
    if (pickup.length < 2 || isPickupSelected) return;
    try {
      // const response = await getLocationSuggestions(pickup);
      const response = await fetchData(
        `${endpoints.getCoordinates}?address=${encodeURIComponent(pickup)}`,
        token
      );
      setPickupSuggestions(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  }, [pickup, isPickupSelected, token]);

  const getDropoffSuggestions = useCallback(async () => {
    if (dropoff.length < 2 || isDropoffSelected) return;

    try {
      // const response = await getLocationSuggestions(dropoff);
      const response = await fetchData(
        `${endpoints.getCoordinates}?address=${encodeURIComponent(dropoff)}`,
        token
      );
      setDropoffSuggestions(response?.data || []);
    } catch (error) {
      console.error("Error fetching dropoff suggestions:", error);
    }
  }, [dropoff, isDropoffSelected, token]);

  useEffect(() => {
    if (isPickupSelected) return;
    const delay = setTimeout(() => {
      getPickupSuggestions();
    }, 500);

    return () => clearTimeout(delay);
  }, [pickup, isPickupSelected, getPickupSuggestions]);

  useEffect(() => {
    if (isDropoffSelected) return;
    const delay = setTimeout(() => {
      getDropoffSuggestions();
    }, 500);

    return () => clearTimeout(delay);
  }, [dropoff, isDropoffSelected, getDropoffSuggestions]);

  const getFare = async (response) => {
    const distance =
      response?.data?.features[0]?.properties?.segments[0]?.distance;
    const duration =
      response?.data?.features[0]?.properties?.segments[0]?.duration;
    setDistance(distance);
    setDuration(duration);
    try {
      const responce = await fetchData(
        `${endpoints.getFare}?distance=${distance}&duration=${duration}`,
        token
      );
      console.log("=======>>>>>>>>>>", responce);
      if (responce?.status == 200) {
        setTimeAndDistance(responce?.data);
      }
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
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
        getFare(response);
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

  return (
    <div className="h-screen w-full flex flex-col">
      <NavbarUser />
      <div className="flex pt-8 pb-8 pl-12 pr-12">
        {/* Sidebar */}
        <div className="bg-white shadow-md p-6 flex flex-col mx-8 w-1/4 h-fit rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Get a ride</h2>

          <div className="mb-4">
            <label className="text-gray-700 flex items-center gap-2">
              <FaMapMarkerAlt className="text-black" /> Pickup location
            </label>
            <input
              type="text"
              className="w-full rounded-lg p-3 text-md mt-2 focus:outline focus:outline-2 focus:outline-black text-gray"
              style={{ background: "#eee" }}
              placeholder="Enter pickup location"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setIsPickupSelected(false); // Reset selection state on user input
              }}
              onFocus={() => setIsPickupSelected(false)}
            />
            {/* Pickup Suggestions Dropdown */}
            {pickupSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white shadow-md mt-1 rounded-lg max-h-48 overflow-y-auto w-1/5">
                {pickupSuggestions.slice(0, 5).map((place, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setPickup(place.properties.label);
                      setPickupSuggestions([]); // Hide dropdown after selection
                      setIsPickupSelected(true); // Mark selection to prevent API call
                      setPosition([
                        place?.geometry?.coordinates[1],
                        place?.geometry?.coordinates[0],
                      ]);
                    }}
                  >
                    {place.properties.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label className="text-gray-700 flex items-center gap-2">
              <FaMapMarkerAlt className="text-black" /> Dropoff location
            </label>
            <input
              type="text"
              className="w-full rounded-lg p-3 text-md mt-2 focus:outline focus:outline-2 focus:outline-black text-gray"
              style={{ background: "#eee" }}
              placeholder="Enter dropoff location"
              value={dropoff}
              onChange={(e) => {
                setDropoff(e.target.value);
                setIsDropoffSelected(false); // Reset selection state on user input
              }}
              onFocus={() => setIsDropoffSelected(false)}
            />
            {/* Dropoff Suggestions Dropdown */}
            {dropoffSuggestions.length > 0 && (
              <ul className="absolute z-10 w-1/5 bg-white shadow-md mt-1 rounded-lg max-h-48 overflow-y-auto">
                {dropoffSuggestions.slice(0, 5).map((place, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setDropoff(place.properties.label);
                      setDropoffSuggestions([]); // Hide dropdown after selection
                      setIsDropoffSelected(true); // Mark selection to prevent API call
                      setDropOffCoords([
                        place?.geometry?.coordinates[1],
                        place?.geometry?.coordinates[0],
                      ]);
                    }}
                  >
                    {place.properties.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="w-full bg-black text-white p-3 rounded-lg text-md font-medium cursor-pointer mt-2"
            onClick={handleFindRoute}
          >
            Search
          </button>
        </div>

        {/* Ride Selection */}
        {timeAndDistance && timeAndDistance.length > 1 && (
          <div className="bg-white w-1/3">
            <RideSelection
              timeAndDistance={timeAndDistance}
              pickup={pickup}
              dropoff={dropoff}
              position={position}
              distance={distance}
              duration={duration}
            />
          </div>
        )}

        {/* Map Area */}
        <div className="flex-1 h-[80vh] z-[10]">
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
    </div>
  );
};

export default HomeUser;
