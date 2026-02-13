// جلب الإحصائيات من Firebase
import { db, collection, getDocs } from './firebase';

const statsCollection = collection(db, "stats");

export const fetchStats = async () => {
  const snapshot = await getDocs(statsCollection);
  const stats = [];
  snapshot.forEach(doc => stats.push({ id: doc.id, ...doc.data() }));
  return stats;
};
export  { fetchStats as getBotStats };
