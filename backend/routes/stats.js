// backend/routes/stats.js
const express = require("express");
const router = express.Router();

// Controllers
const {
  getBotStats,
  getAllBotsStats
} = require("../controllers/statsController");

// Middleware حماية
const { verifyToken } = require("../middleware/auth");

/**
 * @route   GET /api/stats/:botId
 * @desc    جلب إحصائيات بوت محدد
 * @access  Private
 */
router.get("/:botId", verifyToken, getBotStats);

/**
 * @route   GET /api/stats/
 * @desc    جلب إحصائيات كل البوتات للمستخدم الحالي
 * @access  Private
 */
router.get("/", verifyToken, getAllBotsStats);

module.exports = router;
