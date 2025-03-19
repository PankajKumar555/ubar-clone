import axiosInstance from "./config";

export const endpoints = {
  registerUser: "/users/register",
  loginUser: "/users/login",
  registerCaption: "/captions/register",
  loginCaption: "/captions/login",
};

// GET Request: Fetch data from an API endpoint
export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
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
export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
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
