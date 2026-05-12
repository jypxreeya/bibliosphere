import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

// Log search query
router.post("/search", async (req, res) => {
  const { userEmail, query } = req.body;
  if (!userEmail || !query) return res.status(400).json({ message: "Email and query required" });

  if (!db) {
    console.log("Mock Log: Search -", query);
    return res.status(200).json({ message: "Search logged (mock)" });
  }

  try {
    await db.collection("search_history").add({
      userEmail,
      query,
      timestamp: new Date().toISOString()
    });
    res.status(200).json({ message: "Search logged" });
  } catch (error) {
    res.status(500).json({ message: "Error logging search" });
  }
});

// Log read book
router.post("/read", async (req, res) => {
  const { userEmail, bookId, title, category } = req.body;
  if (!userEmail || !bookId) return res.status(400).json({ message: "Email and bookId required" });

  if (!db) {
    console.log("Mock Log: Read -", title);
    return res.status(200).json({ message: "Read logged (mock)" });
  }

  try {
    await db.collection("read_history").add({
      userEmail,
      bookId,
      title,
      category,
      timestamp: new Date().toISOString()
    });
    res.status(200).json({ message: "Read logged" });
  } catch (error) {
    res.status(500).json({ message: "Error logging read" });
  }
});

// Get Recommendations
router.get("/recommendations/:userEmail", async (req, res) => {
  const { userEmail } = req.params;

  if (!db) {
    return res.json([
      { id: "mock1", title: "Introduction to Quantum Physics", author: "Dr. Alice Smith", category: "Physics" },
      { id: "mock2", title: "Modern Web Architectures", author: "John Doe", category: "Web Technology" }
    ]);
  }

  try {
    // 1. Get histories
    const searchSnap = await db.collection("search_history").where("userEmail", "==", userEmail).get();
    const borrowSnap = await db.collection("borrowed_books").where("userEmail", "==", userEmail).get();
    const readSnap = await db.collection("read_history").where("userEmail", "==", userEmail).get();

    const searchQueries = searchSnap.docs.map(doc => doc.data().query);
    const borrowedTitles = borrowSnap.docs.map(doc => doc.data().title);
    const readCategories = readSnap.docs.map(doc => doc.data().category).filter(Boolean);

    // 2. Extract keywords (very simple version)
    const keywords = [...new Set([...searchQueries, ...borrowedTitles, ...readCategories])];

    if (keywords.length === 0) {
      // Return trending or random books if no history
      const trendingSnap = await db.collection("books").limit(5).get();
      return res.json(trendingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }

    // 3. Find recommendations (Mock logic: search for books with titles/categories matching keywords)
    // Firestore doesn't support "IN" queries with many items or partial matches well in this way
    // For a demo, we'll just pick a few keywords and search
    let recommendations = [];
    const booksRef = db.collection("books");

    for (const kw of keywords.slice(0, 3)) {
      const qSnap = await booksRef.where("title", ">=", kw).where("title", "<=", kw + "\uf8ff").limit(2).get();
      qSnap.forEach(doc => recommendations.push({ id: doc.id, ...doc.data() }));
      
      const cSnap = await booksRef.where("category", "==", kw).limit(2).get();
      cSnap.forEach(doc => recommendations.push({ id: doc.id, ...doc.data() }));
    }

    // Deduplicate and filter out already borrowed/read
    const uniqueRecs = recommendations.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
    const filteredRecs = uniqueRecs.filter(book => !borrowedTitles.includes(book.title));

    res.json(filteredRecs.slice(0, 5));
  } catch (error) {
    console.error("Recs error:", error);
    res.status(500).json({ message: "Error getting recommendations" });
  }
});

export default router;
