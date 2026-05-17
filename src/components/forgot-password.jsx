import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Enter Username, 2: Enter New Password
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`http://localhost:5000/api/check-user/${username}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        setStep(2);
        setMessage("");
      } else if (res.status === 404) {
      setMessage("Username not found. Please check your spelling and try again.");
      } else {
      setMessage("Something went wrong on our end. Please try later")
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Cannot connect to the server. Is it running?");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, newPassword })
    });

    if (res.ok) {
      setMessage("Password updated! Taking you to login...");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-box">
        <h1>Password Help</h1>
        <p>{step === 1 ? "Enter your username to find your account." : "Enter your new password below."}</p>
        
        {message && <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>}

        {step === 1 ? (
          <form onSubmit={handleVerifyUser}>
            <div className="form-group">
              <label>Username:</label>
              <input className="register-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <button className="register-submit-btn" type="submit">Find My Account</button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <div className="form-group">
              <label>New Password:</label>
              <input className="register-input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <button className="register-submit-btn" type="submit">Update Password</button>
          </form>
        )}
      </div>
    </div>
  );
};