// src/components/BotTable.jsx
import React from "react";
import { FaEdit, FaChartBar, FaTrash } from "react-icons/fa";

/**
 * BotTable component
 * @param {Array} bots - مصفوفة البوتات [{id, name, status, users, servers}]
 * @param {Function} onEdit - callback للتعديل
 * @param {Function} onDelete - callback للحذف
 * @param {Function} onStats - callback لعرض الإحصائيات
 */
const BotTable = ({ bots, onEdit, onDelete, onStats }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              اسم البوت
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              الحالة
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              المستخدمين
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              السيرفرات
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              أفعال
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bots.map((bot) => (
            <tr key={bot.id}>
              <td className="px-6 py-4 whitespace-nowrap">{bot.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bot.status === "online" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {bot.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{bot.users}</td>
              <td className="px-6 py-4 whitespace-nowrap">{bot.servers}</td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button
                  onClick={() => onEdit(bot.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onStats(bot.id)}
                  className="text-green-500 hover:text-green-700"
                >
                  <FaChartBar />
                </button>
                <button
                  onClick={() => onDelete(bot.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BotTable;
