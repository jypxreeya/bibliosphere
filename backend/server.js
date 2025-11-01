import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // important for calling OpenLibrary

const app = express();
app.use(cors());
app.use(express.json());

// Route to search for books
app.get("/api/books", async (req, res) => {
  const { title } = req.query; // e.g. /api/books?title=harry+potter
  if (!title) {
    return res.status(400).json({ error: "Please provide a book title" });
  }

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`);
    const data = await response.json();

    // Simplify the data before sending it back
    const books = data.docs.slice(0, 5).map(book => ({
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown",
      copies: Math.floor(Math.random() * 5) + 1, // random number 1–5
      available: Math.random() > 0.3, // 70% chance of available
    }));

    res.json(books);
  } catch (error) {
    console.error("Error fetching from OpenLibrary:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
