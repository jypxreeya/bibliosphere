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
  const [resources, setResources] = useState({});

  const fetchData = async (subject) => {
    try {
      // Fetch books
      const bookRes = await axios.get(`http://localhost:5000/api/books/search?query=${subject}&type=category`);
      setBooks((prev) => ({ ...prev, [subject]: bookRes.data }));

      // Fetch digital resources
      const resRes = await axios.get(`http://localhost:5000/api/resources?category=lecture`);
      setResources((prev) => ({ ...prev, [subject]: resRes.data }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    subjects.forEach((sub) => fetchData(sub));
  }, []);

  return (
    <div className="mycourse-container">
      <h1 className="course-title">📖 My Course & Digital Resources</h1>
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
            
            <div className="content-section">
              <h3>📚 Physical Books</h3>
              {books[subject] && books[subject].length > 0 ? (
                books[subject].map((b, idx) => (
                  <p key={idx} className="book-item">
                    📘 <strong>{b.title}</strong> <br /> 
                    📍 Shelf: {b.shelfLocation} | Row: {b.rowNumber}
                  </p>
                ))
              ) : (
                <p className="no-data">No physical books found.</p>
              )}

              <h3>📹 Digital Resources</h3>
              {resources[subject] && resources[subject].length > 0 ? (
                resources[subject].map((r, idx) => (
                  <a key={idx} href={r.url} target="_blank" rel="noreferrer" className="resource-link">
                    🎥 {r.title}
                  </a>
                ))
              ) : (
                <p className="no-data">No lectures available.</p>
              )}
            </div>

            <button className="refresh-btn" onClick={() => fetchData(subject)}>
              🔄 Refresh Data
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyCourse;
