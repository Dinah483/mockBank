// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDs0hWibNlknxaXjo-OF-BFHQM195dIPrY",
  authDomain: "mockbank-e070f.firebaseapp.com",
  projectId: "mockbank-e070f",
  storageBucket: "mockbank-e070f.appspot.com",
  messagingSenderId: "1061642493857",
  appId: "1:1061642493857:web:f988ea749739bc151ef5e0",
  measurementId: "G-YN7TSGXES5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);