import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    
    <div className="footer">
    {isAuthenticated ? (
      <>
        <Link className="footer-link" to="/MarioInfinity/logout">Logout</Link>
        <Link className="footer-link" to="/MarioInfinity/ranks">Ranks</Link>
      </>
    ) : (
      <>
        <Link className="footer-link" to="/MarioInfinity/login">Login</Link>
        <Link className="footer-link" to="/MarioInfinity/ranks">Ranks</Link>
      </>
    )}
  </div>
);
};
export default Footer