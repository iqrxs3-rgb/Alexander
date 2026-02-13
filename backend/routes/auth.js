const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { loginUser, getUserProfile } = require("../controllers/authController");

router.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const profile = await getUserProfile(req.userId);
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
