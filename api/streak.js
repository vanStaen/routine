const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const getYesterdayDate = require("../helpers/getYesterdayDate");

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

// Today
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

// GET  streak data for all activities
router.get("/", async (req, res) => {
    try {
        const activities = await client.query(
            `SELECT * FROM streak WHERE year=${year} AND month=${month} AND day=${day}`
        );
        if (activities.rows.length === 0) {
            await updateStreakBasedonYesterday(year, month, day);
            const activitiesSecond = await client.query(
                `SELECT * FROM streak WHERE year=${year} AND month=${month} AND day=${day}`
            );
            if (activitiesSecond.rows.length > 0) {
                res.status(201).json(activitiesSecond.rows);
            } else {
                res.status(400).json({
                    error: `Something wrong happened!`,
                });
            }
        } else {
            res.status(201).json(activities.rows);
        }
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

// GET streak data for specific date
router.get("/:year/:month/:day", async (req, res) => {
    try {
        const activities = await client.query(
            `SELECT * FROM streak WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day}`
        );
        if (activities.rows.length === 0) {
            await updateStreakBasedonYesterday(year, month, day);
            const activitiesSecond = await client.query(
                `SELECT * FROM streak WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day}`
            );
            if (activitiesSecond.rows.length > 0) {
                res.status(201).json(activitiesSecond.rows);
            } else {
                res.status(400).json({
                    error: `Something wrong happened!`,
                });
            }
        } else {
            res.status(201).json(activities.rows);
        }
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

// Function to update the Streak table
const updateStreakBasedonYesterday = async (toYear, toMonth, toDay) => {
    try {

        const yesterdayDate = getYesterdayDate(toYear, toMonth, toDay);
        const yesterdayStreak = await client.query(
            `SELECT * FROM streak WHERE year=${yesterdayDate[0]} AND month=${yesterdayDate[1]} AND day=${yesterdayDate[2]}`
        );

        if (yesterdayStreak.rows.length === 0) {
            await client.query(
                `INSERT INTO streak (year, month, day) VALUES (${toYear}, ${toMonth}, ${toDay})`
            );
        } else {
            const yesterdayStreakResult = yesterdayStreak.rows[0];
            let updateField = "";
            let updateValues = "";

            for (const activity in yesterdayStreakResult) {
                if (activity === "year" || activity === "month" || activity === "day") {
                } else {
                    updateField = updateField + `${activity},`;
                }
            }

            // GET Data for yesterday (dailies)
            const yesterdayDailyData = await client.query(
                `SELECT * FROM dailies WHERE year=${yesterdayDate[0]} AND month=${yesterdayDate[1]} AND day=${yesterdayDate[2]}`
            );
            const yesterdayDailyDataResult = yesterdayDailyData.rows[0];

            // GET goal (activity)
            const activityGoal = await client.query(
                `SELECT * FROM activities`
            );
            const activityGoalResult = activityGoal.rows;

            for (const activity in yesterdayStreakResult) {
                if (activity === "year" || activity === "month" || activity === "day") {
                } else {
                    const activityFiltered = activityGoalResult.filter(item => item.activity === activity);
                    const activityFilteredGoal = activityFiltered[0].goal;
                    if (yesterdayDailyDataResult[activity] >= activityFilteredGoal) {
                        if (yesterdayDailyDataResult[activity]) {
                            updateValues = updateValues + `${yesterdayStreakResult[activity] + 1},`;
                        } else {
                            updateValues = updateValues + `0,`;
                        }
                    } else {
                        updateValues = updateValues + `0,`;
                    }
                }
            }

            const updateFieldEdited = updateField.slice(0, -1) // delete the last comma
            const updateValuesEdited = updateValues.slice(0, -1) // delete the last comma
            const updateStreakQuery = `INSERT INTO streak (year, month, day, ${updateFieldEdited}) VALUES (${toYear}, ${toMonth}, ${toDay}, ${updateValuesEdited})`;
            await client.query(updateStreakQuery);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = router;
