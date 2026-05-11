import express from "express";
import { auth, db } from "../firebase.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { email, password, name, role } = req.body; // role: 'student' or 'admin'

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Store additional user data in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      name,
      email,
      role: role || "student",
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: "User created successfully", uid: userRecord.uid });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Login (Verify Token) - Frontend will send the ID token
router.post("/verify-token", async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const userDoc = await db.collection("users").doc(decodedToken.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User data not found" });
    }

    res.json({ user: userDoc.data() });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
