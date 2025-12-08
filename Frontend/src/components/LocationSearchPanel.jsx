import React from "react";

export const LocationSearchPanel = (props) => {
  const locations = [
    "Flat No. 302, Prestige Sunrise, Whitefield, Banglore",
    "12th Main Road, Indiranagar 2nd Stage, Hyderabad",
    "Sector 4, HSR Layout, Near BDA Complex, Chennai",
    "Block A-17, Embassy Tech Village Campus, Kochi",
  ];

  return (
    <>
      {locations.map((location, idx) => {
        return (
          <div
            onClick={() => {
              props.setvehiclePanelOpen(true);
              props.setlocationPanelOpen(false);
            }}
            key={idx}
            className="cursor-pointer mt-0 flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <p className="font-medium">{location}</p>
          </div>
        );
      })}
    </>
  );
};
