import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  Download, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  ChevronRight, 
  Clock, 
  TrendingUp, 
  Filter,
  Maximize2,
  X,
  FileText,
  Star,
  Users,
  LayoutDashboard,
  Calendar,
  Navigation as NavIcon,
  History,
  Bell,
  User,
  Settings,
  Plus,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/ResearchPortal.css";

const domains = ["AI/ML", "Cloud Computing", "Blockchain", "Cybersecurity", "Data Science"];

const ResearchPortal = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("");
  const [filter, setFilter] = useState("relevant");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

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

  useEffect(() => {
    fetchRecommendations();
    const savedBookmarks = localStorage.getItem("paperBookmarks");
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    
    const savedHistory = localStorage.getItem("paperHistory");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/research/recommendations");
      setRecommendations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/research/search?query=${encodeURIComponent(query)}&domain=${domain}&filter=${filter}`);
      setPapers(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleRead = (paper) => {
    setSelectedPaper(paper);
    const newHistory = [paper, ...history.filter(p => p.id !== paper.id)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("paperHistory", JSON.stringify(newHistory));
  };

  const toggleBookmark = (paper) => {
    let newBookmarks;
    if (bookmarks.find(p => p.id === paper.id)) {
      newBookmarks = bookmarks.filter(p => p.id !== paper.id);
    } else {
      newBookmarks = [paper, ...bookmarks];
    }
    setBookmarks(newBookmarks);
    localStorage.setItem("paperBookmarks", JSON.stringify(newBookmarks));
  };

  const copyCitation = (paper) => {
    const citation = `${paper.authors.join(", ")} (${paper.year}). ${paper.title}. Source: ${paper.source}.`;
    navigator.clipboard.writeText(citation);
    alert("Citation copied to clipboard!");
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
              className={`nav-item ${item.path === "/research-portal" ? 'active' : ''}`}
              onClick={() => item.path !== "#" && navigate(item.path)}
            >
              {item.icon}
              <span className="nav-label">{item.name}</span>
            </div>
          ))}
        </nav>
        <button className="session-btn"><Plus size={18} /> New Research Project</button>
      </aside>

      {/* Main Portal */}
      <main className="nexus-main">
        <header className="nexus-header">
          <div className="header-left-group">
            <button className="back-btn glass-card" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
            <div className="console-title">
              <h3 className="font-mono">RESEARCH PORTAL // OMNI-SEARCH</h3>
            </div>
          </div>
          <div className="user-profile-pill glass-card">
            <Bell size={20} className="text-muted" />
            <div className="divider" />
            <div className="user-info">
              <span className="user-name">Dr. Aris Thorne</span>
              <span className="user-dept">Quantum Linguistics Dept.</span>
            </div>
            <div className="user-avatar" />
          </div>
        </header>

        <div className="nexus-content">
          {/* Hero Search Section */}
          <section className="research-hero glass-card">
            <h1 className="hero-title">Omni-Academic <span className="gradient-text">Search Engine</span></h1>
            <p className="hero-subtitle">Access millions of live research papers from arXiv and Semantic Scholar.</p>
            
            <form onSubmit={handleSearch} className="search-box-wrapper">
              <div className="main-search glass-card">
                <Search className="search-icon" size={22} />
                <input 
                  type="text" 
                  placeholder="Enter topic, author, or keyword (e.g. Deep Learning in Healthcare)..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="execute-btn highlight">SEARCH ARCHIVES</button>
              </div>
              
              <div className="search-filters">
                <select className="glass-card" value={domain} onChange={(e) => setDomain(e.target.value)}>
                  <option value="">All Domains</option>
                  {domains.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select className="glass-card" value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="relevant">Most Relevant</option>
                  <option value="latest">Latest Papers</option>
                </select>
              </div>
            </form>
          </section>

          <div className="research-layout-grid">
            {/* Results Section */}
            <section className="results-area">
              <div className="area-header">
                <h2 className="section-subtitle"><Clock size={16} /> SEARCH RESULTS</h2>
                {loading && <div className="loading-spinner" />}
              </div>

              <div className="papers-grid">
                <AnimatePresence>
                  {papers.map((paper, i) => (
                    <motion.div 
                      key={paper.id} 
                      className="paper-card glass-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="paper-header">
                        <span className="source-tag">{paper.source}</span>
                        <span className="year-tag">{paper.year}</span>
                      </div>
                      <h3 className="paper-title">{paper.title}</h3>
                      <p className="paper-authors"><Users size={14} /> {paper.authors.join(", ")}</p>
                      <p className="paper-abstract">{paper.abstract.substring(0, 180)}...</p>
                      
                      <div className="paper-footer">
                        <div className="citation-count">
                          <TrendingUp size={14} /> {paper.citations} Citations
                        </div>
                        <div className="action-btns">
                          <button className="icon-btn" onClick={() => toggleBookmark(paper)}>
                            <Bookmark size={18} fill={bookmarks.find(p => p.id === paper.id) ? "#00f5ff" : "none"} />
                          </button>
                          <button className="icon-btn" onClick={() => copyCitation(paper)}>
                            <Share2 size={18} />
                          </button>
                          <button className="read-btn" onClick={() => handleRead(paper)}>READ PAPER</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {!loading && papers.length === 0 && (
                  <div className="empty-state glass-card">
                    <FileText size={40} />
                    <p>No papers loaded. Execute a query to explore the academic nexus.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Sidebar Stats & Recs */}
            <aside className="stats-area">
              <div className="side-card glass-card">
                <h3><Star size={18} /> TRENDING TOPICS</h3>
                <div className="topic-tags">
                  {domains.map(d => <span key={d} className="tag" onClick={() => {setQuery(d); handleSearch();}}>{d}</span>)}
                </div>
              </div>

              <div className="side-card glass-card">
                <h3><TrendingUp size={18} /> RECOMMENDED</h3>
                <div className="rec-list">
                  {recommendations.map(rec => (
                    <div key={rec.id} className="rec-item">
                      <p className="rec-title">{rec.title}</p>
                      <span className="rec-topic">{rec.topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="side-card glass-card">
                <h3><Clock size={18} /> RECENTLY VIEWED</h3>
                <div className="history-list">
                  {history.map(h => (
                    <div key={h.id} className="history-item" onClick={() => handleRead(h)}>
                      <p className="history-title">{h.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Fullscreen PDF Viewer Overlay */}
      {selectedPaper && (
        <div className="pdf-viewer-overlay">
          <div className="viewer-container glass-card">
            <header className="viewer-header">
              <div className="v-info">
                <h2>{selectedPaper.title}</h2>
                <p>{selectedPaper.authors.join(", ")}</p>
              </div>
              <div className="v-actions">
                <button className="v-btn" onClick={() => window.open(selectedPaper.pdfUrl, '_blank')}><Download size={18} /> DOWNLOAD</button>
                <button className="close-btn" onClick={() => setSelectedPaper(null)}><X size={24} /></button>
              </div>
            </header>
            <div className="viewer-body">
              {selectedPaper.pdfUrl ? (
                <iframe 
                  src={`${selectedPaper.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                  width="100%" 
                  height="100%" 
                  title="PDF Viewer"
                />
              ) : (
                <div className="no-pdf-view">
                  <FileText size={60} />
                  <h2>Live PDF Preview Restricted</h2>
                  <p>This source doesn't allow direct embedding. Access via primary archive.</p>
                  <button className="highlight" onClick={() => window.open(selectedPaper.url, '_blank')}>
                    OPEN IN EXTERNAL CONSOLE <ExternalLink size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchPortal;
