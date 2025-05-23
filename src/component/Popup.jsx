import React from "react";
import { FaShareAlt } from "react-icons/fa";

const Popup = ({ onClose, result }) => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Background blur */}
      <div className="absolute inset-0 bg-[#7f7f7f]/10 backdrop-blur-[1px]"></div>

      {/* Centered Popup */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <div className="bg-white border-4 border-green-700 px-10 py-12 text-center shadow-xl w-[90vw] max-w-md rounded-md">
          <h1 className="text-5xl font-bold text-black mb-2">{result}</h1>
          <p className="text-gray-700 mb-4">Selected</p>
          <div className="text-gray-500 text-xl flex justify-center mb-6">
            <FaShareAlt />
          </div>
          <div className="flex justify-center items-center text-sm text-gray-700">
            <img
              src="https://pickerwheel.com/favicon.ico"
              alt="Picker Wheel"
              className="w-4 h-4 mr-2"
            />
            Picker Wheel
          </div>
        </div>

        {/* External Done Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-600 rounded shadow"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
