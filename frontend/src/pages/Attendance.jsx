import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Search, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Navigation as NavIcon, 
  History, 
  Bell, 
  User, 
  Settings,
  Plus,
  Moon,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  TrendingUp,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Attendance.css";

const Attendance = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Attendance");
  const [date, setDate] = useState(new Date());

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/student-dashboard" },
    { name: "Search Books", icon: <Search size={20} />, path: "/check-availability" },
    { name: "Research Portal", icon: <FileText size={20} />, path: "/research-portal" },
    { name: "Digital Resources", icon: <BookOpen size={20} />, path: "/mycourse" },
    { name: "Attendance", icon: <CalendarIcon size={20} />, path: "/attendance" },
    { name: "Navigation", icon: <NavIcon size={20} />, path: "/navigation" },
    { name: "History", icon: <History size={20} />, path: "/borrowed-books" },
    { name: "Notifications", icon: <Bell size={20} />, path: "#" },
    { name: "Profile", icon: <User size={20} />, path: "/student-profile" },
    { name: "Logout", icon: <LogOut size={20} />, path: "/", action: () => navigate("/") },
  ];

  const stats = [
    { label: "Total Visits", value: "48", icon: <CalendarIcon size={18} />, color: "var(--color-primary)" },
    { label: "Check-ins", value: "42", icon: <CheckCircle size={18} />, color: "#10b981" },
    { label: "Missed", value: "06", icon: <XCircle size={18} />, color: "#ef4444" },
    { label: "Engagement", value: "88%", icon: <TrendingUp size={18} />, color: "var(--color-secondary)" },
  ];

  const recentLogs = [
    { subject: "Library Period", status: "Present", time: "09:00 AM", date: "May 12, 2026" },
    { subject: "Library Period", status: "Present", time: "11:30 AM", date: "May 11, 2026" },
    { subject: "Library Period", status: "Absent", time: "02:00 PM", date: "May 09, 2026" },
    { subject: "Library Period", status: "Present", time: "10:00 AM", date: "May 08, 2026" },
    { subject: "Library Period", status: "Present", time: "04:00 PM", date: "May 07, 2026" },
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
              <h3 className="font-mono">ATTENDANCE MATRIX // CHRONO-LOGS</h3>
            </div>
          </div>

          <div className="global-search-wrapper">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Filter by subject or date..." />
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

        <div className="nexus-content">
          <section className="welcome-section">
            <h1 className="welcome-text">Attendance <span className="gradient-text">Analytics</span></h1>
            <p className="system-status">Current Status: <span className="text-active">OPTIMIZED</span> | Overall: <span className="text-active">88%</span></p>
          </section>

          <div className="attendance-layout">
            <div className="attendance-left">
              <div className="stats-grid">
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

              <div className="calendar-card glass-card">
                <div className="card-header">
                  <h3><CalendarIcon size={18} color="var(--color-primary)" /> Academic Calendar</h3>
                </div>
                <div className="calendar-wrapper">
                  <Calendar 
                    onChange={setDate} 
                    value={date} 
                    className="nexus-calendar"
                  />
                </div>
              </div>
            </div>

            <div className="attendance-right">
              <div className="logs-card glass-card">
                <div className="card-header">
                  <h3><Clock size={18} color="var(--color-secondary)" /> Recent Sessions</h3>
                  <button className="see-all">History</button>
                </div>
                <div className="logs-list">
                  {recentLogs.map((log, i) => (
                    <motion.div 
                      key={i} 
                      className="log-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="log-icon">
                        {log.status === "Present" ? (
                          <CheckCircle size={18} color="#10b981" />
                        ) : (
                          <XCircle size={18} color="#ef4444" />
                        )}
                      </div>
                      <div className="log-info">
                        <span className="log-subject">{log.subject}</span>
                        <span className="log-meta">{log.date} // {log.time}</span>
                      </div>
                      <div className={`log-status ${log.status.toLowerCase()}`}>
                        {log.status}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="nexus-side-card glass-card report-card">
                <h3>Generate Report</h3>
                <p>Export your monthly attendance analytics to a PDF document for official records.</p>
                <button className="download-btn">
                  DOWNLOAD PDF <FileText size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Attendance;
