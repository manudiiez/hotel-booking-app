import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate()

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"}>
          <span className="logo">lamabooking</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <button className="navButton" >Register</button>
            <button className="navButton" onClick={() => navigate('/login')}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
