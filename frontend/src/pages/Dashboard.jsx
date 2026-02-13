import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import BotTable from "../components/BotTable";
import Chart from "../components/Chart";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bots, setBots] = useState([]);
  const [statsData, setStatsData] = useState([]);

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

 
  useEffect(() => {
    if (!user) return;

    const fetchBots = async () => {
      const q = query(collection(db, "bots"), where("ownerId", "==", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBots(data);

      // إعداد بيانات الـ Chart
      const chartData = data.map((bot) => ({
        date: new Date().toLocaleDateString(),
        users: bot.users || 0,
        servers: bot.servers || 0,
        commands: bot.commands || 0,
      }));
      setStatsData(chartData);
    };

    fetchBots();
  }, [user]);

  // دوال التحكم بالبوتات
  const handleEdit = (botId) => {
    console.log("Edit bot", botId);
  };
  const handleDelete = (botId) => {
    console.log("Delete bot", botId);
  };
  const handleStats = (botId) => {
    console.log("Show stats for bot", botId);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />

        <main className="p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {bots.map((bot) => (
              <DashboardCard
                key={bot.id}
                title={bot.name}
                value={`Users: ${bot.users || 0}`}
                iconType="users"
                color="border-blue-500"
              />
            ))}
          </div>

          {/* Chart */}
          <div className="mb-6">
            <Chart data={statsData} keys={["users", "servers", "commands"]} type="line" />
          </div>

          {/* Bot Table */}
          <div>
            <BotTable
              bots={bots}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStats={handleStats}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
