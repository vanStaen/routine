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
        console.log("Streak API:", "Connected to postgres db!");
    }
});

// GET  streak data for all activities
router.get("/", async (req, res) => {
    try {
        const activities = await client.query('SELECT * FROM streak;');
        res.status(201).json(activities.rows);
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});


// GET streak data for specific activity
router.get("/:activity", async (req, res) => {
    try {
        const activities = await client.query(`SELECT * FROM streak WHERE '${req.params.activity}'`);
        res.status(201).json(activities.rows);
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

module.exports = router;
