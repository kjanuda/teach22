// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken"); // JWT auth middleware

// ✅ Get user profile (by token)
router.get("/profile", verifyToken, getUserProfile);

// ✅ Update user profile (optional, add if needed)
router.put("/profile", verifyToken, updateUserProfile);

module.exports = router;

