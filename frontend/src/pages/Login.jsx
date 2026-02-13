// src/pages/Login.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../services/firebase"; // Firebase Auth + Discord provider
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import logo from "../assets/logo.png"; // شعار الموقع

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // لو المستخدم مسجل دخول، يروح مباشرة للـ Dashboard
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("تم تسجيل الدخول:", result.user);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("خطأ أثناء تسجيل الدخول:", err);
        alert("فشل تسجيل الدخول، حاول مرة ثانية");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md text-center">
        <img src={logo} alt="Logo" className="w-24 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">مرحبا بك في لوحة البوتات</h1>
        <p className="text-gray-600 mb-6">
          سجل دخولك عبر Discord للبدء في إدارة بوتاتك.
        </p>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-2 w-full bg-discord hover:bg-discord-dark text-white font-semibold py-3 rounded-lg transition-colors"
        >
          تسجيل الدخول عبر Discord
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14h-2v-4H7v-2h3V7h2v4h3v2h-3v4z" />
          </svg>
        </button>
        <p className="text-gray-400 mt-6 text-xs">
          باستخدام تسجيل الدخول، أنت توافق على شروطنا وسياسة الخصوصية.
        </p>
      </div>
    </div>
  );
};

export default Login;
