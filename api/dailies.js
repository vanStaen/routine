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
    console.log('repeated API:', 'Connected to postgres db!')
  }
})

// GET all data from repeated
router.get("/", async (req, res) => {
  try {
    const repeated = await client.query('SELECT * FROM dailies ORDER BY id ASC;');
    res.status(201).json(repeated.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

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

// DELETE single data from repeated (based on id)
router.delete("/:year/:month/:day", async (req, res) => {

  try {
    const repeated = await client.query(`SELECT * FROM dailies WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day}`);
    res.status(200).json({
      success: `Entry #${req.params.id} has been deleted.`,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

/*
// PATCH single data from repeated (based on id)
router.patch("/:id", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  let updateField = '';
  if (req.body.active !== undefined) {
    updateField = updateField + "active=" + req.body.active + ",";
  }
  if (req.body.link) {
    updateField = updateField + "link='" + req.body.link + "',";
  }
  if (req.body.checked !== undefined) {
    updateField = updateField + "checked=" + req.body.checked + ",";
  }
  if (req.body.tags) {
    updateField = updateField + "tags= ARRAY ['" + req.body.tags.join("','") + "'],";
  }
  if (req.body.title) {
    updateField = updateField + "title='" + req.body.title.replace("'", "") + "',";
  }
  const updateFieldEdited = updateField.slice(0, -1) // delete the last comma
  const updateQuery = 'UPDATE repeated SET ' + updateFieldEdited + ' WHERE id=' + req.params.id;
  console.log(updateQuery);
  try {
    const repeated = await client.query(updateQuery);
    if (repeated.rowCount > 0) {
      res.status(200).json({
        success: `Entry #${req.params.id} has been updated.`,
      });
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
*/

// POST add to repeated
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
  const today = await client.query(`SELECT * FROM dailies WHERE year=${req.params.year} AND month=${req.params.month} AND day=${req.params.day}`);
  if (repeated.rows.length > 0) {
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
