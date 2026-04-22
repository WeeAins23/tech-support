import React from "react";
import { Link } from "react-router-dom";

export const Navigation = (props) => {
  return (
    <nav id='menu' className='navbar navbar-default'>
      <div className='container'>
      <div className='navbar-header'>
        {/* This will redirect to this page when clicking on the logo in the nav */}
        <Link className="navbar-brand" to="/">
          <img src="/img/ts-logo.png" alt="Logo" />
        </Link>
      </div>

    {/* Login/Register buttons - will load to respective components */}
      <div className='nav-button-container'>
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div>
  </div>
</nav>
  );
};
