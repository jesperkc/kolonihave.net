import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, useAuth } from "firebase/auth";

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
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
export const auth = getAuth();
export const db = getFirestore();
// export const useAuth1 = useAuth;

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore();
// export default app;
