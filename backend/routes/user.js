// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Mongoose model

// Get user by ID or email
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // remove password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
