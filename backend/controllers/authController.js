const { getDoc, doc } = require("firebase/firestore");
const { db } = require("../utils/firebase");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

async function loginUser({ email, password }) {
  const usersRef = doc(db, "users", email);
  const userSnap = await getDoc(usersRef);
  if (!userSnap.exists()) throw new Error("User not found");

  const user = userSnap.data();
  if (user.password !== password) throw new Error("Invalid password");

  const token = jwt.sign({ userId: email }, JWT_SECRET, { expiresIn: "7d" });
  return token;
}

async function getUserProfile(userId) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error("User not found");
  const { password, ...profile } = userSnap.data();
  return profile;
}

module.exports = { loginUser, getUserProfile };
