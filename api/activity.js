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
        console.log('Activity API:', 'Connected to postgres db!')
    }
})

// GET list of all columns in table
router.get("/:table", async (req, res) => {
    try {
        const querry = `
                        SELECT COLUMN_NAME
                        FROM   INFORMATION_SCHEMA.COLUMNS
                        WHERE  TABLE_NAME = '${req.params.table}'
                        `
        const activities = await client.query(querry);
        res.status(201).json(activities.rows);
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});


// DELETE single data from repeated (based on id)
router.delete("/", async (req, res) => {
    const deleteQuery = `
                        ALTER TABLE ${req.body.table}
                        DROP COLUMN ${req.body.activity};
                        `;
    try {
        await client.query(deleteQuery);
        res.status(201).json({ success: `Column ${req.body.activity} deleted from ${req.body.table}.` });
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

// POST add to repeated
router.post("/", async (req, res) => {
    const insertQuery = `
                        ALTER TABLE ${req.body.table}
                        ADD ${req.body.activity} ${req.body.datatype};
                        `;
    try {
        await client.query(insertQuery);
        res.status(201).json({ success: `Column ${req.body.activity} added to ${req.body.table}.` });
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

module.exports = router;
