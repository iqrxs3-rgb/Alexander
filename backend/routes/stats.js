const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { getBotStatsData, updateBotStatsData } = require("../controllers/statsController");

router.get("/:botId", verifyToken, async (req, res) => {
  try {
    const stats = await getBotStatsData(req.params.botId);
    res.json(stats);
  } catch (err) {
    res.status(404).json({ error: "Stats not found" });
  }
});

router.put("/:botId", verifyToken, async (req, res) => {
  try {
    const updatedStats = await updateBotStatsData(req.params.botId, req.body);
    res.json(updatedStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
