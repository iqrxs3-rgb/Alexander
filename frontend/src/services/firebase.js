import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyATqaMK4ZBCd-C4EdfGcMQNAqJXR-8Qfrc",
  authDomain: "beirutbots.firebaseapp.com",
  databaseURL: "https://beirutbots-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "beirutbots",
  storageBucket: "beirutbots.firebasestorage.app",
  messagingSenderId: "344670989751",
  appId: "1:344670989751:web:5b136557d1a4ca09c1cc32",
  measurementId: "G-F51NB14L9G"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { collection, doc, getDoc, getDocs, setDoc };

export default app;