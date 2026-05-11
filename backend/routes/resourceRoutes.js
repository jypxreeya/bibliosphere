import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

// Get Resources by Category
router.get("/", async (req, res) => {
  const { category } = req.query; // 'lecture', 'paper', 'question_paper', etc.

  try {
    let ref = db.collection("resources");
    if (category) {
      ref = ref.where("category", "==", category);
    }
    
    const snapshot = await ref.get();
    const resources = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resources" });
  }
});

// Recommendations
router.get("/recommendations", async (req, res) => {
  const { userId } = req.query;

  try {
    // For now, return popular books as recommendations
    const snapshot = await db.collection("books")
      .orderBy("recommendationScore", "desc")
      .limit(5)
      .get();
      
    const recommendations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
});

export default router;
