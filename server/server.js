const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Essential for reading JSON from React

// 1. Connection to phpMyAdmin (MySQL)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',     
  database: 'tech-support' 
});

// 2. REGISTRATION ROUTE (With Hashing)
app.post('/api/register', async (req, res) => {
  const { name, username, password } = req.body;
  
  // Hash the password for security
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Default JSON progress for new users
  const defaultProgress = JSON.stringify({
    mouse: false, keyboard: false, browser: false, search: false, email: false
  });

  const sql = "INSERT INTO users (name, username, password, progress) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, username, hashedPassword, defaultProgress], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "User registered successfully!" });
  });
});

// 3. LOGIN ROUTE (With Hash Verification)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  
  db.query(sql, [username], async (err, result) => {

    console.log("Database result for", username, ":", result);

    if (err || result.length === 0) return res.status(401).send("User not found");

    // Compare the plain text password with the hashed one in DB
    const isMatch = await bcrypt.compare(password, result[0].password);

    console.log("Password match:", isMatch);
    
    if (isMatch) {
      // Create the userData object from the first item in the database result
      const userData = {
        id: result[0].id,
        name: result[0].name,
        username: result[0].username,
        progress: result[0].progress
      };

      console.log("Login successful! Sending data to frontend.");
      res.status(200).send(userData);
    } else {
      res.status(401).send("Incorrect password");
    }
  });
});

// This route allows the Dashboard to ask: "What is the info for user #1?"
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT name, progress FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) {
      res.status(200).send(result[0]); // Sends { name: 'Ainsley Rae', progress: '...' }
    } else {
      res.status(404).send("User not found");
    }
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));