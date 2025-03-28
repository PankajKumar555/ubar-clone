import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  //   faBox,
  //   faTaxi,
  //   faBus,
  faBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const NavbarUser = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b-3 border-gray-300">
      {/* Left Side: Uber Logo & Options */}
      <div className="flex items-center space-x-16 px-16">
        <h1 className="text-3xl">Uber</h1>
        <div className="flex items-center space-x-4 text-black">
          <div className="flex items-center space-x-1 font-medium border-b-2 border-black pb-1">
            <FontAwesomeIcon icon={faCar} />
            &nbsp;
            <span>Ride</span>
          </div>
          {/* <div className="flex items-center space-x-1 text-gray-500">
            <FontAwesomeIcon icon={faBox} />
            <span>Courier</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Rentals</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <FontAwesomeIcon icon={faBus} />
            <span>Shuttle</span>
          </div> */}
        </div>
      </div>

      {/* Right Side: Activity & Profile */}
      <div className="flex items-center space-x-4 px-16">
        <div className="flex items-center space-x-1 text-gray-800">
          <FontAwesomeIcon icon={faBookmark} />
          <span>Activity</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="text-gray-600" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;
