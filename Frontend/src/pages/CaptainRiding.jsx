import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finishRidePanel, setfinishRidePanel] = useState(false);

  const finishRideRef = useRef(null);

  const location = useLocation();
  const { newRide } = location.state || {};

  useGSAP(
    () => {
      gsap.to(finishRideRef.current, {
        y: finishRidePanel ? 0 : "100%",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [finishRidePanel] }
  );

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

      <div className="h-4/5">
        <div className="h-full w-full">
          <img
            className="h-full w-full object-cover"
            src="https://raw.githubusercontent.com/amitshekhariitbhu/ridesharing-uber-lyft-app/master/assets/nearby-cabs.png"
            alt="background"
          />
        </div>
      </div>

      <div
        className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10"
        onClick={() => setfinishRidePanel(true)}
      >
        <h5 className="p-1 text-center w-[90%] absolute top-0">
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>

      <div
        className="fixed bottom-0 h-screen left-0 right-0 bg-white z-[999] px-3 py-10 pt-12 translate-y-full"
        ref={finishRideRef}
      >
        <FinishRide newRide={newRide} setfinishRidePanel={setfinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
