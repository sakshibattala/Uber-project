import React from "react";

const ConfirmRide = (props) => {
  return (
    <div className="p-3">
      <h1
        className="p-1 text-center w-[93%] absolute top-2"
        onClick={() => props.setconfirmRidePanelOpen(false)}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h1>

      <h3 className="text-2xl font-semibold">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-30"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
      </div>

      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Kamala puri colony, Hyderabad
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-5-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Kamala puri colony, Hyderabad
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹198.45</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
          </div>
        </div>

        <button
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
          onClick={() => {
            props.setvehicleFound(true);
            props.setconfirmRidePanelOpen(false);
          }}
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
