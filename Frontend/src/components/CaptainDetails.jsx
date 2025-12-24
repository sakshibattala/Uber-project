import React from "react";
import { useContext } from "react";
import { CaptainContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainContext);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://thumbs.dreamstime.com/b/close-up-young-man-white-background-boy-looking-camera-feeling-58697864.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h2>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹295.20</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-sm p-3 mt-5">
        <div className="flex flex-col justify-center text-center">
          <i className="ri-time-line"></i>
          <h2 className="text-xl font-semibold">10.2</h2>
          <p className="text-sm text-gray-600">Hours online</p>
        </div>

        <div className="flex flex-col justify-center text-center">
          <i className="ri-speed-up-line"></i>
          <h2 className="text-xl font-semibold">10.2</h2>
          <p className="text-sm text-gray-600">Hours online</p>
        </div>

        <div className="flex flex-col justify-center text-center">
          <i className="ri-booklet-line"></i>
          <h2 className="text-xl font-semibold">10.2</h2>
          <p className="text-sm text-gray-600">Hours online</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
