import React from "react";

export const VehiclePanel = ({
  setconfirmRidePanelOpen,
  setvehiclePanelOpen,
  fare,
  distanceAway,
  setvehicleType,
}) => {
  return (
    <div className="p-3">
      <h1
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setvehiclePanelOpen(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h1>

      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

      <div
        onClick={() => {
          setconfirmRidePanelOpen(true);
          setvehiclePanelOpen(false);
          setvehicleType("car");
        }}
        className="flex border-2 border-gray-100 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img
          className="h-10"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />

        <div className="ml-2 w-1/2">
          <h3 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h3>
          <p className="font-medium text-sm">{distanceAway} min away</p>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>

        <h2 className="text-lg font-semibold">₹{fare.car}</h2>
      </div>

      <div
        onClick={() => {
          setconfirmRidePanelOpen(true);
          setvehiclePanelOpen(false);
          setvehicleType("motorcycle");
        }}
        className="flex border-2 border-gray-100 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img
          className="h-10"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
          alt=""
        />

        <div className="-ml-3 w-1/2">
          <h3 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h3>
          <p className="font-medium text-sm">{distanceAway} min away</p>
          <p className="font-normal text-xs text-gray-600">
            Affordable motorcycle rides
          </p>
        </div>

        <h2 className="text-lg font-semibold">₹{fare.motorcycle}</h2>
      </div>

      <div
        onClick={() => {
          setconfirmRidePanelOpen(true);
          setvehiclePanelOpen(false);
          setvehicleType("auto");
        }}
        className="flex border-2 border-gray-100 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img
          className="h-10"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
          alt=""
        />

        <div className="ml-2 w-1/2">
          <h3 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-fill"></i>3
            </span>
          </h3>
          <p className="font-medium text-sm">{distanceAway} min away</p>
          <p className="font-normal text-xs text-gray-600">
            Affordable auto rides
          </p>
        </div>

        <h2 className="text-lg font-semibold">₹{fare.auto}</h2>
      </div>
    </div>
  );
};
