import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBotById, updateBot } from "../services/botService";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const BotDetail = () => {
  const { botId } = useParams();
  const [bot, setBot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBot();
  }, [botId]);

  const fetchBot = async () => {
    setLoading(true);
    const data = await getBotById(botId);
    setBot(data);
    setLoading(false);
  };

  const toggleFeature = async (feature) => {
    const updatedFeatures = { ...bot.features, [feature]: !bot.features[feature] };
    const updatedBot = await updateBot(botId, updatedFeatures);
    setBot({ ...bot, features: updatedBot.features });
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (!bot) return <div className="text-center mt-10 text-gray-500">Bot not found</div>;

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{bot.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Servers: {bot.serversCount || 0}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Users: {bot.usersCount || 0}</p>
        <div className="flex flex-wrap space-x-3">
          {Object.keys(bot.features || {}).map(feature => (
            <button
              key={feature}
              onClick={() => toggleFeature(feature)}
              className={`flex items-center px-4 py-2 rounded-full text-white ${
                bot.features[feature] ? "bg-green-500" : "bg-red-500"
              } mb-2`}
            >
              {bot.features[feature] ? <FaToggleOn className="mr-2" /> : <FaToggleOff className="mr-2" />}
              {feature}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BotDetail;
