import React from "react";

const RidePopup = ({
  setridePopupPanel,
  setconfirmRidePopupPanel,
  newRide,
  confirmRide,
}) => {
  return (
    <div className="p-3">
      <h1
        className="p-1 text-center w-[93%] absolute top-2"
        onClick={() => {
          setridePopupPanel(false);
        }}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h1>

      <h3 className="text-2xl font-semibold mb-5">New ride available!</h3>

      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {newRide?.userId.fullname.firstname +
              " " +
              newRide?.userId.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup </h3>
            <p className="text-sm -mt-1 text-gray-600 capitalize">
              {newRide?.pickup}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-5-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm -mt-1 text-gray-600 capitalize">
              {newRide?.destination}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹{newRide?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
          </div>
        </div>

        <button
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg py-3"
          onClick={() => {
            setconfirmRidePopupPanel(true);
            setridePopupPanel(false);
            confirmRide();
          }}
        >
          Accept Ride
        </button>

        <button
          className="w-full mt-3 bg-gray-300 text-black font-semibold p-2 rounded-lg py-3"
          onClick={() => {
            setridePopupPanel(false);
          }}
        >
          Ignore Ride
        </button>
      </div>
    </div>
  );
};

export default RidePopup;
