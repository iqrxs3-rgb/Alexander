// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

/**
 * Middleware للتحقق من صلاحية المستخدم عبر JWT
 */
const verifyToken = (req, res, next) => {
  try {
    // جلب الـ token من الـ headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "مفقود Authorization token" });
    }

    const token = authHeader.split(" ")[1];

    // التحقق من صحة الـ token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // حفظ بيانات المستخدم في req.user لاستخدامها في أي controller
    req.user = {
      id: decoded.id
      // ممكن تضيف username أو email لو تحب
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Token غير صالح أو منتهي" });
  }
};

module.exports = { verifyToken };
