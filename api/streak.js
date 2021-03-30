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
    }
});

// Today
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

// GET  streak data for all activities
router.get("/", async (req, res) => {
    if (!req.isAuth) {
        res.status(401).json({
            error: "Unauthorized",
        });
        return;
    }
    try {
        const activities = await client.query(
            `SELECT * FROM streak WHERE year=${year} AND month=${month} AND day=${day} AND userid='${req.userId}'`
        );
        if (activities.rows.length === 0) {
            await updateStreakBasedonYesterday(year, month, day, req.userId);
            const activitiesSecond = await client.query(
                `SELECT * FROM streak WHERE year=${year} AND month=${month} AND day=${day} AND userid='${req.userId}'`
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
    if (!req.isAuth) {
        res.status(401).json({
            error: "Unauthorized",
        });
        return;
    }
    try {
        const activities = await client.query(
            `SELECT * FROM streak WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day} AND userid='${req.userId}'`
        );
        if (activities.rows.length === 0) {
            await updateStreakBasedonYesterday(year, month, day, req.userId);
            const activitiesSecond = await client.query(
                `SELECT * FROM streak WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day} AND userid='${req.userId}'`
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


// PATCH single data from streak for specific date
router.patch("/:year/:month/:day", async (req, res) => {
    if (!req.isAuth) {
        res.status(401).json({
            error: "Unauthorized",
        });
        return;
    }
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
    const updateQuery = `UPDATE streak SET ${updateFieldEdited}  WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day} AND userid='${req.userId}'`;
    try {
        const udpate = await client.query(updateQuery);
        if (udpate.rowCount > 0) {
            res.status(200).json({
                success: `Streak updated.`,
            });
        } else {
            res.status(400).json({
                error: `No streak found for the ${eq.params.day}/${eq.params.month}/${eq.params.year}.`,
            });
        }
    } catch (err) {
        res.status(400).json({
            error: `${err}`,
        });
    }
});


// Function to update the Streak table
const updateStreakBasedonYesterday = async (toYear, toMonth, toDay, userid) => {
    try {
        const yesterdayDate = getYesterdayDate(toYear, toMonth, toDay);
        const yesterdayStreak = await client.query(
            `SELECT * FROM streak WHERE year=${yesterdayDate[0]} AND month=${yesterdayDate[1]} AND day=${yesterdayDate[2]} AND userid='${userid}'`
        );

        if (yesterdayStreak.rows.length === 0) {
            await client.query(
                `INSERT INTO streak (year, month, day, userid) VALUES (${toYear}, ${toMonth}, ${toDay}, '${userid}')`
            );
        } else {
            const yesterdayStreakResult = yesterdayStreak.rows[0];
            let updateField = "";
            let updateValues = "";

            for (const activity in yesterdayStreakResult) {
                if (activity === "year" || activity === "month" || activity === "day" || activity === "userid" || activity === "id") {
                } else {
                    updateField = updateField + `${activity},`;
                }
            }

            // GET Data for yesterday (dailies)
            const yesterdayDailyData = await client.query(
                `SELECT * FROM dailies WHERE year=${yesterdayDate[0]} AND month=${yesterdayDate[1]} AND day=${yesterdayDate[2]} AND userid='${userid}'`
            );
            const yesterdayDailyDataResult = yesterdayDailyData.rows[0];

            // GET goal (activity)
            const activityGoal = await client.query(
                `SELECT * FROM activities`
            );
            const activityGoalResult = activityGoal.rows;

            for (const activity in yesterdayStreakResult) {
                if (activity === "year" || activity === "month" || activity === "day" || activity === "userid" || activity === "id") {
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
            const updateStreakQuery = `INSERT INTO streak (year, month, day, userid, ${updateFieldEdited}) VALUES (${toYear}, ${toMonth}, ${toDay}, '${userid}', ${updateValuesEdited})`;
            await client.query(updateStreakQuery);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = router;
