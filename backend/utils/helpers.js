// backend/utils/helpers.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * تشفير كلمة المرور
 * @param {string} password
 * @returns {Promise<string>} hashed password
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * التحقق من كلمة المرور
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * إنشاء JWT token
 * @param {string} userId
 * @param {string} expiresIn
 * @returns {string} token
 */
const generateToken = (userId, expiresIn = "7d") => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "secret",
    { expiresIn }
  );
};

/**
 * مثال دالة مساعدة لتنسيق الأرقام (لـ stats)
 * @param {number} num
 * @returns {string} formatted number
 */
const formatNumber = (num) => {
  return num.toLocaleString();
};

/**
 * دالة مساعدة لتوقيت الوقت الحالي بصيغة ISO
 * @returns {string}
 */
const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  formatNumber,
  getCurrentTimestamp
};
