const express = require("express");
const { TokenExpiredError } = require("jsonwebtoken");
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
        console.log('User API:', 'Connected to postgres db!')
    }
})

// GET all data from user
router.get("/", async (req, res) => {
    if (!req.isAuth) {
        res.status(401).json({
            error: "Unauthorized",
        });
        return;
    }
    try {
        const activities = await client.query(`SELECT * FROM user WHERE userid='${req.userId}'`);
        res.status(201).json(activities.rows);
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

// DELETE user 
// TODO

module.exports = router;
