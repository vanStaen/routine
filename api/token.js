const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const Token = require("../models/Token");
const router = express.Router();

// POST login
router.post("/", async (req, res) => {
  if (!req.body.refreshToken) {
    return res.status(401).json({ error: `No refresh token was provided` });
  }
  const refreshToken = req.body.refreshToken;
  const token = await Token.findOne({ token: refreshToken });
  if (!token) {
    return res.status(401).json({ error: `Refresh Token does not exist!` });
  }

  try {

    // Check token validity
    const isTokenValid = await jsonwebtoken.verify(
      refreshToken,
      process.env.AUTH_SECRET_KEY_REFRESH
    );

    // Generate new Tokens
    const accessToken = await jsonwebtoken.sign(
      { userId: isTokenValid.userId, email: isTokenValid.email },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: "15m" }
    );
    const newRefreshToken = await jsonwebtoken.sign(
      { userId: isTokenValid.userId, email: isTokenValid.email },
      process.env.AUTH_SECRET_KEY_REFRESH,
      { expiresIn: "7d" }
    );

    // Delete Old refresh token!
    const deleteToken = await Token.deleteOne({ token: refreshToken });
    if (deleteToken.deletedCount === 0) {
      return res.status(400).json({ error: `Refresh token not found in the db!` });
    }

    // Add new refresh token to db
    const newToken = new Token({
      token: newRefreshToken,
      userId: isTokenValid.userId,
      email: isTokenValid.email,
    });

    // Save token in db
    await newToken.save();

    // Return new tokens
    res.status(201).json({
      token: accessToken,
      refreshToken: newRefreshToken,
    });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: err });
  }

});

module.exports = router;
