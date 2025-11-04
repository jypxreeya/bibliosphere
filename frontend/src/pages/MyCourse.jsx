import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/MyCourse.css";


const subjects = [
  "Web Technology",
  "Agile Methodology",
  "Computer Networks",
  "Theory of Computation",
  "JEE Framework",
  "Data Warehouse and Data Management",
];

const MyCourse = () => {
  const [books, setBooks] = useState({});

  const fetchBooks = async (subject) => {
    try {
      const res = await axios.get(`https://openlibrary.org/search.json?q=${subject}&limit=2`);
      const bookList = res.data.docs.map((b) => ({
        title: b.title,
        author: b.author_name ? b.author_name[0] : "Unknown",
      }));
      setBooks((prev) => ({ ...prev, [subject]: bookList }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    subjects.forEach((sub) => fetchBooks(sub));
  }, []);

  return (
    <div className="mycourse-container">
      <h1 className="course-title">📖 My Course</h1>
      <div className="course-grid">
        {subjects.map((subject, i) => (
          <motion.div
            key={i}
            className="course-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h2 className="subject-name">{subject}</h2>
            <div className="book-section">
              {books[subject] ? (
                books[subject].map((b, idx) => (
                  <p key={idx} className="book-item">
                    📘 <strong>{b.title}</strong> <br /> ✍️ {b.author}
                  </p>
                ))
              ) : (
                <p>Loading books...</p>
              )}
            </div>
            <button className="refresh-btn" onClick={() => fetchBooks(subject)}>
              🔄 Refresh
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyCourse;
