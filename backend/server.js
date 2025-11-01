import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/books", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ message: "Query is required" });

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await response.json();

    const results = data.docs.slice(0, 8).map((book) => ({
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown",
      availability: Math.floor(Math.random() * 5) + 1, // random copies left
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
