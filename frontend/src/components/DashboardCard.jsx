// src/components/DashboardCard.jsx
import React from "react";
import { FaUsers, FaServer, FaBolt } from "react-icons/fa";

const DashboardCard = ({ title, value, iconType, color }) => {
  // اختيار الايقونة بناء على type
  const renderIcon = () => {
    switch (iconType) {
      case "users":
        return <FaUsers className="text-2xl" />;
      case "servers":
        return <FaServer className="text-2xl" />;
      case "commands":
        return <FaBolt className="text-2xl" />;
      default:
        return <FaBolt className="text-2xl" />;
    }
  };

  return (
    <div
      className={`flex items-center p-5 rounded-lg shadow-lg bg-white border-l-8 ${color}`}
    >
      <div className="mr-4">{renderIcon()}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
