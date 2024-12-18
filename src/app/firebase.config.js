import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDA8LVcBB6ZuFMGtZZLEh_veJ44WGrNRdE',
//   authDomain: 'house-marketplace-app-fb1d0.firebaseapp.com',
//   projectId: 'house-marketplace-app-fb1d0',
//   storageBucket: 'house-marketplace-app-fb1d0.appspot.com',
//   messagingSenderId: '832068369979',
//   appId: '1:832068369979:web:dce177da9bfc60a4b4e61e',
// }

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
