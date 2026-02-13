// backend/controllers/statsController.js

// يمكنك لاحقًا ربطه مع Firebase أو أي DB أخرى

/**
 * جلب إحصائيات بوت محدد
 */
const getBotStats = async (req, res) => {
  try {
    const botId = req.params.botId;

    // placeholder: استبدله بجلب الإحصائيات من DB
    const stats = {
      botId,
      serversCount: 10,
      usersCount: 500,
      activeFeatures: ["welcome", "news"]
    };

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

/**
 * جلب إحصائيات كل البوتات للمستخدم الحالي
 */
const getAllBotsStats = async (req, res) => {
  try {
    const userId = req.user?.id || "user_id_placeholder";

    // placeholder: استبدله بجلب إحصائيات كل البوتات من DB
    const statsList = [
      {
        botId: "bot1",
        serversCount: 10,
        usersCount: 500,
        activeFeatures: ["welcome", "news"]
      },
      {
        botId: "bot2",
        serversCount: 5,
        usersCount: 200,
        activeFeatures: ["news"]
      }
    ];

    res.status(200).json({
      success: true,
      stats: statsList
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

module.exports = {
  getBotStats,
  getAllBotsStats
};
