const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { getBotsData, getBotById, updateBotData } = require("../controllers/botsController");

router.get("/", verifyToken, async (req, res) => {
  try {
    const bots = await getBotsData();
    res.json(bots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:botId", verifyToken, async (req, res) => {
  try {
    const bot = await getBotById(req.params.botId);
    res.json(bot);
  } catch (err) {
    res.status(404).json({ error: "Bot not found" });
  }
});

router.put("/:botId", verifyToken, async (req, res) => {
  try {
    const updated = await updateBotData(req.params.botId, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
