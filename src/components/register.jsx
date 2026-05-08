import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password })
    });

    if (response.ok) {
      const data = await response.json(); // Get the new user info back from server
      localStorage.setItem('userId', data.userId); 
      alert("Welcome to Tech Support!");
      navigate("/dashboard"); // Redirect straight to the dashboard
}
  };


  return (
    <div className="register-page-wrapper">
      <div className="register-box">
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" className="register-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" className="register-input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="register-submit-btn">
            Register
          </button>
        </form>
      </div>
      <div className="auth-footer-spacer"></div>
    </div>
  );
};