const express = require("express");
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
  } else {
    console.log("Dailies API:", "Connected to postgres db!");
  }
});

// Today
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

// GET all daily data (and create today if not exist)
router.get("/", async (req, res) => {
  try {
    const dailyToday = await client.query(
      `SELECT * FROM dailies WHERE year=${year} AND month=${month} AND day=${day}`
    );
    if (dailyToday.rows.length > 0) {
      res.status(201).json(dailyToday.rows);
    } else {
      // there is no line for this day, so create one
      await client.query(
        `INSERT INTO dailies (year, month, day) VALUES (${year}, ${month}, ${day})`
      );
      const dailyNew = await client.query(
        `SELECT * FROM dailies LIMIT 2`
      );
      if (dailyNew.rows.length > 0) {
        res.status(201).json(dailyNew.rows);
      } else {
        res.status(400).json({
          error: `Something wrong happened! No data found.`,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// GET all data with variable limit
router.get("/:limit", async (req, res) => {
  try {
    const dailyToday = await client.query(
      `SELECT * FROM dailies WHERE year=${year} AND month=${month} AND day=${day}`
    );
    if (dailyToday.rows.length > 0) {
      const daily = await client.query(
        `SELECT * FROM dailies ORDER BY id DESC LIMIT ${req.params.limit}`
      );
      res.status(201).json(daily.rows);
    } else {
      // there is no line for this day, so create one
      await client.query(
        `INSERT INTO dailies (year, month, day) VALUES (${year}, ${month}, ${day})`
      );
      const dailyNew = await client.query(
        `SELECT * FROM dailies SELECT * FROM dailies ORDER BY id DESC LIMIT ${req.params.limit}`
      );
      if (dailyNew.rows.length > 0) {
        res.status(201).json(dailyNew.rows);
      } else {
        res.status(400).json({
          error: `Something wrong happened! No data found.`,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});


module.exports = router;
