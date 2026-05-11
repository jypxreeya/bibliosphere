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
  Moon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentDashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/student-dashboard" },
    { name: "Search Books", icon: <Search size={20} />, path: "/check-availability" },
    { name: "Recommendations", icon: <Star size={20} />, path: "#" },
    { name: "Digital Resources", icon: <BookOpen size={20} />, path: "/mycourse" },
    { name: "Attendance", icon: <Calendar size={20} />, path: "#" },
    { name: "Navigation", icon: <NavIcon size={20} />, path: "#" },
    { name: "History", icon: <History size={20} />, path: "/borrowed-books" },
    { name: "Notifications", icon: <Bell size={20} />, path: "#" },
    { name: "Profile", icon: <User size={20} />, path: "/student-profile" },
    { name: "Settings", icon: <Settings size={20} />, path: "#" },
  ];

  const stats = [
    { label: "Active Borrowings", value: "04", icon: <BookOpen size={18} />, color: "var(--color-primary)" },
    { label: "Smart Credits", value: "840", icon: <Star size={18} />, color: "var(--color-secondary)" },
    { label: "Research Hours", value: "128", icon: <Clock size={18} />, color: "#54d2d2" },
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
          <Plus size={18} /> New Research Session
        </button>
      </aside>

      {/* Main Content */}
      <main className="nexus-main">
        <header className="nexus-header">
          <div className="console-title">
            <h3 className="font-mono">RESEARCHER CONSOLE</h3>
          </div>

          <div className="global-search-wrapper">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Omni-search metadata..." />
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
            <h1 className="welcome-text">Welcome back, <span className="gradient-text">Researcher</span></h1>
            <p className="system-status">System status: <span className="text-active">OPTIMIZED</span> | Connection: <span className="text-active">SECURE</span></p>
          </section>

          <div className="dashboard-grid-layout">
            <div className="left-column">
              <div className="stats-row">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="nexus-stat-card glass-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="stat-icon-wrapper" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div className="stat-data">
                      <span className="stat-val font-mono">{stat.value}</span>
                      <span className="stat-lab">{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="nexus-main-card glass-card">
                <div className="card-header">
                  <h3><Zap size={18} color="var(--color-secondary)" /> Recommended Archives</h3>
                  <button className="see-all">See All <ChevronRight size={16} /></button>
                </div>
                <div className="recommendation-list">
                  <div className="rec-row">
                    <div className="rec-info">
                      <span className="rec-title">Neural Synapse Mapping</span>
                      <span className="rec-meta">Prof. Kaelen Stark • 2023 • Digital Copy</span>
                    </div>
                    <button className="access-btn">ACCESS</button>
                  </div>
                  <div className="rec-row">
                    <div className="rec-info">
                      <span className="rec-title">Quantum Fabric Theory</span>
                      <span className="rec-meta">Dr. S. Chen • 2024 • Physical Book</span>
                    </div>
                    <button className="access-btn">RESERVE</button>
                  </div>
                  <div className="rec-row">
                    <div className="rec-info">
                      <span className="rec-title">Linguistic Patterns in AI</span>
                      <span className="rec-meta">Aris Thorne • 2025 • Research Paper</span>
                    </div>
                    <button className="access-btn">VIEW</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="right-column">
              <div className="nexus-side-card glass-card">
                <div className="card-header">
                  <h3><TrendingUp size={18} color="var(--color-primary)" /> Intelligence Analytics</h3>
                </div>
                <div className="heatmap-box">
                  <div className="heatmap-grid">
                    {[...Array(35)].map((_, i) => (
                      <div key={i} className={`heat-dot ${Math.random() > 0.7 ? 'active' : ''}`} />
                    ))}
                  </div>
                  <p className="heat-label">Nexus Activity Levels (Last 30 Days)</p>
                </div>
              </div>

              <div className="nexus-side-card glass-card newsletter">
                <h3>Library Broadcast</h3>
                <p>New arrivals in the **Theoretical Physics** sector. Digital copies now available for all students.</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '65%' }} />
                </div>
                <span className="progress-text">Storage Capacity: 65%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
