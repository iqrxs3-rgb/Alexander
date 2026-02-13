// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// يمكنك لاحقًا ربطه مع قاعدة بيانات Firebase أو أي DB أخرى

/**
 * تسجيل مستخدم جديد
 */
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // تحقق من وجود البيانات
    if (!username || !email || !password) {
      return res.status(400).json({ message: "جميع الحقول مطلوبة" });
    }

    // هنا تقدر تتحقق إذا المستخدم موجود مسبقًا في DB

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد في DB (placeholder)
    const newUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    // إنشاء JWT token
    const token = jwt.sign(
      { id: newUser.id || "user_id_placeholder" },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "تم تسجيل الحساب بنجاح",
      user: newUser,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

/**
 * تسجيل دخول مستخدم
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // تحقق من وجود البيانات
    if (!email || !password) {
      return res.status(400).json({ message: "جميع الحقول مطلوبة" });
    }

    // جلب المستخدم من DB (placeholder)
    const user = {
      id: "user_id_placeholder",
      email,
      password: "$2a$10$hashedpasswordplaceholder", // مثال
      username: "exampleUser"
    };

    // التحقق من كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "بيانات الدخول غير صحيحة" });
    }

    // إنشاء JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

/**
 * جلب بيانات المستخدم الحالي
 */
const getUserProfile = async (req, res) => {
  try {
    // في الحقيقة تستخدم req.user بعد verifyToken
    const user = req.user || {
      id: "user_id_placeholder",
      username: "exampleUser",
      email: "example@example.com"
    };

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
