import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaChartLine, FaRobot, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Analytics", icon: <FaChartLine />, path: "/analytics" },
    { name: "Bots", icon: <FaRobot />, path: "/bots" },
    { name: "Settings", icon: <FaCog />, path: "/settings" }
  ];

  return (
    <div className={`bg-white dark:bg-gray-900 h-screen p-4 shadow-lg transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      <button
        className="mb-6 text-gray-800 dark:text-gray-200 focus:outline-none"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? ">" : "<"}
      </button>
      <ul className="space-y-4">
        {menuItems.map(item => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 ${
                location.pathname === item.path ? "bg-gray-200 dark:bg-gray-800" : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="ml-3 text-gray-800 dark:text-gray-200">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
