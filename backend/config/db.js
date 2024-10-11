// config/db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // replace with your username
    password: '@Kipngetich777', // replace with your password
    database: 'mkulima_power',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Database connected successfully');
    connection.release(); // Release the connection back to the pool
});

module.exports = pool; // Export the pool
