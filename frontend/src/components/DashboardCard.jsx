import React from "react";

const DashboardCard = ({ title, value, icon, color, progress }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full sm:w-60 m-3`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-gray-400 dark:text-gray-300 text-sm">{title}</span>
          <span className="text-2xl font-bold text-gray-800 dark:text-white">{value}</span>
        </div>
        <div className={`p-3 rounded-full ${color} text-white`}>{icon}</div>
      </div>
      {progress !== undefined && (
        <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className={`h-2 rounded-full ${color}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
