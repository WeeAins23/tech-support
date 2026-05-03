import React from "react";

export const Login = () => {
  return (
    <div className="login-page-wrapper">
      <div className="login-box">
        <h1>Login</h1>
        <form className="login-form">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" className="login-input" />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" className="login-input" />
          </div>

          <button type="submit" className="login-submit-btn">
            Login
          </button>
        </form>
      </div>
      
      {/* Optional spacer to keep footer from touching the box directly */}
      <div className="auth-footer-spacer"></div> 
    </div>
  );
};