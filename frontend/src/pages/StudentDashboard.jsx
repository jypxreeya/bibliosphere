import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/StudentDashboard.css";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [value, setValue] = useState(new Date());
  const [quizIndex, setQuizIndex] = useState(0);
  
  const navigate = useNavigate();

  
  const quizzes = [
    { q: "Who wrote 'Pride and Prejudice'?", a: "Jane Austen" },
    { q: "What is the capital of Japan?", a: "Tokyo" },
    { q: "What does HTML stand for?", a: "HyperText Markup Language" },
    { q: "Which planet is known as the Red Planet?", a: "Mars" },
    { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuizIndex((prev) => (prev + 1) % quizzes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h1 className="logo">📚 Bibliosphere</h1>
        <ul className="menu">
          <li className="menu-item active">🏠 Home</li>
          <li
            className="menu-item"
            onClick={() => navigate("/student-profile")}
          >
            👤 Profile
          </li>
          <li className="menu-item">📊 Analytics</li>
          <li className="menu-item">🕒 Attendance</li>
          <li className="menu-item logout">🚪 Sign Out</li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="header">
          <h2>Hello, Priya 👋</h2>
          <p className="date">{today}</p>
        </div>

        <motion.div
          className="box-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="big-box" onClick={() => navigate("/check-availability")}>
  🔍 Check Availability
</div>

          <div className="big-box">📘 Borrowed Books</div>
          <div className="big-box">👩‍💼 Author Categorization</div>
          <div className="big-box">🎓 Your Course</div>
        </motion.div>

        <div className="right-section">
          <motion.div
            className="calendar-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3>📅 Upcoming Events</h3>
            <Calendar onChange={setValue} value={value} />
          </motion.div>

          <motion.div
            className="quiz-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h3>🧠 Quick Quiz</h3>
            <div className="quiz-card">
              <p className="question">{quizzes[quizIndex].q}</p>
              <p className="answer">💡 {quizzes[quizIndex].a}</p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
