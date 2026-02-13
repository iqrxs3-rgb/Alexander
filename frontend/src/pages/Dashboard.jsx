import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import BotTable from "../components/BotTable";
import Chart from "../components/Chart";
import { getBots } from "../services/botService";

const Dashboard = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    setLoading(true);
    const data = await getBots();
    setBots(data || []);
    setLoading(false);
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex flex-wrap">
        <DashboardCard title="Total Bots" value={bots.length} color="bg-indigo-500" />
        <DashboardCard title="Total Servers" value={bots.reduce((acc, b) => acc + (b.serversCount || 0), 0)} color="bg-green-500" />
        <DashboardCard title="Total Users" value={bots.reduce((acc, b) => acc + (b.usersCount || 0), 0)} color="bg-blue-500" />
      </div>
      <BotTable />
      <Chart botId={bots[0]?.id} />
    </div>
  );
};

export default Dashboard;
