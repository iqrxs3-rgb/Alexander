import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from "firebase/firestore";

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getBot = async (botId) => {
  const docRef = doc(db, "bots", botId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const getAllBots = async () => {
  const querySnapshot = await getDocs(collection(db, "bots"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateBotData = async (botId, data) => {
  const docRef = doc(db, "bots", botId);
  await updateDoc(docRef, data);
  const updated = await getDoc(docRef);
  return updated.data();
};

export const addBotData = async (botId, data) => {
  const docRef = doc(db, "bots", botId);
  await setDoc(docRef, data);
};

export const getBotStats = async (botId) => {
  const docRef = doc(db, "stats", botId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : { history: [] };
};

export const updateBotStats = async (botId, data) => {
  const docRef = doc(db, "stats", botId);
  await setDoc(docRef, data, { merge: true });
};
