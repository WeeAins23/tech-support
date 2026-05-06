import React from "react";
import { Link } from "react-router-dom";

export const Navigation = (props) => {
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
          {/* Redirects the user to the Login page component */}
          <Link to="/login" className="nav-btn login-btn">
            Login
          </Link>
          {/* Redirects the user to the Register page component */}
          <Link to="/register" className="nav-btn register-btn">
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
};