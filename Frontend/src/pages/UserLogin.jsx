import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Userlogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        user
      );

      if (response.status === 200) {
        const data = await response.data;
        toast.success("Login Success");
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");

        setemail("");
        setpassword("");
        return;
      }
    } catch (err) {
      const res = err.response;
      if (!res) {
        toast.error("Network error — try again!");
        return;
      }

      const data = res.data;

      // If express-validator sent an array of errors
      if (Array.isArray(data?.errors)) {
        toast.error(data.errors[0].msg);
      }

      // backend custom error message
      else if (data?.message) {
        toast.error(data.message);
      } else {
        toast.error("something went wrong");
      }
    }
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
