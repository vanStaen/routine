const express = require("express");
const moment = require('moment-timezone');
const router = express.Router();
const { Client } = require("pg");

// Init Postgres
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  }
});

// GET all stats data
router.get("/", async (req, res) => { 
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const allDaillies = await client.query(
      `SELECT * FROM dailies WHERE userid='${req.userId}' ORDER BY year, month, day ASC;`
    );
    res.status(201).json(allDaillies.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;
