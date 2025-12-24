import React from "react";

export const LocationSearchPanel = ({
  setlocationPanelOpen,
  setvehiclePanelOpen,
  setpickup,
  setdestination,
  activeInputField,
  pickupSuggestions,
  destinationSuggestions,
}) => {
  const handleLocationClick = (location) => {
    if (activeInputField === "pickup")
      setpickup([location.name, location.full_address].join(","));
    else setdestination([location.name, location.full_address].join(","));
  };

  return (
    <>
      {(activeInputField === "pickup"
        ? pickupSuggestions
        : destinationSuggestions
      ).map((location, idx) => {
        return (
          <div
            onClick={() => handleLocationClick(location)}
            key={idx}
            className="cursor-pointer mt-0 flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <p className="font-medium">
              {location.name} {location.full_address}
            </p>
          </div>
        );
      })}
    </>
  );
};
