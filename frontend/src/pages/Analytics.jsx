import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Analytics = () => {
  const [user, setUser] = useState(null);
  const [bots, setBots] = useState([]);
  const [chartData, setChartData] = useState([]);
  const db = getFirestore();

  // جلب المستخدم الحالي
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // جلب البوتات والإحصائيات
  useEffect(() => {
    if (!user) return;

    const fetchBots = async () => {
      const q = query(collection(db, "bots"), where("ownerId", "==", user.uid));
      const snapshot = await getDocs(q);
      const botsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBots(botsData);

      // تجهيز بيانات الرسوم البيانية (مثال: مجموع المستخدمين والسيرفرات لكل بوت)
      const chartArray = botsData.map((bot) => ({
        name: bot.name,
        users: bot.users || 0,
        servers: bot.servers || 0,
        commands: bot.commands || 0,
      }));
      setChartData(chartArray);
    };

    fetchBots();
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <main className="p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">تحليلات البوتات</h1>

          {bots.length === 0 ? (
            <p className="text-gray-500">لا توجد بوتات لعرض البيانات.</p>
          ) : (
            <>
              {/* Chart لكل البوتات */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bots.map((bot) => (
                  <Chart
                    key={bot.id}
                    data={[
                      {
                        date: new Date().toLocaleDateString(),
                        users: bot.users || 0,
                        servers: bot.servers || 0,
                        commands: bot.commands || 0,
                      },
                    ]}
                    keys={["users", "servers", "commands"]}
                    type="bar"
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Analytics;
