import React, { useEffect, useState } from "react";
import { getBotStats } from "../services/statsService";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = ({ botId }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [botId]);

  const fetchStats = async () => {
    setLoading(true);
    const data = await getBotStats(botId);
    setStats(data.history || []);
    setLoading(false);
  };

  const chartData = {
    labels: stats.map(s => s.date),
    datasets: [
      {
        label: "Active Users",
        data: stats.map(s => s.usersCount),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        fill: true
      },
      {
        label: "Server Count",
        data: stats.map(s => s.serversCount),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.3,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true } }
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Bot Analytics</h2>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Analytics;
