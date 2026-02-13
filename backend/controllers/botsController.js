const { collection, doc, getDoc, getDocs, updateDoc } = require("firebase/firestore");
const { db } = require("../utils/firebase");

async function getBotsData() {
  const querySnapshot = await getDocs(collection(db, "bots"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getBotById(botId) {
  const docRef = doc(db, "bots", botId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("Bot not found");
  return { id: docSnap.id, ...docSnap.data() };
}

async function updateBotData(botId, data) {
  const docRef = doc(db, "bots", botId);
  await updateDoc(docRef, data);
  const updated = await getDoc(docRef);
  return { id: updated.id, ...updated.data() };
}

module.exports = { getBotsData, getBotById, updateBotData };
