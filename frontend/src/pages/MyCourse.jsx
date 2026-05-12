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
  Video,
  Database,
  ArrowRight,
  ArrowLeft,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/MyCourse.css";

const subjects = [
  "Web Technology",
  "Agile Methodology",
  "Computer Networks",
  "Theory of Computation",
  "JEE Framework",
  "Data Warehouse and Data Management",
];

const MyCourse = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Digital Resources");
  const [books, setBooks] = useState({});
  const [resources, setResources] = useState({});
  const [courseRecs, setCourseRecs] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const fetchData = async (subject) => {
    // 1. Fetch Archive Books (Local Backend)
    axios.get(`http://localhost:5000/api/books/search?query=${subject}&type=category`)
      .then(res => setBooks((prev) => ({ ...prev, [subject]: res.data })))
      .catch(() => setBooks((prev) => ({ ...prev, [subject]: [] })));

    // 2. Fetch Digital Resources (Local Backend)
    axios.get(`http://localhost:5000/api/resources?category=lecture`)
      .then(res => setResources((prev) => ({ ...prev, [subject]: res.data })))
      .catch(() => setResources((prev) => ({ ...prev, [subject]: [] })));

    // 3. Fetch Recommendations
    axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(subject)}&limit=2`)
      .then(res => {
        const recommendations = res.data.docs.slice(0, 2).map(doc => ({
          title: doc.title,
          author: doc.author_name ? doc.author_name[0] : "Unknown Author"
        }));
        if (recommendations.length > 0) {
          setCourseRecs((prev) => ({ ...prev, [subject]: recommendations }));
        } else {
          setCourseRecs((prev) => ({ ...prev, [subject]: [
            { title: `${subject} Foundations`, author: "Academic Press" },
            { title: `Introduction to ${subject}`, author: "Nexus Library" }
          ]}));
        }
      })
      .catch(err => {
        console.error(`Recommendation fetch failed for ${subject}:`, err);
        setCourseRecs((prev) => ({ ...prev, [subject]: [
          { title: `${subject} Essentials`, author: "Bibliosphere Curator" },
          { title: `${subject} Principles`, author: "Open Library" }
        ]}));
      });
  };

  useEffect(() => {
    subjects.forEach((sub) => fetchData(sub));
  }, []);

  return (
    <div className="nexus-container">
      {/* Detail Modal */}
      {isModalOpen && selectedSubject && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <motion.div 
            className="subject-detail-modal glass-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="gradient-text">{selectedSubject} // RESOURCES</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <div className="modal-body">
              <div className="resource-section">
                <h3 className="section-title"><Database size={18} /> PHYSICAL ARCHIVES</h3>
                <div className="resource-list">
                  {books[selectedSubject] && books[selectedSubject].length > 0 ? (
                    books[selectedSubject].map((b, idx) => (
                      <div key={idx} className="resource-item glass-card">
                        <span className="item-title">{b.title}</span>
                        <span className="item-meta">Location: Sect-{b.shelfLocation} // Row-{b.rowNumber}</span>
                      </div>
                    ))
                  ) : (
                    <p className="empty-text">No local volumes found for this subject.</p>
                  )}
                </div>
              </div>

              <div className="resource-section">
                <h3 className="section-title"><Video size={18} /> VIRTUAL STREAMS</h3>
                <div className="resource-list">
                  {resources[selectedSubject] && resources[selectedSubject].length > 0 ? (
                    resources[selectedSubject].map((r, idx) => (
                      <a key={idx} href={r.url} target="_blank" rel="noreferrer" className="resource-item glass-card link-item">
                        <span className="item-title">{r.title}</span>
                        <ArrowRight size={14} className="link-arrow" />
                      </a>
                    ))
                  ) : (
                    <p className="empty-text">No digital lectures available at this time.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

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
              <h3 className="font-mono">RESOURCE HUB // COURSE MATRIX</h3>
            </div>
          </div>

          <div className="global-search-wrapper">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Filter subjects..." />
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
            <h1 className="welcome-text">Course <span className="gradient-text">Recommendations</span></h1>
            <p className="system-status">Target Subjects: <span className="text-active">06</span> | Database: <span className="text-active">SYNCHRONIZED</span></p>
          </section>

          <div className="course-grid">
            {subjects.map((subject, i) => (
              <motion.div
                key={i}
                className="course-card glass-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="course-card-header">
                  <div className="subject-icon-box">
                    <Database size={20} />
                  </div>
                  <h2 className="subject-name">{subject}</h2>
                </div>
                
                <div className="content-section">
                  <div className="content-group">
                    <h3 className="section-subtitle">RECOMMENDED READING</h3>
                    <div className="item-list">
                      {courseRecs[subject] ? (
                        courseRecs[subject].map((rec, idx) => (
                          <div key={idx} className="recommendation-pill">
                            <Star size={14} className="star-icon" />
                            <div className="rec-info">
                              <span className="rec-title">{rec.title}</span>
                              <span className="rec-author">by {rec.author}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="no-data-text">Mapping relevant titles...</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button 
                    className="view-more-btn"
                    onClick={() => {
                      setSelectedSubject(subject);
                      setIsModalOpen(true);
                    }}
                  >
                    ACCESS RESOURCES <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyCourse;
