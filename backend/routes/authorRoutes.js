import express from "express";
import axios from "axios";

const router = express.Router();

// Route: GET /api/authors/:bookName
router.get("/:bookName", async (req, res) => {
  const { bookName } = req.params;

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(bookName)}`
    );

    // Group books by author
    const grouped = {};

    response.data.docs.forEach((book) => {
      if (book.author_name && book.title) {
        book.author_name.forEach((author) => {
          if (!grouped[author]) grouped[author] = [];
          grouped[author].push({
            title: book.title,
            publisher: book.publisher ? book.publisher[0] : "Unknown",
            available: Math.random() > 0.3 ? "Available" : "Not Available",
          });
        });
      }
    });

    res.json(grouped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch author data" });
  }
});

export default router;
