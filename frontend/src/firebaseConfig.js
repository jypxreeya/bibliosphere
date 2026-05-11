import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDwCfhM01s5-L_Kw1BvOX-sqIRIsFS0V90",
  authDomain: "bibliosphere-26b46.firebaseapp.com",
  projectId: "bibliosphere-26b46",
  storageBucket: "bibliosphere-26b46.firebasestorage.app",
  messagingSenderId: "268961846729",
  appId: "1:268961846729:web:3a688b765cfb245b37c418",
  measurementId: "G-95SRMTKJ9E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { auth, analytics };
