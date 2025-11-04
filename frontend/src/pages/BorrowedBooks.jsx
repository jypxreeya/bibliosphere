import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/BorrowedBooks.css";

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Fetch borrowed books from backend (dummy for now)
    axios
      .get("http://localhost:5000/api/borrowedBooks") // we'll link backend later
      .then((res) => setBorrowedBooks(res.data))
      .catch((err) => console.error("Error fetching borrowed books:", err));
  }, []);

  return (
    <div className="borrowed-books-container">
      <h2 className="page-title">📚 Borrowed Books</h2>

      <div className="books-grid">
        {borrowedBooks.length > 0 ? (
          borrowedBooks.map((book, index) => (
            <motion.div
              key={index}
              className="book-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3>{book.title}</h3>
              <p><b>Author:</b> {book.author}</p>
              <p><b>Borrowed:</b> {book.borrowDate}</p>
              <p><b>Due:</b> {book.dueDate}</p>
              <p
                className={`status ${
                  book.status === "Overdue" ? "overdue" : "active"
                }`}
              >
                {book.status}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="no-books">No borrowed books found 😶</p>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;
