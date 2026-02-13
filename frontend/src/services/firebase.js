// src/services/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  OAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

// ======= إعدادات Firebase =======
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_PROJECT.firebaseapp.com",
  projectId: "YOUR_FIREBASE_PROJECT",
  storageBucket: "YOUR_FIREBASE_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// ======= Auth =======
const auth = getAuth(app);
const provider = new OAuthProvider("discord.com");

// دوال مساعدة لتسجيل الدخول والخروج
const loginWithDiscord = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.error("فشل تسجيل الدخول:", err);
    throw err;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("فشل تسجيل الخروج:", err);
  }
};

// ======= Firestore =======
const db = getFirestore(app);

// دوال مساعدة لجلب البوتات الخاصة بالمستخدم
const getUserBots = async (userId) => {
  const q = query(collection(db, "bots"), where("ownerId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// دوال تحديث بيانات بوت
const updateBot = async (botId, data) => {
  const botRef = doc(db, "bots", botId);
  await updateDoc(botRef, data);
};

// دوال لإنشاء بوت جديد
const createBot = async (botId, data) => {
  const botRef = doc(db, "bots", botId);
  await setDoc(botRef, data);
};

export {
  app,
  auth,
  provider,
  loginWithDiscord,
  logout,
  db,
  getUserBots,
  updateBot,
  createBot,
  onAuthStateChanged,
};
