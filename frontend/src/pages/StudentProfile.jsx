import React, { useState } from "react";
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
  Mail,
  Shield,
  Award,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentProfile.css";

export default function StudentProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Profile");

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/student-dashboard" },
    { name: "Search Books", icon: <Search size={20} />, path: "/check-availability" },
    { name: "Research Portal", icon: <FileText size={20} />, path: "/research-portal" },
    { name: "Digital Resources", icon: <BookOpen size={20} />, path: "/mycourse" },
    { name: "Attendance", icon: <Calendar size={20} />, path: "#" },
    { name: "Navigation", icon: <NavIcon size={20} />, path: "#" },
    { name: "History", icon: <History size={20} />, path: "/borrowed-books" },
    { name: "Notifications", icon: <Bell size={20} />, path: "#" },
    { name: "Profile", icon: <User size={20} />, path: "/student-profile" },
    { name: "Settings", icon: <Settings size={20} />, path: "#" },
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
          <Plus size={18} /> Update Credentials
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
              <h3 className="font-mono">RESEARCHER PROFILE // BIOMETRIC DATA</h3>
            </div>
          </div>

          <div className="global-search-wrapper">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search profile logs..." />
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

        <div className="nexus-content profile-layout">
          <section className="welcome-section">
            <h1 className="welcome-text">Personal <span className="gradient-text">Identity</span></h1>
            <p className="system-status">Authentication: <span className="text-active">VERIFIED</span> | Security: <span className="text-active">LEVEL 4</span></p>
          </section>

          <div className="profile-grid">
            <motion.div 
              className="profile-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="avatar-section">
                <div className="avatar-glow" />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  alt="Profile"
                  className="profile-pic"
                />
              </div>

              <h2 className="profile-name">Jayapriya</h2>
              <p className="profile-role font-mono">Senior Researcher</p>

              <div className="profile-details-list">
                <div className="detail-item">
                  <Shield size={16} />
                  <span><b>ID:</b> 2303412555922014</span>
                </div>
                <div className="detail-item">
                  <Mail size={16} />
                  <span><b>Roll:</b> 4</span>
                </div>
                <div className="detail-item">
                  <Award size={16} />
                  <span><b>Dept:</b> MTEC CSE</span>
                </div>
              </div>

              <div className="performance-metrics">
                <div className="metric">
                  <span className="m-val">9.0</span>
                  <span className="m-lab">CGPA</span>
                </div>
                <div className="metric">
                  <span className="m-val">84%</span>
                  <span className="m-lab">Attendance</span>
                </div>
              </div>

              <div className="profile-actions">
                <button className="action-btn primary">SAVE CHANGES</button>
                <button className="action-btn secondary" onClick={() => navigate(-1)}>CLOSE CONSOLE</button>
              </div>
            </motion.div>

            <div className="profile-stats-column">
              <div className="nexus-side-card glass-card">
                <h3>Nexus Credentials</h3>
                <p>Security clearance granted for the **Quantum Linguistics** sector. All digital archives are accessible.</p>
              </div>
              <div className="nexus-side-card glass-card">
                <h3>Activity Heatmap</h3>
                <div className="mini-heatmap">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className={`h-dot ${i % 3 === 0 ? 'active' : ''}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
