import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let db, auth;

try {
  if (process.env.FIREBASE_PRIVATE_KEY && !process.env.FIREBASE_PRIVATE_KEY.includes("...")) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    }
    db = admin.firestore();
    auth = admin.auth();
    console.log("✅ Firebase Admin Initialized");
  } else {
    console.warn("⚠️ Firebase credentials missing or placeholder. Database features disabled.");
  }
} catch (error) {
  console.error("❌ Firebase Initialization Error:", error.message);
  console.warn("⚠️ Continuing without Firebase... (Email system will still work)");
}

export { db, auth };
