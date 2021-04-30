const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const isAuth = require("./middleware/is-auth");

const PORT = process.env.PORT || 5005;
require("dotenv/config");

// Init Express
const app = express();

// Fix moongoose deprecation warning
mongoose.set('useCreateIndex', true);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Authorization Middleware
app.use(isAuth);

// Allow cross origin request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Set up for React
app.use(express.static(path.join(__dirname, "build")));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, "build", "index.html")); });
app.use('/images', express.static(path.join(__dirname, "images")));

// Router to API endpoints
app.use("/dailies", require("./api/dailies"));
app.use("/daily", require("./api/daily"));
app.use("/activity", require("./api/activity"));
app.use("/streak", require("./api/streak"));
app.use("/user", require("./api/user"));
app.use("/login", require("./api/login"));
app.use("/token", require("./api/token"));
app.use("/logout", require("./api/logout"));

// Connect to Mongo db
mongoose.connect(
  process.env.DB_REWAER_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db!")
);

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
