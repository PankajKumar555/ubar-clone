const axios = require("axios");
const captionModel = require("../models/caption.model");
const MAP_BASE_URL = "https://api.openrouteservice.org";
const MAP_API_KEY = process.env.MAP_API_KEY;

module.exports.getAddressCoordinate = async (query) => {
  try {
    const response = await axios.get(`${MAP_BASE_URL}/geocode/search`, {
      params: {
        api_key: MAP_API_KEY,
        text: query, // User's input
        size: 5, // Number of suggestions
        "boundary.country": "IN", // Restrict to India
        layers: "locality,neighbourhood,address",
      },
    });

    return response.data.features; // Returns an array of location suggestions
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
    throw error;
  }
};

module.exports.getRoutes = async (coordinates) => {
  if (!coordinates?.pickup || !coordinates?.dropoff) {
    throw new Error("Missing pickup or dropoff coordinates");
  }

  const { pickup, dropoff } = coordinates;
  try {
    const response = await axios.get(
      `${MAP_BASE_URL}/v2/directions/driving-car`,
      {
        params: {
          api_key: MAP_API_KEY,
          start: `${pickup.lng},${pickup.lat}`,
          end: `${dropoff.lng},${dropoff.lat}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching route:", error);
    throw error;
  }
};

module.exports.getCaptionsInTheRadius = async (lng, lat, radius) => {
  // radious in km

  const captions = await captionModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius / 6371],
      },
    },
    // socketId: { $exists: true, $ne: null }, // Only online captains
  });
  return captions;
};
