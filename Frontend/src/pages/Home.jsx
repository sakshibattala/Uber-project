import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { LocationSearchPanel } from "../components/LocationSearchPanel";
import { VehiclePanel } from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [locationPanelOpen, setlocationPanelOpen] = useState(false);
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setconfirmRidePanelOpen] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false); // looking for drivers
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [pickupSuggestions, setpickupSuggestions] = useState([]);
  const [destinationSuggestions, setdestinationSuggestions] = useState([]);
  const [activeInputField, setactiveInputField] = useState(null);
  const [fare, setfare] = useState({});
  const [distanceAway, setdistanceAway] = useState(0);
  const [vehicleType, setvehicleType] = useState(null);
  const [rideDetails, setrideDetails] = useState(null);

  const panelRef = useRef(null);
  const panelCloseIconRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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

  const handleUserLogout = async () => {
    navigate("/user-logout");
  };

  const handlePickupChange = async (e) => {
    setpickup(e.target.value);
    setactiveInputField("pickup");

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: {
          input: e.target.value,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setpickupSuggestions(response.data);
  };

  const handleDestinationChange = async (e) => {
    setdestination(e.target.value);
    setactiveInputField("destination");

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: {
          input: e.target.value,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setdestinationSuggestions(response.data);
  };

  const handleFindTrip = async (e) => {
    e.preventDefault();
    setlocationPanelOpen(false);
    setvehiclePanelOpen(true);

    const fareResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup,
          destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const durationResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`,
      {
        params: {
          source: pickup,
          destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setdistanceAway(durationResponse.data.durationInMin);
    setfare(fareResponse.data);
  };

  const createRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
      { pickup, destination, vehicleType },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  useEffect(() => {
    if (!socket || !user?._id) return;

    socket.emit("join", { id: user._id, userType: "user" });

    const handleRideConfirmed = (ride) => {
      console.log("✅ ride-confirmed received");
      setrideDetails(ride);
      setvehicleFound(false);
      setwaitingForDriver(true);
    };

    socket.on("ride-confirmed", handleRideConfirmed);

    const handleRideStarted = (ride) => {
      setwaitingForDriver(false);
      navigate("/riding", { state: { ride, vehicleType } });
    };

    socket.on("ride-started", handleRideStarted);

    const handleRideFinish = (ride) => {
      navigate("/home");
    };

    socket.on("ride-completed", handleRideFinish);

    return () => {
      socket.off("ride-confirmed", handleRideConfirmed);
    };
  }, [socket, user?._id]);

  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp"
        alt="logo"
      />

      {!locationPanelOpen && (
        <div className="text-xl absolute right-5 top-5 bg-white rounded-full flex justify-center items-center z-[9999]">
          <i className="ri-logout-circle-r-line" onClick={handleUserLogout}></i>
        </div>
      )}

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
        <div className="h-[35%] px-6 py-5 bg-white relative">
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
              onChange={handlePickupChange}
              className="bg-[#f5f5f5] px-12 py-2 text-base rounded-lg w-full outline-none"
              type="text"
              placeholder="Add a pick-up location"
              required
            />

            <input
              onClick={() => setlocationPanelOpen(true)}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#f5f5f5] px-12 py-2 text-base rounded-lg w-full outline-none"
              type="text"
              placeholder="Enter your destination"
              required
            />

            <button
              onClick={handleFindTrip}
              className="w-full bg-black text-white rounded-lg py-2 mb-3"
            >
              Find a trip
            </button>
          </form>
        </div>

        <div
          ref={panelRef}
          className="h-0 bg-white rounded-t-xl overflow-hidden"
        >
          <LocationSearchPanel
            setvehiclePanelOpen={setvehiclePanelOpen}
            setlocationPanelOpen={setlocationPanelOpen}
            pickupSuggestions={pickupSuggestions}
            setpickup={setpickup}
            destinationSuggestions={destinationSuggestions}
            setdestination={setdestination}
            activeInputField={activeInputField}
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
          fare={fare}
          distanceAway={distanceAway}
          setvehicleType={setvehicleType}
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
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          fare={fare}
          createRide={createRide}
        />
      </div>

      {/* looking for a driver  */}
      <div
        ref={vehicleFoundRef}
        className="fixed bottom-0 left-0 right-0 bg-white z-[999] px-3 py-10 pt-12 translate-y-full"
      >
        <LookingForDriver
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          fare={fare}
          setvehicleFound={setvehicleFound}
        />
      </div>

      {/* waiting for a driver  */}
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 left-0 right-0 bg-white translate-y-full z-[999] px-3 py-10 pt-12 "
      >
        <WaitingForDriver
          vehicleType={vehicleType}
          rideDetails={rideDetails}
          setwaitingForDriver={setwaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
