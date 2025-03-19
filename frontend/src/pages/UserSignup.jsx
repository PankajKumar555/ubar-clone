import React, { useState } from "react";
import NavbarHeader from "../components/NavbarHeader";
import { useNavigate } from "react-router-dom";
import { endpoints, postData } from "../api/apiMethods";
import { toast } from "react-toastify";

export const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      fullname:
        name in { firstName: 1, lastName: 1 }
          ? {
              ...prev.fullname,
              [name === "firstName" ? "firstname" : "lastname"]: value,
            }
          : prev.fullname,
      ...(name !== "firstName" && name !== "lastName" && { [name]: value }),
    }));
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const responce = await postData(endpoints.registerUser, formData);
      if (responce?.status === 201) {
        toast.success("Account created successfully! 🎉");
        navigate("/login");
        setFormData({
          fullname: {
            firstname: "",
            lastname: "",
          },
          email: "",
          password: "",
        });
      } else if (responce?.status === 200) {
        toast.error("Email is Already Registered!");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        const errorMessages = error.response?.data?.errors || [];
        errorMessages.forEach((err) => toast.error(err.msg)); // Show each validation error
      } else {
        toast.error("Something went wrong!");
      }
      console.log(error);
    }
  };

  return (
    <>
      <NavbarHeader />
      <div className="flex flex-col items-center justify-center mt-8 p-4">
        <div className="max-w-xs w-full">
          <p className="text-2xl mb-4 text-center">Create an account</p>

          {/* Signup Form */}
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="firstName"
              value={formData.fullname.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full rounded-lg p-3 text-md mb-3 focus:outline focus:outline-2 focus:outline-black"
              style={{ background: "#eee" }}
              required
            />

            <input
              type="text"
              name="lastName"
              value={formData.fullname.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full rounded-lg p-3 text-md mb-3 focus:outline focus:outline-2 focus:outline-black"
              style={{ background: "#eee" }}
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-lg p-3 text-md mb-3 focus:outline focus:outline-2 focus:outline-black"
              style={{ background: "#eee" }}
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-lg p-3 text-md mb-3 focus:outline focus:outline-2 focus:outline-black"
              style={{ background: "#eee" }}
              required
            />

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg text-md font-medium cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          {/* OR Line */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Login Button */}
          <button
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg text-md font-medium cursor-pointer"
            onClick={() => navigate("/login")}
            style={{ background: "#eee" }}
          >
            Already have an account?{" "}
            <span className="text-black font-semibold">Log in</span>
          </button>
        </div>
      </div>
    </>
  );
};
