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
    console.log("Daily API:", "Connected to postgres db!");
  }
});

// GET data from dailies for a specific date
router.get("/:year/:month/:day", async (req, res) => {
  try {
    const daily = await client.query(
      `SELECT * FROM dailies WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day}`
    );
    if (daily.rows.length > 0) {
      res.status(201).json(daily.rows);
    }
    res.status(400).json({
      message: `No data for the ${req.params.day}.${req.params.month}.${req.params.year}!`,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// PATCH single data from daily (based on date)
router.patch("/:id", async (req, res) => {
  let updateField = '';
  if (req.body.day !== undefined) {
    updateField = updateField + "day=" + req.body.day + ",";
  }
  if (req.body.month !== undefined) {
    updateField = updateField + "month=" + req.body.month + ",";
  }
  if (req.body.year !== undefined) {
    updateField = updateField + "year=" + req.body.year + ",";
  }
  if (req.body.dutch !== undefined) {
    updateField = updateField + "dutch=" + req.body.dutch + ",";
  }
  if (req.body.guitar !== undefined) {
    updateField = updateField + "guitar=" + req.body.guitar + ",";
  }
  if (req.body.pushups !== undefined) {
    updateField = updateField + "pushups=" + req.body.pushups + ",";
  }
  if (req.body.pullups !== undefined) {
    updateField = updateField + "pullups=" + req.body.pullups + ",";
  }
  if (req.body.situps !== undefined) {
    updateField = updateField + "situps=" + req.body.situps + ",";
  }
  if (req.body.javascript !== undefined) {
    updateField = updateField + "javascript=" + req.body.javascript + ",";
  }
  if (req.body.teeth !== undefined) {
    updateField = updateField + "teeth=" + req.body.teeth + ",";
  }
  if (req.body.producing !== undefined) {
    updateField = updateField + "producing=" + req.body.producing + ",";
  }
  if (req.body.bass !== undefined) {
    updateField = updateField + "bass=" + req.body.bass + ",";
  }
  if (req.body.piano !== undefined) {
    updateField = updateField + "piano=" + req.body.piano + ",";
  }
  if (req.body.trumpet !== undefined) {
    updateField = updateField + "trumpet=" + req.body.trumpet + ",";
  }
  if (req.body.run !== undefined) {
    updateField = updateField + "run=" + req.body.run + ",";
  }
  if (req.body.stretch !== undefined) {
    updateField = updateField + "stretch=" + req.body.stretch + ",";
  }
  if (req.body.photo !== undefined) {
    updateField = updateField + "photo=" + req.body.photo + ",";
  }
  if (req.body.water !== undefined) {
    updateField = updateField + "water=" + req.body.water + ",";
  }
  if (req.body.climb !== undefined) {
    updateField = updateField + "climb=" + req.body.climb + ",";
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
