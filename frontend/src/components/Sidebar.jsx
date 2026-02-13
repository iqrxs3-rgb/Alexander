// src/components/Sidebar.jsx
import React, { useState } from "react";
import { FaTachometerAlt, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Analytics", icon: <FaChartBar />, path: "/analytics" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  return (
    <div
      className={`bg-white h-screen shadow-lg p-5 flex flex-col justify-between transition-width duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        <div className="mb-10 flex justify-between items-center">
          {!collapsed && <h1 className="text-xl font-bold">لوحة البوتات</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 focus:outline-none"
          >
            {collapsed ? ">>" : "<<"}
          </button>
        </div>
        <nav className="flex flex-col gap-3">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-700">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      {!collapsed && (
        <div className="text-gray-400 text-sm mt-5">
          &copy; 2026 Beirut Bots
        </div>
      )}
    </div>
  );
};

export default Sidebar;
