import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('username', userData.username);

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
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                fontSize: '1.5rem',
                marginTop: '5px',
                background: 'none',
                border: 'none',
                color: '#2e73ea',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>

          {error && (
            <p style={{ color: '#ff4d4d', fontSize: '14px', marginBottom: '15px', fontWeight: 'bold' }}>
              {error}
            </p>
          )}

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