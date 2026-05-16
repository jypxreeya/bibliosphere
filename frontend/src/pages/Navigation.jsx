import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Search,
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
  MapPin,
  ChevronRight,
  Compass,
  FileText,
  Map as MapIcon,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Navigation.css";

const NavigationPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Navigation");
  const [searchTerm, setSearchTerm] = useState("");
  const [targetBook, setTargetBook] = useState(null);
  const [showPath, setShowPath] = useState(false);

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
    { name: "Logout", icon: <LogOut size={20} />, path: "/", action: () => navigate("/") },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Mocking a found book
    setTargetBook({
      title: searchTerm,
      floor: "2nd Floor",
      section: "Computer Science",
      shelf: "Shelf A-12",
      coordinates: { x: 320, y: 150 }
    });
    setShowPath(true);
  };

  const steps = [
    { icon: "🚪", text: "Enter through the main entrance (Ground Floor)." },
    { icon: "🛗", text: "Proceed to 2nd Floor using the elevator on the right." },
    { icon: "➡️", text: "Turn right after exiting the elevator." },
    { icon: "📂", text: "Locate Section CS (Computer Science)." },
    { icon: "🚶", text: "Walk towards the third row of shelves." },
    { icon: "📍", text: `Reach ${targetBook?.shelf || "Shelf A-12"}.` }
  ];

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
                if (item.action) {
                  item.action();
                } else {
                  setActiveTab(item.name);
                  if (item.path !== "#") navigate(item.path);
                }
              }}
            >
              {item.icon}
              <span className="nav-label">{item.name}</span>
            </div>
          ))}
        </nav>


      </aside>

      {/* Main Content */}
      <main className="nexus-main">
        <header className="nexus-header">
          <div className="header-left-group">
            <button className="back-btn glass-card" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
            </button>
            <div className="console-title">
              <h3 className="font-mono">SPATIAL GUIDANCE // INDOOR NAV</h3>
            </div>
          </div>

          <div className="user-profile-pill glass-card">
            <Bell size={20} className="text-muted" />
            <Moon size={20} className="text-muted" />
            <div className="divider" />
            <div className="user-info">
              <span className="user-name">Jayapriya</span>
              <span className="user-dept">M.Tech CSE 3rd Yr</span>
            </div>
            <div className="user-avatar" />
          </div>
        </header>

        <div className="nexus-content navigation-layout">
          <section className="search-hero glass-card nav-search">
            <h1 className="hero-title">Library <span className="gradient-text">Navigation</span></h1>
            {targetBook ? (
              <p className="hero-subtitle">{targetBook.floor}, Section CS - Section: {targetBook.section}</p>
            ) : (
              <p className="hero-subtitle">Enter a book title to generate a spatial path to its shelf.</p>
            )}

            <form onSubmit={handleSearch} className="nav-search-box glass-card">
              <Search size={20} className="text-muted" />
              <input
                type="text"
                placeholder="Search book to navigate..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="execute-btn highlight">GENERATE PATH</button>
            </form>
          </section>

          <div className="nav-grid">
            {/* Map Visual */}
            <div className="map-section glass-card">
              <div className="map-header">
                <div className="legend">
                  <div className="legend-item"><span className="dot target" /> Target Shelf</div>
                  <div className="legend-item"><span className="dot other" /> Other Shelves</div>
                  <div className="legend-item"><span className="line path" /> Navigation Path</div>
                </div>
                {targetBook && (
                  <div className="target-badge highlight">
                    <MapPin size={14} /> Target: {targetBook.shelf}
                  </div>
                )}
              </div>

              <div className="blueprint-visual">
                <div className="shelves-row">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`shelf-block ${targetBook && i === 1 ? 'active' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {targetBook && i === 1 && (
                        <motion.div
                          className="pin-container"
                          initial={{ y: -20 }}
                          animate={{ y: 0 }}
                          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                        >
                          <MapPin color="#ff4d4d" fill="#ff4d4d" size={24} />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence>
                  {showPath && (
                    <svg className="path-overlay" width="100%" height="100%">
                      <motion.path
                        d="M 50 250 L 150 250 L 150 150 L 320 150"
                        fill="transparent"
                        stroke="#00f5ff"
                        strokeWidth="3"
                        strokeDasharray="10, 5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                      <motion.circle
                        cx="50" cy="250" r="6"
                        fill="#00f5ff"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    </svg>
                  )}
                </AnimatePresence>

                <div className="user-start">
                  <div className="start-icon">🚶</div>
                  <span>You are here</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="instructions-section glass-card">
              <h3 className="section-title"><MapIcon size={18} /> NAVIGATION INSTRUCTIONS</h3>
              <div className="steps-list">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    className={`step-item ${targetBook ? 'visible' : 'hidden'}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={targetBook ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="step-num">{i + 1}</div>
                    <div className="step-icon">{step.icon}</div>
                    <p className="step-text">{step.text}</p>
                  </motion.div>
                ))}
                {!targetBook && (
                  <div className="empty-instructions">
                    <Compass size={40} className="faint" />
                    <p>Enter a target to initialize guidance protocols.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NavigationPage;
