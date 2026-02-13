import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const BotDetail = () => {
  const { botId } = useParams();
  const [user, setUser] = useState(null);
  const [bot, setBot] = useState(null);
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

    const fetchBot = async () => {
      const botRef = doc(db, "bots", botId);
      const botSnap = await getDoc(botRef);
      if (botSnap.exists() && botSnap.data().ownerId === user.uid) {
        setBot({ id: botSnap.id, ...botSnap.data() });

        // إعداد بيانات Chart
        const chartData = [
          {
            date: new Date().toLocaleDateString(),
            users: botSnap.data().users || 0,
            servers: botSnap.data().servers || 0,
            commands: botSnap.data().commands || 0,
          },
        ];
        setStatsData(chartData);
      }
    };

    fetchBot();
  }, [user, botId, db]);

  const handleUpdatePrefix = async (e) => {
    e.preventDefault();
    const newPrefix = e.target.prefix.value;
    const botRef = doc(db, "bots", botId);
    await updateDoc(botRef, { prefix: newPrefix });
    setBot((prev) => ({ ...prev, prefix: newPrefix }));
    alert("تم تحديث البريفكس بنجاح");
  };

  if (!bot) return <p className="p-6">جارٍ تحميل بيانات البوت...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <main className="p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">{bot.name} - تفاصيل البوت</h1>

          {/* Chart */}
          <div className="mb-6">
            <Chart data={statsData} keys={["users", "servers", "commands"]} type="line" />
          </div>

          {/* Bot Settings */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">إعدادات البوت</h2>
            <form onSubmit={handleUpdatePrefix} className="flex flex-col gap-4">
              <label>
                البريفكس الحالي: <span className="font-semibold">{bot.prefix}</span>
              </label>
              <input
                type="text"
                name="prefix"
                placeholder="ادخل البريفكس الجديد"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
              >
                تحديث البريفكس
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BotDetail;
