// import axios from "axios";

// OpenRouteService API Key (Replace with your key)
const MAP_API_KEY = "5b3ce3597851110001cf6248ead7d4173a2f47d9b2cf60c628061cd0";

// OpenRouteService API Base URL
const MAP_BASE_URL = "https://api.openrouteservice.org";

// Function to fetch location suggestions (for dropdown)
// export const getLocationSuggestions = async (query) => {
//   try {
//     const response = await axios.get(`${MAP_BASE_URL}/geocode/search`, {
//       params: {
//         api_key: MAP_API_KEY,
//         text: query, // User's input
//         size: 5, // Number of suggestions
//         "boundary.country": "IN", // Restrict to India
//         layers: "locality,neighbourhood,address",
//       },
//     });

//     return response.data.features; // Returns an array of location suggestions
//   } catch (error) {
//     console.error("Error fetching location suggestions:", error);
//     throw error;
//   }
// };

// Function to get route between pickup and dropoff points
// export const getRoute = async (pickup, dropoff) => {
//   try {
//     const response = await axios.get(
//       `${MAP_BASE_URL}/v2/directions/driving-car`,
//       {
//         params: {
//           api_key: MAP_API_KEY,
//           start: `${pickup[1]},${pickup[0]}`, // Longitude,Latitude
//           end: `${dropoff[1]},${dropoff[0]}`,
//         },
//       }
//     );

//     return response.data.features[0]; // Returns route details
//   } catch (error) {
//     console.error("Error fetching route:", error);
//     throw error;
//   }
// };
