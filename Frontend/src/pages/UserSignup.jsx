import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const UserSignup = () => {
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = await response.data.user;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setemail("");
    setfirstName("");
    setpassword("");
    setlastName("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-5"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt=""
        />

        <form onSubmit={onSubmitHandler}>
          <h2 className="text-lg font-medium mb-2">What's your name?</h2>
          <div className="flex gap-3 mb-5">
            <input
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 text-lg placeholder:text-base outline-none"
              type="text"
              placeholder="first name"
              required
              value={firstname}
              onChange={(e) => setfirstName(e.target.value)}
            />

            <input
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 text-lg placeholder:text-base outline-none"
              type="text"
              placeholder="last name"
              required
              value={lastname}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>

          <label className="text-lg font-medium mb-2" htmlFor="email">
            What's your email?
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
          <Link to="/user-login" className="text-blue-600">
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

export default UserSignup;
