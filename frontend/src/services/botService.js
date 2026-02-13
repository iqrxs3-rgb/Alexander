import { db, collection, getDocs, doc, getDoc, setDoc } from './firebase';

const botsCollection = collection(db, "bots");

export const getAllBots = async () => {
  const snapshot = await getDocs(botsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export { getAllBots as getBots };

export const getBotById = async (id) => {
  const docRef = doc(db, "bots", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
};

export const updateBot = async (id, data) => {
  const docRef = doc(db, "bots", id);
  await setDoc(docRef, data, { merge: true });
};
