import React from "react";

const LookingForDriver = (props) => {
  return (
    <div className="p-3">
      <h1
        className="text-center w-[93%] absolute top-2"
        onClick={() => props.setvehicleFound(false)}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h1>

      <h3 className="text-2xl font-semibold">Looking for a driver</h3>

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
      </div>
    </div>
  );
};

export default LookingForDriver;
