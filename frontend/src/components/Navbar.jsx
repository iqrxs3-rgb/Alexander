// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase"; // افترضنا Firebase Auth

const Navbar = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    signOut(auth).catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-700">لوحة البوتات</h1>

        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن بوت..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-4 relative">
        {/* Notification Icon */}
        <button className="relative text-gray-600 hover:text-gray-800">
          <FaBell />
          {/* badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Avatar / Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <FaUserCircle className="w-8 h-8 text-gray-500" />
            )}
            <span className="text-gray-700 font-medium">
              {user?.displayName || "المستخدم"}
            </span>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                تسجيل الخروج
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                الإعدادات
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                الملف الشخصي
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
