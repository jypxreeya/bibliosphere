import React, { useState } from "react";
import axios from "axios";
import "../styles/AuthorCategorization.css";

const AuthorCategorization = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [authors, setAuthors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/authors/${searchTerm}`);
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching author data", error);
    }
    setLoading(false);
  };

  return (
    <div className="author-page">
      <h1>📚 Author Categorization</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by book title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="author-results">
          {Object.keys(authors).length === 0 ? (
            <p>No data to display. Try searching for a book!</p>
          ) : (
            Object.entries(authors).map(([author, books]) => (
              <div key={author} className="author-card">
                <h2>{author}</h2>
                <ul>
                  {books.map((book, index) => (
                    <li key={index}>
                      <strong>{book.title}</strong> <br />
                      <span>Publisher: {book.publisher}</span> <br />
                      <span className={book.available === "Available" ? "available" : "not-available"}>
                        {book.available}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AuthorCategorization;
