import React, { useState } from "react";
import axios from "axios";
import "../styles/CheckAvailability.css";

const CheckAvailability = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search books from OpenLibrary API
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${searchTerm}`
      );
      const results = res.data.docs.slice(0, 10).map((book) => ({
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown",
        publisher: book.publisher ? book.publisher[0] : "Not available",
        available: Math.random() > 0.3, // random availability for now
      }));
      setBooks(results);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
    setLoading(false);
  };

  // Borrow Book Function
  const handleBorrow = async (book) => {
    try {
      await axios.post("http://localhost:5000/api/borrowed/add", {
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        userEmail: "student@example.com", // replace with logged-in user's email later
      });
      alert(`✅ "${book.title}" has been borrowed! Check your email.`);
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("❌ Failed to borrow book. Try again later.");
    }
  };

  return (
    <div className="check-container">
      <h2>📚 Check Book Availability</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="book-list">
        {books.length === 0 && !loading ? (
          <p>No books found. Try searching something else.</p>
        ) : (
          books.map((book, index) => (
            <div key={index} className="book-card">
              <h3>{book.title}</h3>
              <p>👩‍💼 Author: {book.author}</p>
              <p>🏢 Publisher: {book.publisher}</p>
              <p>
                {book.available ? "✅ Available" : "❌ Not Available"}
              </p>
              {book.available && (
                <button
                  className="borrow-btn"
                  onClick={() => handleBorrow(book)}
                >
                  📖 Borrow
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckAvailability;