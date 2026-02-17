import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainContext } from "../context/CaptainContext";
import { useEffect } from "react";
import axios from "axios";
import LiveLocationMap from "../components/LiveLocationMap";

const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setconfirmRidePopupPanel] = useState(false);
  const [newRide, setnewRide] = useState(null);

  const ridePopupRef = useRef(null);
  const confirmRidePopupRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainContext);

  useGSAP(
    () => {
      gsap.to(ridePopupRef.current, {
        y: ridePopupPanel ? 0 : "100%",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [ridePopupPanel] }
  );

  useGSAP(
    () => {
      gsap.to(confirmRidePopupRef.current, {
        y: confirmRidePopupPanel ? 0 : "100%",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [confirmRidePopupPanel] }
  );

  useEffect(() => {
    if (!socket || !captain?._id) return;

    socket.emit("join", { id: captain._id, userType: "captain" });

    const handleNewRide = (msg) => {
      console.log("🚕 new-ride received");
      setnewRide(msg);
      setridePopupPanel(true);
    };

    socket.on("new-ride", handleNewRide);

    const currentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-captain-location", {
            id: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const updateLocation = setInterval(currentLocation, 10000);
    currentLocation();

    return () => {
      socket.off("new-ride", handleNewRide);
      clearInterval(updateLocation);
    };
  }, [socket, captain?._id]);

  const confirmRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,
        {
          rideId: newRide._id,
          captain,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  return (
    <div className="h-screen">
      <div className="fixed flex items-center justify-between p-5 w-full">
        <img
          className="w-16"
          src="https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp"
          alt="logo"
        />
        <Link
          to="/captain-logout"
          className="bg-gray-50 rounded-full flex items-center justify-center top-2 h-8 w-8"
        >
          <i className="text-lg font-medium ri-logout-circle-r-line"></i>
        </Link>
      </div>

      {/* map  */}
      <div className="h-3/5">
        <div className="h-full w-full">
          <img
            className="h-full w-full object-cover"
            src="https://raw.githubusercontent.com/amitshekhariitbhu/ridesharing-uber-lyft-app/master/assets/nearby-cabs.png"
            alt="background"
          />

          {/* <LiveLocationMap /> */}
        </div>
      </div>

      {/* captain details panel */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* ride available popup */}
      <div
        ref={ridePopupRef}
        className="fixed bottom-0 left-0 right-0 bg-white z-[999] px-3 py-10 pt-12 translate-y-full"
      >
        <RidePopup
          confirmRide={confirmRide}
          newRide={newRide}
          setridePopupPanel={setridePopupPanel}
          setconfirmRidePopupPanel={setconfirmRidePopupPanel}
        />
      </div>

      {/* confirm ride popup */}
      <div
        ref={confirmRidePopupRef}
        className="fixed bottom-0 h-screen left-0 right-0 bg-white z-[999] px-3 py-10 pt-12 translate-y-full"
      >
        <ConfirmRidePopup
          captain={captain}
          newRide={newRide}
          setconfirmRidePopupPanel={setconfirmRidePopupPanel}
          setridePopupPanel={setridePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
