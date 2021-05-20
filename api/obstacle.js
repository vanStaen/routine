const express = require("express");
const moment = require("moment-timezone");
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

// GET obstacle data specific user
router.get("/", async (req, res) => {
  const year = moment().tz("Europe/Berlin").format("YYYY");
  const month = moment().tz("Europe/Berlin").format("MM");
  const day = moment().tz("Europe/Berlin").format("DD");
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const streak = await client.query(
      `SELECT * FROM obstacle WHERE year=${year} AND month=${month} AND day=${day} AND userid='${req.userId}'`
    );
    res.status(200).json(streak.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// GET obstacle data for specific date, and specific user
router.get("/:year/:month/:day", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const streak = await client.query(
      `SELECT * FROM obstacle WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day} AND userid='${req.userId}'`
    );
    res.status(200).json(streak.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// POST obstacle (based on userId)
router.post("/", async (req, res) => {
  const year = moment().tz("Europe/Berlin").format("YYYY");
  const month = moment().tz("Europe/Berlin").format("MM");
  const day = moment().tz("Europe/Berlin").format("DD");
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const createQuery = `INSERT INTO obstacle (userid, type, "desc", year, month, day) VALUES('${req.userId}', '${req.body.desc}', '${req.body.desc}', ${year}, ${month}, ${day});`;
    await client.query(createQuery);
    res.status(200).json({
      success: `Obstacle added.`,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// DELETE obstacle from table
router.delete("/:id", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const deleteObstacle = `DELETE FROM obstacle WHERE id='${req.params.id}' AND userid='${req.userId}'`;
    await client.query(deleteObstacle);
    res.status(201).json({ success: `Obstacle with id #${req.params.id} was deleted.` });
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;
