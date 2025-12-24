import React from "react";

const WaitingForDriver = ({
  rideDetails,
  setwaitingForDriver,
  vehicleType,
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
        className="text-center w-[93%] absolute top-2"
        onClick={() => setwaitingForDriver(false)}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h1>

      <div className="flex items-center justify-between">
        <img className="h-20" src={vehicleImage} alt="" />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">
            {rideDetails?.captain.fullname.firstname +
              " " +
              rideDetails?.captain.fullname.lastname}
          </h2>
          <h4 className="text-lg text-gray-600 -mt-1 -mb-1">
            {rideDetails?.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">
            {vehicleType === "car"
              ? "Maruti Suzuki Alto"
              : vehicleType === "auto"
              ? "UberGo"
              : "Moto"}
          </p>
          <p className="text-lg font-medium text-gray-600">
            OTP: {rideDetails?.otp}
          </p>
        </div>
      </div>

      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-sm -mt-1 text-gray-600">{rideDetails?.pickup}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-5-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {rideDetails?.destination}{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹{rideDetails?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
