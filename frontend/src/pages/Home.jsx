import React from "react";
import hero from "../assets/Signup.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div style={{ background: "#fff" }}>
      <Navbar />
      <div style={{ backgroundColor: "#F6F6F6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center  justify-between gap-4 px-16 pb-8 ">
            <p
              className="text-5xl font-bold ubar-font"
              style={{ color: "#333333" }}
            >
              Log in to access your account
            </p>
            <img src={hero} alt="SignUp" className="w-140 h-auto" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 max-w-7xl mx-auto p-16 gap-8">
        {/* <!-- Driver Section --> */}
        <div
          className="flex flex-row justify-between items-center border-b pb-12 hover-effect cursor-pointer"
          onClick={() => handleNavigate("caption-login")}
        >
          <h2 className="text-4xl font-bold">Driver</h2>
          <div className="arrow-wrapper text-4xl">
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
          </div>
        </div>

        {/* <!-- Rider Section --> */}
        <div
          className="flex flex-row justify-between items-center border-b pb-12 hover-effect cursor-pointer"
          onClick={() => handleNavigate("login")}
        >
          <h2 className="text-4xl font-bold">Rider</h2>
          <div className="arrow-wrapper text-4xl">
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
