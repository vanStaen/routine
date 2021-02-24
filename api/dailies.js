const express = require("express");
const router = express.Router();
const { Client } = require("pg");


// Init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres 
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('Dailies API:', 'Connected to postgres db!')
  }
})

// GET data from dailies
router.get("/:year/:month/:day", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  } else {
    const user = req.userId;
  }
  try {
    const repeated = await client.query(`SELECT * FROM dailies 
                                        WHERE year=${req.params.year} 
                                        AND month=${req.params.month} 
                                        AND day=${req.params.day}
                                        AND user=${user}`);
    if (repeated.rows.length > 0) {
      res.status(201).json(repeated.rows);
    } else {
      res.status(400).json({
        error: `No data found with id#${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// POST create new dailies line or update it
router.post("/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  } else {
    const user = req.userId;
  }
  if (!req.body.date) {
    return res.status(400).json({ error: `Error: Date field is missing.` });
  }
  const date = req.body.date || date.now();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  // Check if there is already a row for today
  const todayQuerry = `SELECT * FROM dailies 
                       WHERE year=${req.params.year} 
                       AND month=${req.params.month} 
                       AND day=${req.params.day}
                       AND user=${user}`;
  const today = await client.query(todayQuerry);
  if (today.rows.length > 0) {
    // Create new entry daily in db
    // TODO
  } else {
    // Update daily entry in db
    // TODO
  }
});

module.exports = router;
