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

// GET single data from repeated (based on id)
router.get("/:year/:month/:day", async (req, res) => {
  try {
    const repeated = await client.query(`SELECT * FROM dailies WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day}`);
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
  }

  // Check if date missing
  if (!req.body.date) {
    return res.status(400).json({ error: `Error: Date field is missing.` });
  }

  const date = req.body.date || date.now();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const user = req.userId;

  // Check if there is already a row for today
  const todayQuerry = `SELECT * FROM dailies 
                       WHERE year=${req.params.year} 
                       AND month=${req.params.month} 
                       AND day=${req.params.day}`

  const today = await client.query(todayQuerry);

  if (today.rows.length > 0) {
    // Create new entry daily in db
    // TODO
  } else {
    // Update daily entry in db
    // TODO
  }

  const insertQuery = `INSERT INTO dailies 
                       (day, month, year, user) 
                       VALUES 
                       ('${day}', '${month}','${year}','${user}')`;

  try {
    await client.query(insertQuery);
    res.status(201).json({ success: "Success" });
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }

});

module.exports = router;
