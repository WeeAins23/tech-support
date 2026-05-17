import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const userData = await response.json();
        
        // IMPORTANT: Save the user ID so the Dashboard knows who you are
        sessionStorage.setItem('userId', userData.id);
        sessionStorage.setItem('username', userData.username);

        navigate("/dashboard"); 
      } else {
        setError("Invalid Username or Password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Could not connect to the server.");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-box">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
            <button className="show-password"
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>

          {error && (
            <p className="password-error">
              {error}
            </p>
          )}

          <button type="submit" className="login-submit-btn">
            Login
          </button>

          <div className="forgot-password">
            <Link className="forgot-password-link" to="/forgot-password">
            Forgot your password? Click here for help.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};