// backend/routes/bots.js
const express = require("express");
const router = express.Router();

// Controllers
const {
  getBots,
  getBotById,
  updateBot
} = require("../controllers/botsController");

// Middleware حماية
const { verifyToken } = require("../middleware/auth");

/**
 * @route   GET /api/bots/
 * @desc    جلب كل البوتات للمستخدم الحالي
 * @access  Private
 */
router.get("/", verifyToken, getBots);

/**
 * @route   GET /api/bots/:botId
 * @desc    جلب بيانات بوت محدد
 * @access  Private
 */
router.get("/:botId", verifyToken, getBotById);

/**
 * @route   PUT /api/bots/:botId
 * @desc    تعديل بيانات بوت موجود
 * @access  Private
 */
router.put("/:botId", verifyToken, updateBot);

module.exports = router;
