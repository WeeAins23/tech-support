import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navigation = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("userId");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav id='menu' className='navbar navbar-default custom-nav'>
      <div className='nav-container'>
        
        {/* Logo Area */}
        <div className='nav-logo-wrapper'>
          <Link to="/dashboard">
            <img src="/img/ts-logo.png" alt="Logo" className="nav-logo" />
          </Link>
        </div>

        {/* Button Area */}
        <div className='nav-button-group'>
          {isLoggedIn ? (
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-btn login-btn">Login</Link>
              <Link to="/register" className="nav-btn register-btn">Register</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};