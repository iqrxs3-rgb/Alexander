// backend/server.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Routes
const authRoutes = require("./routes/auth");
const botsRoutes = require("./routes/bots");
const statsRoutes = require("./routes/stats");

// Middleware
const { verifyToken } = require("./middleware/auth");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware عام
app.use(cors()); // السماح بالطلبات من أي دومين (تقدر تخصصه لاحقًا)
app.use(express.json()); // قراءة JSON body
app.use(morgan("dev")); // لوغز للـ requests

// Routes
app.use("/api/auth", authRoutes);      // تسجيل دخول / تسجيل حساب
app.use("/api/bots", verifyToken, botsRoutes); // جلب وتعديل البوتات محمي
app.use("/api/stats", verifyToken, statsRoutes); // الإحصائيات محمية

// Route افتراضي
app.get("/", (req, res) => {
  res.send("Discord Dashboard Backend is running!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
