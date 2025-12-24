import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Logged out");
          localStorage.removeItem("token");
          navigate("/user-login");
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/user-login");
      }
    };

    logout();
  }, []); // 👈 runs only once when component mounts

  return <div>Logging you out...</div>;
};

export default UserLogout;
