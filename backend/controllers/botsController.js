// backend/controllers/botsController.js

// يمكنك لاحقًا ربطه مع Firebase أو أي DB أخرى

/**
 * جلب كل البوتات الخاصة بالمستخدم الحالي
 */
const getBots = async (req, res) => {
  try {
    const userId = req.user?.id || "user_id_placeholder";

    // placeholder: استبدله بجلب البوتات من DB
    const bots = [
      { id: "bot1", name: "Bot One", features: { welcome: true, news: true } },
      { id: "bot2", name: "Bot Two", features: { welcome: false, news: true } }
    ];

    res.status(200).json({
      success: true,
      bots
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

/**
 * جلب بيانات بوت محدد
 */
const getBotById = async (req, res) => {
  try {
    const botId = req.params.botId;

    // placeholder: استبدله بجلب بيانات البوت من DB
    const bot = { id: botId, name: "Bot Example", features: { welcome: true, news: true } };

    res.status(200).json({
      success: true,
      bot
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

/**
 * تعديل بيانات بوت موجود (تشغيل/إيقاف ميزات)
 */
const updateBot = async (req, res) => {
  try {
    const botId = req.params.botId;
    const updates = req.body; // يجب أن يحتوي على الميزات الجديدة

    // placeholder: استبدله بالتحديث في DB
    const updatedBot = {
      id: botId,
      name: "Bot Example",
      features: { ...updates }
    };

    res.status(200).json({
      success: true,
      bot: updatedBot
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

module.exports = {
  getBots,
  getBotById,
  updateBot
};
