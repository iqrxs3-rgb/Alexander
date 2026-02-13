import React, { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { getAllBots, updateBot } from "../services/botService";

const BotTable = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    setLoading(true);
    const data = await getAllBots();
    setBots(data || []);
    setLoading(false);
  };

  const toggleFeature = async (botId, feature) => {
    const bot = bots.find(b => b.id === botId);
    const updatedFeatures = { ...bot.features, [feature]: !bot.features[feature] };
    const updatedBot = await updateBot(botId, updatedFeatures);
    setBots(prev =>
      prev.map(b => (b.id === botId ? { ...b, features: updatedBot.features } : b))
    );
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <thead>
          <tr className="text-left border-b border-gray-200 dark:border-gray-700">
            <th className="px-6 py-3">Bot Name</th>
            <th className="px-6 py-3">Server Count</th>
            <th className="px-6 py-3">Users</th>
            <th className="px-6 py-3">Features</th>
          </tr>
        </thead>
        <tbody>
          {bots.map(bot => (
            <tr key={bot.id} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{bot.name}</td>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{bot.serversCount || 0}</td>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{bot.usersCount || 0}</td>
              <td className="px-6 py-4 flex space-x-3">
                {Object.keys(bot.features || {}).map(feature => (
                  <button
                    key={feature}
                    onClick={() => toggleFeature(bot.id, feature)}
                    className={`flex items-center px-3 py-1 rounded-full text-white ${
                      bot.features[feature] ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {bot.features[feature] ? <FaToggleOn className="mr-1" /> : <FaToggleOff className="mr-1" />}
                    {feature}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BotTable;
