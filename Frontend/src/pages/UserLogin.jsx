import React, { useState } from "react";
import { Link } from "react-router-dom";

const Userlogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userdata, setuserdata] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setuserdata({
      email,
      password,
    });

    setemail("");
    setpassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt=""
        />

        <form onSubmit={onSubmitHandler}>
          <label className="text-lg font-medium mb-2" htmlFor="email">
            What's your email?
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
          New here?{" "}
          <Link to="/user-signup" className="text-blue-600">
            Create an account!
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default Userlogin;
