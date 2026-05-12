import React, { useState } from "react";
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
  Users,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthorCategorization.css";

const AuthorCategorization = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Search Books");
  const [searchTerm, setSearchTerm] = useState("");
  const [authors, setAuthors] = useState({});
  const [loading, setLoading] = useState(false);

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
          <Plus size={18} /> New Author Scan
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
              <h3 className="font-mono">AUTHOR ANALYTICS // CATEGORIZATION</h3>
            </div>
          </div>

          <div className="global-search-wrapper">
            <Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Query book title to identify author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
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
            <h1 className="welcome-text">Author <span className="gradient-text">Categorization</span></h1>
            <p className="system-status">Active Search: <span className="text-active">{searchTerm || 'NONE'}</span> | Database: <span className="text-active">GLOBAL</span></p>
          </section>

          <div className="author-results">
            {loading ? (
              <div className="loading-container glass-card">
                <p className="loading-text font-mono">Scanning global author database...</p>
              </div>
            ) : Object.keys(authors).length === 0 ? (
              <div className="no-data-container glass-card">
                <p>No results found. Initiate a search to map authors.</p>
              </div>
            ) : (
              <div className="authors-grid">
                {Object.entries(authors).map(([author, books]) => (
                  <motion.div 
                    key={author} 
                    className="author-card glass-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="author-card-header">
                      <Users size={20} className="text-muted" />
                      <h2>{author}</h2>
                    </div>
                    <ul className="book-list">
                      {books.map((book, index) => (
                        <li key={index} className="book-entry glass-card">
                          <div className="book-top">
                            <strong>{book.title}</strong>
                            <span className={`status-tag ${book.available === "Available" ? "available" : "not-available"}`}>
                              {book.available}
                            </span>
                          </div>
                          <span className="publisher-text">Publisher: {book.publisher}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthorCategorization;
