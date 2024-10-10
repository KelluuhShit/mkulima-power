// config/db.js

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // replace with your username
    password: '@Kipngetich777', // replace with your password
    database: 'mkulima_power',
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;
