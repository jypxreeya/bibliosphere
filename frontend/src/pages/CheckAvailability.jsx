import React, { useState } from "react";
import "../styles/CheckAvailability.css";

export default function CheckAvailability() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      const limitedBooks = data.docs.slice(0, 10).map((book) => ({
        title: book.title,
        author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
        copies: Math.floor(Math.random() * 10) + 1,
      }));

      setBooks(limitedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="availability-container">
      <h1 className="page-title">📚 Check Book Availability</h1>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍 Search</button>
      </form>

      {loading && <p className="loading">Searching books...</p>}

      <div className="book-results">
        {books.map((book, index) => (
          <div className="book-card" key={index}>
            <h3>{book.title}</h3>
            <p>👩‍💼 Author: {book.author}</p>
            <p>📦 Copies Available: {book.copies}</p>
            <p className={book.copies > 0 ? "available" : "unavailable"}>
              {book.copies > 0 ? "✅ Available" : "❌ Not Available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
