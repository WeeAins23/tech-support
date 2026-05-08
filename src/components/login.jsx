import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const userData = await response.json();
        
        // IMPORTANT: Save the user ID so the Dashboard knows who you are
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('username', userData.username);

        alert("Login Successful!");
        navigate("/dashboard"); // This is the magic line!
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
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
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
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