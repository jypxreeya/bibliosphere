import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

// Get Resources by Category
router.get("/", async (req, res) => {
  const { category } = req.query; // 'lecture', 'paper', 'question_paper', etc.

  try {
    if (!db) {
      // Mock data for Digital Resources
      const mockResources = [
        { id: "m1", title: "Introduction to Advanced Algorithms", url: "https://www.youtube.com/watch?v=0IAPZzGSbME", category: "lecture" },
        { id: "m2", title: "Microservices Architecture Patterns", url: "https://www.youtube.com/watch?v=CdBtNQZH8a4", category: "lecture" },
        { id: "m3", title: "Cloud Native Systems Design", url: "https://www.youtube.com/watch?v=v_Jp9TigY-8", category: "lecture" }
      ];
      return res.json(category ? mockResources : mockResources);
    }

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
    if (!db) {
      return res.json([
        { id: "r1", title: "Clean Code", author: "Robert C. Martin", recommendationScore: 100 },
        { id: "r2", title: "The Pragmatic Programmer", author: "Andrew Hunt", recommendationScore: 95 },
        { id: "r3", title: "Refactoring", author: "Martin Fowler", recommendationScore: 90 }
      ]);
    }

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
