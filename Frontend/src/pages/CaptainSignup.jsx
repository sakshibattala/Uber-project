import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [captainData, setcaptainData] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setcaptainData({
      fullname: {
        firstName,
        lastName,
      },
      email,
      password,
    });

    setemail("");
    setfirstName("");
    setpassword("");
    setlastName("");
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
          <h2 className="text-lg font-medium mb-2">What's our captain name?</h2>
          <div className="flex gap-3 mb-5">
            <input
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 text-lg placeholder:text-base outline-none"
              type="text"
              placeholder="first name"
              required
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />

            <input
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 text-lg placeholder:text-base outline-none"
              type="text"
              placeholder="last name"
              required
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>

          <label className="text-lg font-medium mb-2" htmlFor="email">
            What's our captain email?
          </label>
          <input
            className="bg-[#eeeeee] mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base outline-none"
            id="email"
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          <label className="text-lg font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="bg-[#eeeeee] mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base outline-none"
            id="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Register
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here!
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
