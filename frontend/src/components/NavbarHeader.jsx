import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarHeader = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <nav className="bg-black w-full py-4">
      <div className="max-w-7xl mx-auto px-6">
        <h1
          className="text-white text-2xl cursor-pointer"
          onClick={handleNavigate}
        >
          Uber
        </h1>
      </div>
    </nav>
  );
};

export default NavbarHeader;
