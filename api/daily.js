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
  }
});

// GET data from dailies for a specific date
router.get("/:year/:month/:day", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const daily = await client.query(
      `SELECT * FROM dailies WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day} AND userid='${req.userId}'`
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
