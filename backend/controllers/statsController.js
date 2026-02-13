const { doc, getDoc, setDoc, updateDoc } = require("firebase/firestore");
const { db } = require("../utils/firebase");

async function getBotStatsData(botId) {
  const docRef = doc(db, "stats", botId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return { history: [] };
  return docSnap.data();
}

async function updateBotStatsData(botId, data) {
  const docRef = doc(db, "stats", botId);
  await setDoc(docRef, data, { merge: true });
  const updated = await getDoc(docRef);
  return updated.data();
}

module.exports = { getBotStatsData, updateBotStatsData };
