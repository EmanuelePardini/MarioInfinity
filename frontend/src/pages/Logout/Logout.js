import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../config/redux/authSlice";
import axios from "axios";
import "./Logout.css";

const Logout = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.post(`${apiUrl}/api/logout`)
      .then((response) => {
        dispatch(logout());
        navigate("/MarioInfinity/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }, [navigate]);
  

  return (
    <div className="logout-container">
      <p className="logout-message">Logging out...</p>
    </div>
  );
};

export default Logout;
