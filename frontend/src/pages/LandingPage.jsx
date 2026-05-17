import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Added this line
import { BookOpen, Search, Calendar, Users, TrendingUp, LogIn } from "lucide-react";
import "../styles/LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search size={32} />,
      title: "Smart Book Search",
      description:
        "Search by title, author, or category. View exact shelf location, row number, and real-time availability.",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "AI Recommendations",
      description:
        "Get personalized book suggestions based on your course, reading history, and trending academic resources.",
    },
    {
      icon: <BookOpen size={32} />,
      title: "Digital Book Access",
      description:
        "Read digital copies of books instantly. Secure access to study materials without carrying physical copies.",
    },
    {
      icon: <Users size={32} />,
      title: "Smart Gate Security",
      description:
        "Advanced intelligent tracking and access gates to prevent unauthorized resource removal and automate checkout logs.",
    },
    {
      icon: <Calendar size={32} />,
      title: "Digital Resources",
      description:
        "Access recorded lectures, research papers, and university question papers in one digital portal.",
    },
    {
      icon: <LogIn size={32} />,
      title: "Smart Navigation",
      description:
        "Guided navigation to the exact shelf and row, making book finding faster and easier for students.",
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
            <span className="gradient-text">BIBLIOSPHERE</span>
          </h1>
          <p className="subtitle">
            Smart Library Management System. The future of library intelligence. 
            Automated, digitalized, and AI-driven knowledge management.
          </p>

          <div className="buttons">
            <button className="login-btn" onClick={() => navigate("/login")}>
              <LogIn size={20} /> Access Library
            </button>

            <button
              className="explore-btn"
              onClick={() => {
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Features ↓
            </button>
          </div>
        </motion.div>
      </div>

      <motion.section
        id="features"
        className="features-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="gradient-text" style={{fontSize: '2.5rem', marginBottom: '3rem'}}>System Capabilities</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer className="footer">
        <BookOpen className="footer-icon" size={24} />
        <p>© 2026 Bibliosphere — Smart Library Management System</p>
      </footer>
    </div>
  );
}
