import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-between pt-8 bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1566243052021-d39ace07c392?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
      <img
        className="w-14 ml-8"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber-logo"
      />
      <div className="bg-white px-4 py-4 pb-7">
        <h3 className="text-2xl font-bold">Get Started with Uber</h3>
        <Link
          to="/user-login"
          className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
