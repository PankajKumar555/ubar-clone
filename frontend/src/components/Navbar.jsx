import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-30 py-3 flex justify-between items-center">
      {/* Left - Uber Logo */}

      {/* Middle - Navigation Links */}
      <ul className="hidden md:flex space-x-6 flex justify-between items-center">
        <li className="text-2xl ">
          <a href="#" className="hover:text-gray-400">
            Uber
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Ride
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Drive
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Business
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Uber Eats
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            About
          </a>
        </li>
      </ul>

      {/* Right - Language, Help, Sign In */}
      <div className="flex items-center space-x-5">
        <button className="flex items-center space-x-2 hover:text-gray-400">
          <FontAwesomeIcon icon={faGlobe} />
          <span>EN</span>
        </button>
        <a href="#" className="hover:text-gray-400">
          Help
        </a>
        <a href="#" className="hover:text-gray-400">
          Log in
        </a>
        <button className="bg-white text-black text-sm px-3 py-2.5 rounded-full hover:bg-gray-300">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
