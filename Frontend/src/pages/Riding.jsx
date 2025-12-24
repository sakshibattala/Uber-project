import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const Riding = () => {
  const location = useLocation();
  const { ride, vehicleType } = location.state || {};

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const handleRideCompleted = (ride) => {
      console.log("✅ ride completed");
    };

    socket.on("ride-completed", handleRideCompleted);

    return () => {
      socket.off("ride-completed", handleRideCompleted);
    };
  }, [socket]);

  const vehicleImage =
    vehicleType === "car"
      ? "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
      : vehicleType === "motorcycle"
      ? "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
      : "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n";

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="bg-gray-50 rounded-full flex items-center justify-center fixed right-2 top-2 h-8 w-8"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/amitshekhariitbhu/ridesharing-uber-lyft-app/master/assets/nearby-cabs.png"
          alt=""
        />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img className="h-12" src={vehicleImage} alt="" />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride?.captain.fullname.firstname +
                " " +
                ride?.captain.fullname.lastname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain.plate}
            </h4>
            <p className="text-sm text-gray-600">
              {vehicleType === "car"
                ? "Maruti Suzuki Alto"
                : vehicleType === "auto"
                ? "UberGo"
                : "Moto"}
            </p>
          </div>
        </div>

        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="ri-map-pin-5-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {ride?.destination}{" "}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
