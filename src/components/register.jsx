import React from "react";

export const Register = () => {
  return (
    <div className="register-container">
      {/* Registration Form */}
      <div className="register-box">
        <h1>Register</h1>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" className="register-input" />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" className="register-input" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" className="register-input" />
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};