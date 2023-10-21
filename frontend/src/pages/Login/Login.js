import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../config/redux/authSlice";
import axios from "axios";
import "./Login.css"; 

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(apiUrl + "/api/login", { email, password })
    .then((response) => {
      dispatch(login(response.data.user));
      console.log(response.data.user);
      navigate("/MarioInfinity");
    })
    .catch((error) => {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    })
  };  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/MarioInfinity/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
