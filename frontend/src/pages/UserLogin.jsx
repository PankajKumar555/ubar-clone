import React from "react";
import NavbarHeader from "../components/NavbarHeader";
import { useNavigate } from "react-router-dom";
import { endpoints, postData } from "../api/apiMethods";
import { toast } from "react-toastify";

export const UserLogin = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(`/${path}`);
  };

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await postData(endpoints.loginUser, formData);
      if (responce?.status === 200) {
        toast.success("Login successfully! 🎉");
        // navigate("/login");
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      if (error.response?.status === 400) {
        const errorMessages = error.response?.data?.errors || [];
        errorMessages.forEach((err) => toast.error(err.msg)); // Show each validation error
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password!");
      } else {
        toast.error("Something went wrong!");
      }
      console.log(error);
    }
  };

  return (
    <>
      <NavbarHeader />
      <div className="flex flex-col items-center justify-center mt-4 p-4">
        <div className="max-w-xs w-full ">
          <p className="text-2xl ">What's your phone number or email?</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChnage}
              placeholder="Enter phone number or email"
              className="w-full rounded-lg p-3 text-md mb-4 mt-4 focus:outline focus:outline-2 focus:outline-black text-gray"
              style={{ background: "#eee" }}
              required
            />
            <input
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleChnage}
              placeholder="Enter password"
              className="w-full rounded-lg p-3 text-md mb-4 focus:outline focus:outline-2 focus:outline-black text-gray"
              style={{ background: "#eee" }}
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg text-md font-medium cursor-pointer"
            >
              Continue
            </button>
          </form>

          <div className="flex items-center gap-2 my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 text-black p-3 rounded-lg text-md font-medium mb-4 cursor-pointer"
            style={{ background: "#eee" }}
          >
            {/* <img src="/google-icon.svg" alt="Google" className="w-5 h-5" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Continue with Google
          </button>

          <button
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg text-md font-medium mb-4 cursor-pointer"
            style={{ background: "#eee" }}
          >
            {/* <img src="/apple-icon.svg" alt="Apple" className="w-5 h-5" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 50 50"
            >
              <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
            </svg>
            Continue with Apple
          </button>
          <div className="flex items-center gap-2 my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-lg text-md font-medium mb-4 cursor-pointer"
            style={{ background: "#eee" }}
            onClick={() => handleNavigate("signup")}
          >
            <p className="text-sm text-gray-500">
              New to Uber? &nbsp;
              <a href="#" className="text-black font-semibold">
                Create an account
              </a>
            </p>
          </button>

          <p className="max-w-sm w-full text-center text-sm text-gray-500 mt-4">
            By proceeding, you consent to get calls, WhatsApp or SMS/RCS
            messages, including by automated means, from Uber and its affiliates
            to the number provided.
          </p>
        </div>
      </div>
    </>
  );
};
