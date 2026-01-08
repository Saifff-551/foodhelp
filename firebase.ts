import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAEegHswlx_fuldc1M3VsJNdmBQrJciSVw",
  authDomain: "foodhelp-53b4d.firebaseapp.com",
  projectId: "foodhelp-53b4d",
  storageBucket: "foodhelp-53b4d.firebasestorage.app",
  messagingSenderId: "393013772236",
  appId: "1:393013772236:web:4eeb9bbb89fd26529e2769",
  measurementId: "G-TM8BDBTM2G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
