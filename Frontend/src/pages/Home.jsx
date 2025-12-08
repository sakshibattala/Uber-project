import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { LocationSearchPanel } from "../components/LocationSearchPanel";
import { VehiclePanel } from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [locationPanelOpen, setlocationPanelOpen] = useState(false);
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setconfirmRidePanelOpen] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseIconRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(panelRef.current, {
        height: locationPanelOpen ? "70%" : "0%",
        padding: locationPanelOpen ? "20px" : "0px",
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(panelCloseIconRef.current, {
        opacity: locationPanelOpen ? 1 : 0,
        duration: 0.25,
        ease: "power2.out",
      });
    },
    { dependencies: [locationPanelOpen] }
  );

  useGSAP(
    () => {
      gsap.to(vehiclePanelRef.current, {
        y: vehiclePanelOpen ? 0 : "100%",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [vehiclePanelOpen] }
  );

  useGSAP(
    () => {
      gsap.to(confirmRidePanelRef.current, {
        y: confirmRidePanelOpen ? 0 : "100%",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [confirmRidePanelOpen] }
  );

  useGSAP(
    () => {
      gsap.to(vehicleFoundRef.current, {
        y: vehicleFound ? 0 : "100%",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [vehicleFound] }
  );

  useGSAP(
    () => {
      gsap.to(waitingForDriverRef.current, {
        y: waitingForDriver ? 0 : "100%",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [waitingForDriver] }
  );

  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp"
        alt="logo"
      />

      {/* map */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/amitshekhariitbhu/ridesharing-uber-lyft-app/master/assets/nearby-cabs.png"
          alt="background"
        />
      </div>

      {/* find a trip + location panel */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] px-6 py-5 bg-white relative">
          <h1
            onClick={() => setlocationPanelOpen(false)}
            ref={panelCloseIconRef}
            className="absolute right-6 top-5 text-lg font-semibold opacity-0 cursor-pointer"
          >
            <i className="ri-arrow-down-wide-fill"></i>
          </h1>

          <h2 className="text-xl font-semibold">Find a trip</h2>

          <form className="mt-4 space-y-3 relative">
            <span className="absolute left-6 top-3.5 h-3 w-3 rounded-full bg-green-500"></span>
            <div className="absolute left-[28px] top-6 h-[45px] w-[1.5px] bg-gray-300"></div>
            <span className="absolute left-6 top-[66px] h-3 w-3 rounded-full bg-red-500"></span>

            <input
              onClick={() => setlocationPanelOpen(true)}
              value={pickup}
              onChange={(e) => setpickup(e.target.value)}
              className="bg-[#f5f5f5] px-12 py-2 text-base rounded-lg w-full outline-none"
              type="text"
              placeholder="Add a pick-up location"
            />

            <input
              onClick={() => setlocationPanelOpen(true)}
              value={destination}
              onChange={(e) => setdestination(e.target.value)}
              className="bg-[#f5f5f5] px-12 py-2 text-base rounded-lg w-full outline-none"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        <div
          ref={panelRef}
          className="h-0 bg-white rounded-t-xl overflow-hidden"
        >
          <LocationSearchPanel
            setvehiclePanelOpen={setvehiclePanelOpen}
            setlocationPanelOpen={setlocationPanelOpen}
          />
        </div>
      </div>

      {/* vehicle selection panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 left-0 right-0 bg-white z-[999] px-3 py-10 pt-12 translate-y-full"
      >
        <VehiclePanel
          setconfirmRidePanelOpen={setconfirmRidePanelOpen}
          setvehiclePanelOpen={setvehiclePanelOpen}
        />
      </div>

      {/* confirm ride panel  */}
      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 left-0 right-0 bg-white z-[999] px-3 py-10 pt-12 translate-y-full"
      >
        <ConfirmRide
          setconfirmRidePanelOpen={setconfirmRidePanelOpen}
          setvehicleFound={setvehicleFound}
        />
      </div>

      {/* looking for a driver  */}
      <div
        ref={vehicleFoundRef}
        className="fixed bottom-0 left-0 right-0 bg-white z-[999] px-3 py-10 pt-12 translate-y-full"
      >
        <LookingForDriver setvehicleFound={setvehicleFound} />
      </div>

      {/* waiting for a driver  */}
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 left-0 right-0 bg-white translate-y-full z-[999] px-3 py-10 pt-12 "
      >
        <WaitingForDriver setwaitingForDriver={setwaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
