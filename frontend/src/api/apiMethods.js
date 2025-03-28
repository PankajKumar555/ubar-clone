import axiosInstance from "./config";

export const endpoints = {
  registerUser: "/users/register",
  loginUser: "/users/login",
  registerCaption: "/captions/register",
  loginCaption: "/captions/login",
  getCoordinates: "/location/get-coordinates",
  getDistanceTime: "/location/get-distance-time",
  getFare: "rides/get-fare",
  createRide: "rides/create",
};

// GET Request: Fetch data from an API endpoint
export const fetchData = async (endpoint, token = null) => {
  // console.log("--------", token);
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    // Add Authorization header only if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axiosInstance.get(endpoint, { headers });
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// POST Request: Send data to an API endpoint
export const postData = async (endpoint, data, token = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axiosInstance.post(endpoint, data, {
      headers,
    });
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    };
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
