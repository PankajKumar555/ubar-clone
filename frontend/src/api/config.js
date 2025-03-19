import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Replace with your API base URL
  timeout: 10000, // Optional: set a timeout for requests in ms
  headers: {
    "Content-Type": "application/json", // You can modify this based on your API requirements
    // Authorization: `Bearer ${localStorage.getItem('token')}` // Uncomment if you need an Authorization header
  },
});

// Set up response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle different error statuses here, such as showing a notification
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
