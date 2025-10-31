import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Added this line
import { BookOpen, Search, Calendar, Users, TrendingUp, LogIn } from "lucide-react";
import "../styles/LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate(); // ✅ Hook to navigate between pages

  const features = [
    {
      icon: <Search className="icon" />,
      title: "Book Tracking",
      description:
        "Track the availability of each book in real time. Know exactly how many copies are available and where they are located.",
    },
    {
      icon: <Calendar className="icon" />,
      title: "Due Date Tracking",
      description:
        "Never miss a return date again. Get automated reminders for due dates and manage your borrowed books efficiently.",
    },
    {
      icon: <Users className="icon" />,
      title: "Author-wise Categorization",
      description:
        "Easily explore books by your favorite authors. Find all their works grouped in one organized place.",
    },
    {
      icon: <TrendingUp className="icon" />,
      title: "Predictive Analysis",
      description:
        "Smart recommendations and reading trend insights help you discover popular books faster.",
    },
  ];

  return (
    <div className="landing-container">
      <div className="overlay">
        <motion.div
          className="hero"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="title">
            <span>Bibliosphere</span>
          </h1>
          <p className="subtitle">
            Smart Library Management System that simplifies, digitalizes, and
            automates book management and user operations.
          </p>

          <div className="buttons">
            {/* ✅ Updated login button to navigate */}
            <button className="login-btn" onClick={() => navigate("/login")}>
              <LogIn className="login-icon" /> Login
            </button>

            <button
              className="explore-btn"
              onClick={() => {
                document
                  .getElementById("about")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Features ↓
            </button>
          </div>
        </motion.div>
      </div>

      <motion.section
        id="about"
        className="about-section"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>About Bibliosphere</h2>
        <p>
          Bibliosphere is a smart library management system designed to simplify
          and digitalize the process of managing books, users, and library
          operations. It provides an efficient platform for both librarians and
          students/readers to manage book transactions like issuing, returning,
          and searching for books — all through a user-friendly web interface.
          It aims to replace the traditional manual system with a modern,
          automated, and intelligent approach using web technologies.
        </p>
      </motion.section>

      <motion.section
        id="features"
        className="features-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Our Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer className="footer">
        <BookOpen className="footer-icon" />
        <p>© 2025 Bibliosphere — Smart Library Management System</p>
      </footer>
    </div>
  );
}
