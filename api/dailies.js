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

// GET all data with variable limit
router.get("/:limit", async (req, res) => {

  // Today
  const year = moment().tz("Europe/Berlin").format('YYYY');
  const month = moment().tz("Europe/Berlin").format('MM');
  const day = moment().tz("Europe/Berlin").format('DD');

  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const dailyToday = await client.query(
      `SELECT * FROM dailies WHERE year=${year} AND month=${month} AND day=${day} AND userid='${req.userId}'`
    );
    if (dailyToday.rows.length > 0) {
      const daily = await client.query(
        `SELECT * FROM dailies WHERE userid='${req.userId}' ORDER BY id DESC LIMIT ${req.params.limit}`
      );
      res.status(201).json(daily.rows);
    } else {
      // there is no line for this day, so create one
      await client.query(
        `INSERT INTO dailies (year, month, day, userid) VALUES (${year}, ${month}, ${day}, '${req.userId}')`
      );
      const dailyNew = await client.query(
        `SELECT * FROM dailies WHERE userid='${req.userId}' ORDER BY id DESC LIMIT ${req.params.limit}`
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

// PATCH single data from daily (based on id)
router.patch("/:id", async (req, res) => {
  let updateField = '';
  for (const [key, value] of Object.entries(req.body)) {
    updateField = updateField + `${key}=${value},`;
  }
  const updateFieldEdited = updateField.slice(0, -1) // delete the last comma
  const updateQuery = `UPDATE dailies SET ${updateFieldEdited} WHERE id=${req.params.id}`;
  try {
    const udpate = await client.query(updateQuery);
    if (udpate.rowCount > 0) {
      res.status(200).json({
        success: `Daily updated.`,
      });
    } else {
      res.status(400).json({
        error: `No daily found with id#${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;
