const express = require("express");
const moment = require("moment-timezone");
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

// GET  streak data for all activities
router.get("/", async (req, res) => {
  // Today
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
      `SELECT * FROM streak WHERE year=${year} AND month=${month} AND day=${day} AND userid='${req.userId}'`
    );
    if (streak.rows.length === 0) {
      await updateStreakBasedonYesterday(year, month, day, req.userId);
      const streakSecond = await client.query(
        `SELECT * FROM streak WHERE year=${year} AND month=${month} AND day=${day} AND userid='${req.userId}'`
      );
      if (streakSecond.rows.length > 0) {
        res.status(201).json(streakSecond.rows);
      } else {
        res.status(400).json({
          error: `Something wrong happened!`,
        });
      }
    } else {
      res.status(200).json(streak.rows);
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// GET streak data for specific date
router.get("/:year/:month/:day", async (req, res) => {
  // Today
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
      `SELECT * FROM streak WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day} AND userid='${req.userId}'`
    );
    if (streak.rows.length === 0) {
      await updateStreakBasedonYesterday(year, month, day, req.userId);
      const streakSecond = await client.query(
        `SELECT * FROM streak WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day} AND userid='${req.userId}'`
      );
      if (streakSecond.rows.length > 0) {
        res.status(201).json(streakSecond.rows);
      } else {
        res.status(400).json({
          error: `Something wrong happened!`,
        });
      }
    } else {
      res.status(200).json(streak.rows);
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// GET streak data for specific date
router.patch("/:activity", async (req, res) => {
  // Today
  const year = moment().tz("Europe/Berlin").format("YYYY");
  const month = moment().tz("Europe/Berlin").format("MM");
  const day = moment().tz("Europe/Berlin").format("DD");

  // Yesterday
  const yesterdayDate = getYesterdayDate(year, month, day);
  const yesterYear = yesterdayDate[0];
  const yesterMonth = yesterdayDate[1];
  const yesterDay = yesterdayDate[2];

  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const streak = await client.query(
      `SELECT ${req.params.activity} FROM streak WHERE year=${yesterYear} AND month=${yesterMonth} AND day=${yesterDay} AND userid='${req.userId}'`
    );
    const streakOfYesterday = streak.rows[0][req.params.activity];
    await client.query(
        `UPDATE streak SET ${req.params.activity}=${streakOfYesterday + 1} WHERE year=${year} AND month=${month} AND day=${day} AND userid='${req.userId}'`
      );
    res.status(200).json(streak.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
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
        if (
          activity === "year" ||
          activity === "month" ||
          activity === "day" ||
          activity === "userid" ||
          activity === "id"
        ) {
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
      const activityGoal = await client.query(`SELECT * FROM activities`);
      const activityGoalResult = activityGoal.rows;

      for (const activity in yesterdayStreakResult) {
        if (
          activity === "year" ||
          activity === "month" ||
          activity === "day" ||
          activity === "userid" ||
          activity === "id"
        ) {
        } else {
          const activityFiltered = activityGoalResult.filter(
            (item) => item.name === activity
          );
          const activityFilteredGoal = activityFiltered[0].goal;
          if (yesterdayDailyDataResult[activity] >= activityFilteredGoal) {
            if (yesterdayDailyDataResult[activity]) {
              updateValues =
                updateValues + `${yesterdayStreakResult[activity] + 1},`;
            } else {
              updateValues = updateValues + `0,`;
            }
          } else {
            updateValues = updateValues + `0,`;
          }
        }
      }

      const updateFieldEdited = updateField.slice(0, -1); // delete the last comma
      const updateValuesEdited = updateValues.slice(0, -1); // delete the last comma
      const updateStreakQuery = `INSERT INTO streak (year, month, day, userid, ${updateFieldEdited}) VALUES (${toYear}, ${toMonth}, ${toDay}, '${userid}', ${updateValuesEdited})`;
      await client.query(updateStreakQuery);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;
