import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Search, 
  Star, 
  BookOpen, 
  Calendar, 
  Navigation as NavIcon, 
  History, 
  Bell, 
  User, 
  Settings,
  Plus,
  Moon,
  ArrowLeft,
  Clock,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/BorrowedBooks.css";

const BorrowedBooks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("History");
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/student-dashboard" },
    { name: "Search Books", icon: <Search size={20} />, path: "/check-availability" },
    { name: "Research Portal", icon: <FileText size={20} />, path: "/research-portal" },
    { name: "Digital Resources", icon: <BookOpen size={20} />, path: "/mycourse" },
    { name: "Attendance", icon: <Calendar size={20} />, path: "/attendance" },
    { name: "Navigation", icon: <NavIcon size={20} />, path: "/navigation" },
    { name: "History", icon: <History size={20} />, path: "/borrowed-books" },
    { name: "Notifications", icon: <Bell size={20} />, path: "#" },
    { name: "Profile", icon: <User size={20} />, path: "/student-profile" },
    { name: "Settings", icon: <Settings size={20} />, path: "#" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/borrowedBooks")
      .then((res) => setBorrowedBooks(res.data))
      .catch((err) => console.error("Error fetching borrowed books:", err));
  }, []);

  return (
    <div className="nexus-container">
      {/* Sidebar */}
      <aside className="nexus-sidebar">
        <div className="branding">
          <h2 className="brand-name gradient-text">BIBLIOSPHERE</h2>
          <span className="brand-tagline">Academic Nexus v4.0</span>
        </div>

        <nav className="nexus-nav">
          {menuItems.map((item) => (
            <div 
              key={item.name} 
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.name);
                if (item.path !== "#") navigate(item.path);
              }}
            >
              {item.icon}
              <span className="nav-label">{item.name}</span>
            </div>
          ))}
        </nav>

        <button className="session-btn">
          <Plus size={18} /> New Archive Entry
        </button>
      </aside>

      {/* Main Content */}
      <main className="nexus-main">
        <header className="nexus-header">
          <div className="header-left-group">
            <button className="back-btn glass-card" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
            </button>
            <div className="console-title">
              <h3 className="font-mono">BORROWING LOGS // TEMPORARY ARCHIVES</h3>
            </div>
          </div>

          <div className="global-search-wrapper">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Query history metadata..." />
          </div>

          <div className="user-profile-pill glass-card">
            <Bell size={20} className="text-muted" />
            <Moon size={20} className="text-muted" />
            <div className="divider" />
            <div className="user-info">
              <span className="user-name">Dr. Aris Thorne</span>
              <span className="user-dept">Quantum Linguistics Dept.</span>
            </div>
            <div className="user-avatar" />
          </div>
        </header>

        <div className="nexus-content">
          <section className="welcome-section">
            <h1 className="welcome-text">Borrowing <span className="gradient-text">History</span></h1>
            <p className="system-status">Total Records: <span className="text-active">{borrowedBooks.length}</span> | Status: <span className="text-active">SYNCHRONIZED</span></p>
          </section>

          <div className="books-grid">
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book, index) => (
                <motion.div
                  key={index}
                  className="book-card glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="card-top">
                    <Clock size={16} className="text-muted" />
                    <span className={`status-pill ${book.status === "Overdue" ? "overdue" : "active"}`}>
                      {book.status}
                    </span>
                  </div>
                  <h3 className="book-title">{book.title}</h3>
                  <div className="book-info">
                    <p><b>Researcher:</b> {book.author}</p>
                    <p><b>Borrowed:</b> {book.borrowDate}</p>
                    <p><b>Return By:</b> <span className="highlight-text">{book.dueDate}</span></p>
                  </div>
                  <button className="extend-btn">EXTEND DURATION</button>
                </motion.div>
              ))
            ) : (
              <div className="no-books-container glass-card">
                <p className="no-books">No active borrowing records detected in the local cache.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BorrowedBooks;
