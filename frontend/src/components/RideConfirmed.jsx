import { FaStar, FaPhone, FaEllipsisH } from "react-icons/fa";
import { FiSend } from "react-icons/fi"; // Import send icon

const RideConfirmed = () => {
  return (
    <div className="max-w-sm bg-white m-auto">
      <div className="flex items-center justify-between">
        <p className="text-gray-900 font-semibold">PIN for this ride</p>
        <div className="flex space-x-1">
          {[4, 5, 3, 1].map((num, index) => (
            <div
              key={index}
              className="w-5 h-5 bg-blue-700 text-white text-sm flex items-center justify-center rounded-xs"
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      <div className="border-2 border-gray-300 p-2 rounded-xl mt-2">
        {/* Pickup Info */}
        <div className="flex justify-between items-center border-b pb-2">
          <p className="text-gray-900 text-lg font-semibold">
            Meet at your pickup spot on <br /> 123 Main Street
          </p>
          <div className="bg-black text-white px-3 py-3 rounded-xs text-sm font-bold">
            5 min
          </div>
        </div>

        {/* Driver & Car Info */}
        <div className="flex items-center gap-3 mt-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/8583/8583437.png"
            alt="Driver"
            className="w-13 h-13 rounded-full bg-cover bg-center bg-no-repeat"
            style={{ objectFit: "cover", zIndex: 10 }}
          />
          <img
            src="https://i.pinimg.com/736x/0e/0d/a2/0e0da2818b70f0eed5f478bd4a893b13.jpg"
            alt="Driver"
            className="w-14 h-14 rounded-full bg-cover bg-center bg-no-repeat"
            style={{ objectFit: "cover", marginLeft: "-24px" }}
          />
          <div className="flex-1">
            <p className="text-gray-900 font-bold">Anderson</p>
            <p className="text-gray-600 text-sm">Silver Honda Civic</p>
          </div>
          <p className="text-xl font-bold">3M53AF2</p>
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-full">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-black text-sm"
              placeholder="Send a message"
            />
            <button className="ml-2 text-gray-600 hover:text-black">
              <FiSend size={20} />
            </button>
          </div>
          <button className="bg-gray-200 p-2 rounded-full">
            <FaPhone />
          </button>
          <button className="bg-gray-200 p-2 rounded-full">
            <FaEllipsisH />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideConfirmed;
