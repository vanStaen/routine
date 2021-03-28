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
    }
})

// GET all data from activities
router.get("/", async (req, res) => {
    try {
        const activities = await client.query('SELECT * FROM activities ORDER BY category ASC;');
        const activitiesTest = await client.query('SELECT * FROM users ORBER BY sorting ASC;');
        res.status(201).json(activities.rows);
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});


// DELETE column (based on column_name 'activity')
router.delete("/", async (req, res) => {
    const deleteQuery1 = `
                        ALTER TABLE dailies
                        DROP COLUMN ${req.body.activity};
                        `;
    const deleteQuery2 = `
                        DELETE FROM activities 
                        WHERE activity='${req.body.activity}'
                        `;
    const deleteQuery3 = `
                        ALTER TABLE streak
                        DROP COLUMN ${req.body.activity};
                        `;
    try {
        await client.query(deleteQuery1);
        await client.query(deleteQuery2);
        await client.query(deleteQuery3);
        res.status(201).json({ success: `Activity ${req.body.activity} deleted from daily, activities and streak.` });
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

// POST add activity
router.post("/", async (req, res) => {
    const alterDailiesQuery = `
                        ALTER TABLE dailies
                        ADD COLUMN ${req.body.activity} SMALLINT
                        DEFAULT 0;
                        `;
    const alterStreakQuery = `
                        ALTER TABLE streak
                        ADD COLUMN ${req.body.activity} SMALLINT
                        DEFAULT 0;
                        `;
    const insertQuery = `
                        INSERT INTO activities (name, activity, category, unit, increment, goal) 
                        VALUES ('${req.body.name}', '${req.body.activity}','${req.body.category}', '${req.body.unit}', ${req.body.increment}, ${req.body.goal})
                        `;
    try {
        await client.query(alterDailiesQuery);
        await client.query(alterStreakQuery);
        await client.query(insertQuery);
        res.status(201).json({ success: `Column ${req.body.activity} added to dailies.` });
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

// PATCH single data from daily (based on activity)
router.patch("/", async (req, res) => {
    let updateField = '';
    if (req.body.name) {
        updateField = updateField + "name='" + req.body.name + "',";
    }
    if (req.body.category) {
        updateField = updateField + "category='" + req.body.category + "',";
    }
    if (req.body.unit !== undefined) {
        updateField = updateField + "unit='" + req.body.unit + "',";
    }
    if (req.body.increment) {
        updateField = updateField + "increment='" + req.body.increment + "',";
    }
    if (req.body.goal !== undefined) {
        updateField = updateField + "goal='" + req.body.goal + "',";
    }
    const updateFieldEdited = updateField.slice(0, -1) // delete the last comma

    const updateQuery = `UPDATE activities SET ${updateFieldEdited} WHERE activity='${req.body.activity}'`;
    try {
        const udpate = await client.query(updateQuery);
        if (udpate.rowCount > 0) {
            res.status(200).json({
                success: `Activity '${req.body.activity}' has been updated.`,
            });
        } else {
            res.status(400).json({
                error: `No data found for activitiy ${req.body.activity}`,
            });
        }
    } catch (err) {
        res.status(400).json({
            error: `${err}`,
        });
    }
});

module.exports = router;



/*
// GET list of all columns in table
router.get("/:table", async (req, res) => {
    try {
        const querry = `
                        SELECT COLUMN_NAME
                        FROM   INFORMATION_SCHEMA.COLUMNS
                        WHERE  TABLE_NAME = '${req.params.table}'
                        `
        const results = await client.query(querry)
        const activities = results.rows.filter(result => {
            if (result.column_name === "year" ||
                result.column_name === "month" ||
                result.column_name === "day") {
                return false;
            } else {
                return true;
            }
        });
        res.status(201).json(activities);
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});
*/