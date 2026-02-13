// backend/routes/auth.js
const express = require("express");
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  getUserProfile
} = require("../controllers/authController");

// Middleware (لو حاب تستخدم حماية لبعض endpoints)
const { verifyToken } = require("../middleware/auth");

/**
 * @route   POST /api/auth/register
 * @desc    تسجيل مستخدم جديد
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    تسجيل دخول مستخدم
 * @access  Public
 */
router.post("/login", loginUser);

/**
 * @route   GET /api/auth/profile
 * @desc    جلب بيانات المستخدم الحالي
 * @access  Private
 */
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
