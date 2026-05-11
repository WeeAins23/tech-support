import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navigation = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by looking for user data in localStorage
  useEffect(() => {
    const user = localStorage.getItem("userId");
    setIsLoggedIn(!!user); // Set to true if user exists, false otherwise
  }, [location]);

  const handleLogout = () => {
    localStorage.clear(); // Removes userID, name, and progress from localStorage
    setIsLoggedIn(false); // Update state to reflect logout
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <nav id='menu' className='navbar navbar-default custom-nav'>
      <div className='container nav-flex-container'>
        
        {/* Logo Area */}
        <div className='navbar-header'>
          {/* This ensures that clicking the logo always returns the user to the homepage */}
          <Link className="navbar-brand" to="/">
            <img src="/img/ts-logo.png" alt="Logo" className="nav-logo" />
          </Link>
        </div>

        {/* Button Area */}
        <div className='nav-button-group'>
          {/* If logged in, show Logout. If not, show Login/Register */}

          {isLoggedIn ? (
            <button
              className="nav-btn logout-btn"
              onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              {/* Redirects the user to the Login page component */}
              <Link to="/login" className="nav-btn login-btn">
                Login
              </Link>
              {/* Redirects the user to the Register page component */}
              <Link to="/register" className="nav-btn register-btn">
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};