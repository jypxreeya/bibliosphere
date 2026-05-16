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
  Zap,
  Clock,
  ChevronRight,
  TrendingUp,
  Moon,
  FileText,
  Compass,
  Database,
  Cpu,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentDashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

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

  const quickActions = [
    { name: "Search Archives", icon: <Search size={24} />, desc: "Locate physical & digital volumes", path: "/check-availability" },
    { name: "Research Hub", icon: <Cpu size={24} />, desc: "Access live academic papers", path: "/research-portal" },
    { name: "Path Guidance", icon: <Compass size={24} />, desc: "Navigate to exact shelf row", path: "/navigation" },
    { name: "Course Matrix", icon: <Database size={24} />, desc: "View subject recommendations", path: "/mycourse" },
  ];

  return (
    <div className="nexus-container">
      {/* Sidebar */}
      <aside className="nexus-sidebar">
        <div className="branding">
          <h2 className="brand-name">BIBLIOSPHERE</h2>
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
          <div className="console-title">
            <h3 className="font-mono">RESEARCHER CONSOLE // HUB-01</h3>
          </div>

          <div className="global-search-wrapper">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Omni-search metadata..." />
          </div>

          <div className="user-profile-pill">
            <div className="user-info">
              <span className="user-name">Jayapriya</span>
              <span className="user-dept">M.Tech CSE 3rd Yr</span>
            </div>
            <div className="user-avatar" />
          </div>
        </header>

        <div className="nexus-content">
          <section className="welcome-section">
            <motion.h1
              className="welcome-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Welcome <span className="gradient-text">Jayapriya.</span>
            </motion.h1>

            <div className="status-hud glass-card">
              <div className="hud-item">
                <span className="hud-label">System Status</span>
                <span className="hud-value text-active">OPTIMIZED</span>
              </div>
              <div className="hud-item">
                <span className="hud-label">Connection</span>
                <span className="hud-value text-active">SECURE</span>
              </div>
              <div className="hud-item">
                <span className="hud-label">Uptime</span>
                <span className="hud-value">99.9%</span>
              </div>
            </div>
          </section>

          <div className="dashboard-matrix">
            {quickActions.map((action, i) => (
              <motion.div
                key={i}
                className="action-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(action.path)}
              >
                <div className="action-icon-box">
                  {action.icon}
                </div>
                <div className="action-info">
                  <h3 className="action-name">{action.name}</h3>
                  <p className="action-desc">{action.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="analysis-row">
            <motion.div
              className="analytics-card glass-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="card-header">
                <h3><TrendingUp size={18} color="var(--color-primary)" /> Activity Intelligence</h3>
                <span className="font-mono text-muted">L-30 DAYS</span>
              </div>
              <div className="heatmap-container">
                <div className="heatmap-grid">
                  {[...Array(56)].map((_, i) => (
                    <div
                      key={i}
                      className={`heat-dot ${i % 7 === 0 ? 'high' : i % 3 === 0 ? 'mid' : i % 5 === 0 ? 'low' : ''}`}
                    />
                  ))}
                </div>
                <p className="heat-label mt-4">Node Activity Across Academic Sectors</p>
              </div>
            </motion.div>

            <div className="side-stack">
              <motion.div
                className="stat-pill-card glass-card"
                whileHover={{ scale: 1.02 }}
              >
                <div className="stat-circle">85%</div>
                <div className="stat-text">
                  <h4>85%</h4>
                  <span>Engagement Level</span>
                </div>
              </motion.div>

              <motion.div
                className="stat-pill-card glass-card"
                whileHover={{ scale: 1.02 }}
              >
                <div className="stat-circle" style={{ animationDelay: '0.5s' }}>128</div>
                <div className="stat-text">
                  <h4>128</h4>
                  <span>Research Hours</span>
                </div>
              </motion.div>


            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
