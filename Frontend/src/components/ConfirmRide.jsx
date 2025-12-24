import React from "react";

const ConfirmRide = ({
  setconfirmRidePanelOpen,
  setvehicleFound,
  vehicleType,
  pickup,
  destination,
  fare,
  createRide,
}) => {
  const vehicleImage =
    vehicleType === "car"
      ? "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
      : vehicleType === "motorcycle"
      ? "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
      : "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n";

  return (
    <div className="p-3">
      <h1
        className="p-1 text-center w-[93%] absolute top-2"
        onClick={() => setconfirmRidePanelOpen(false)}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h1>

      <h3 className="text-2xl font-semibold mb-3">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img className="h-30" src={vehicleImage} alt="" />
      </div>

      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-sm -mt-1 text-gray-600">{pickup}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-5-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm -mt-1 text-gray-600">{destination}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹{fare[vehicleType]}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
          </div>
        </div>

        <button
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
          onClick={() => {
            setvehicleFound(true);
            setconfirmRidePanelOpen(false);
            createRide();
          }}
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
