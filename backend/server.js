const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const botsRoutes = require("./routes/bots");
const statsRoutes = require("./routes/stats");

const { initializeFirebase } = require("./utils/firebase");

const app = express();
const PORT = process.env.PORT || 5000;

initializeFirebase();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bots", botsRoutes);
app.use("/api/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("Dashboard Bots API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
