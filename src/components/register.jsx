import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message on new attempt
    
    if (!name.trim() || !username.trim() || !password.trim()) {
      setError("Please fill in all fields before registering.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Registration success message
        setSuccessMessage("Registration successful! Redirecting to login...");

        // Delay navigation
        setTimeout(() => {
          navigate("/login");
        }, 2500); 

      } else {
        const errorData = await response.text();
        setError(errorData || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Could not connect to the server.");
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-box">
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleRegister} noValidate>
          
          {/* --- ERROR MESSAGE --- */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <div className="form-group" style={{ position: 'relative' }}>
            <label>Name:</label>
            <input type="text" name="name" className="register-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" className="register-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type={showPassword ? "text" : "password"} name="password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button 
              className="show-password"
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
          
          {/* Register success message */}
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          <button
            type="submit" 
            className="register-submit-btn"
            disabled={!!successMessage} // Disable button once registration is successful
            style={{ opacity: successMessage ? 0.7 : 1, cursor: successMessage ? 'not-allowed' : 'pointer' }}
          >
            {successMessage ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};