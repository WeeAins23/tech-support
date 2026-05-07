const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create the connection to phpMyAdmin (MySQL)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tech-support'
});

app.get('/api/user/:username', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [req.params.username], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});