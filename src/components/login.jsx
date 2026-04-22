import React from "react";

export const Login = () => {
  return (
    <div className="login-container">
      {/* Login Form */}
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" className="login-input" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" className="login-input" />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};