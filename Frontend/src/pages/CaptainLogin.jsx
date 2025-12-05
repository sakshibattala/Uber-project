import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [captainData, setcaptainData] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setcaptainData({ email, password });

    setemail("");
    setpassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />

        <form onSubmit={onSubmitHandler}>
          <label className="text-lg font-medium mb-2" htmlFor="email">
            What's our captain email?
          </label>
          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base outline-none"
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />

          <label className="text-lg font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base outline-none"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain!
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/user-login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
