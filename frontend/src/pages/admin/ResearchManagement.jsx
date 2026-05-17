import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Search,
  Filter,
  Plus,
  BookOpen,
  FileText,
  Users,
  TrendingUp,
  Globe,
  PlusCircle,
  X,
  Award,
  Download,
  Eye,
  Calendar,
  Sparkles,
  UploadCloud,
  CheckCircle,
  Loader2,
  AlertCircle
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";
import "../../styles/AdminDashboard.css";
import AdminSidebar from "../../components/AdminSidebar";

const ResearchManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPaperForReaders, setSelectedPaperForReaders] = useState(null);
  
  // File Uploading States
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // New paper form state
  const [newPaper, setNewPaper] = useState({
    title: "",
    authors: "",
    domain: "AI/ML",
    year: new Date().getFullYear(),
    source: "",
    citations: 0,
    abstract: ""
  });

  // State with pre-seeded research papers and the students who researched them
  const [papers, setPapers] = useState([
    {
      id: "RP-101",
      title: "Quantum Cryptography and Secure Library Logs",
      authors: ["Dr. Thorne", "Prof. Kevin"],
      domain: "Cybersecurity",
      year: 2026,
      source: "IEEE Access",
      citations: 45,
      abstract: "This paper presents a novel model for securing smart city networks and localized digital archives utilizing quantum cryptography protocols.",
      pdfAttached: "quantum_cryptography_secured.pdf",
      researchers: [
        { id: "S-501", name: "Jayapriya", dept: "M.Tech CSE", action: "Downloaded PDF", date: "May 15, 2026" },
        { id: "S-504", name: "Kevin Vasan", dept: "B.Tech CSE", action: "Viewed Abstract", date: "May 16, 2026" }
      ]
    },
    {
      id: "RP-102",
      title: "Deep Learning Architectures for Academic Recommendation Systems",
      authors: ["Dr. Smith", "Jayapriya"],
      domain: "AI/ML",
      year: 2025,
      source: "ACM Publications",
      citations: 112,
      abstract: "Exploring transformer models and collaborative filtering techniques to predict academic book borrowings in enterprise university libraries.",
      pdfAttached: "deep_learning_rec_systems.pdf",
      researchers: [
        { id: "S-502", name: "Rahul Sharma", dept: "B.Tech IT", action: "Downloaded PDF", date: "May 14, 2026" },
        { id: "S-501", name: "Jayapriya", dept: "M.Tech CSE", action: "Downloaded PDF", date: "May 13, 2026" },
        { id: "S-506", name: "Meera Nair", dept: "M.Sc Chemistry", action: "Viewed Abstract", date: "May 17, 2026" }
      ]
    },
    {
      id: "RP-103",
      title: "Blockchain Integration in RFID Smart-Storage Systems",
      authors: ["Prof. Johnson", "Anita Roy"],
      domain: "Blockchain",
      year: 2024,
      source: "arXiv Archive",
      citations: 28,
      abstract: "A comprehensive analysis of distributed ledger systems to automate inventory sync in multi-campus academic libraries.",
      pdfAttached: "blockchain_rfid_integration.pdf",
      researchers: [
        { id: "S-503", name: "Anita Roy", dept: "M.Sc Physics", action: "Viewed Abstract", date: "May 12, 2026" },
        { id: "S-505", name: "Suresh Kumar", dept: "B.Tech ECE", action: "Downloaded PDF", date: "May 16, 2026" }
      ]
    }
  ]);

  // Handle Drag Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processPDFUpload(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processPDFUpload(file);
    }
  };

  // Simulates AI Parsing of PDF File
  const processPDFUpload = (file) => {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      alert("⚠️ Only peer-reviewed PDF files are supported.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadedFile(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadedFile(file);
          
          // AI OCR Autocomplete metadata from filename
          const prettyTitle = file.name
            .replace(/\.[^/.]+$/, "") // Remove extension
            .replace(/[-_]/g, " ")    // Replace separators
            .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize
            
          setNewPaper({
            title: prettyTitle,
            authors: "Dr. Alistair, Prof. Vance",
            domain: file.name.toLowerCase().includes("chain") ? "Blockchain" : "AI/ML",
            year: 2026,
            source: "Bibliosphere Digital Repository",
            citations: Math.floor(Math.random() * 15 + 5),
            abstract: `Abstract extracted from "${file.name}" via Bibliosphere OCR v4.0. This paper presents custom research frameworks, exploring novel engineering methodologies in specialized computational disciplines.`
          });
        }, 400);
      }
    }, 150);
  };

  // Handle addition of new research paper
  const handleAddPaper = (e) => {
    e.preventDefault();
    const formattedAuthors = newPaper.authors.split(",").map(a => a.trim());
    const paperToAdd = {
      id: `RP-${Math.floor(Math.random() * 1000 + 104)}`,
      title: newPaper.title,
      authors: formattedAuthors,
      domain: newPaper.domain,
      year: Number(newPaper.year),
      source: newPaper.source || "Academic Repository",
      citations: Number(newPaper.citations) || 0,
      abstract: newPaper.abstract || "No abstract details provided.",
      pdfAttached: uploadedFile ? uploadedFile.name : "manuscript_draft.pdf",
      researchers: [] // Initially empty as it is newly added
    };

    setPapers([paperToAdd, ...papers]);
    setShowAddModal(false);
    resetForm();
    alert("Research paper and PDF volume published to the digital archives successfully!");
  };

  const resetForm = () => {
    setNewPaper({
      title: "",
      authors: "",
      domain: "AI/ML",
      year: new Date().getFullYear(),
      source: "",
      citations: 0,
      abstract: ""
    });
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const triggerPDFUploadButton = () => {
    setShowAddModal(true);
    // Give modal a brief frame to mount, then click input
    setTimeout(() => {
      document.getElementById("pdf-upload-input")?.click();
    }, 200);
  };

  // Filter papers based on search queries
  const filteredPapers = papers.filter((paper) => {
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.some(auth => auth.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Calculate statistics
  const totalPapers = papers.length;
  const totalCitations = papers.reduce((acc, curr) => acc + curr.citations, 0);
  const totalUniqueResearchers = new Set(
    papers.flatMap(p => p.researchers.map(r => r.id))
  ).size;

  // Chart data
  const chartData = papers.map(p => ({
    name: p.title.length > 25 ? p.title.substring(0, 22) + "..." : p.title,
    citations: p.citations,
    readers: p.researchers.length
  }));

  return (
    <div className="admin-container">
      <AdminSidebar />

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="back-btn glass-card" onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem', borderRadius: '10px', cursor: 'pointer' }}>
                <ArrowLeft size={18} />
            </button>
            <div className="admin-title">
                <h1 className="gradient-text">RESEARCH PAPERS CONTROL</h1>
                <p>Upload peer-reviewed publications and track active student researchers</p>
            </div>
          </div>

          <div className="quick-actions-bar">
            <button className="admin-btn primary" onClick={() => setShowAddModal(true)}>
              <Plus size={18} /> PUBLISH NEW PAPER
            </button>
          </div>
        </header>

        {/* Analytics Section */}
        <div className="admin-stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Published Papers</span>
              <FileText size={18} color="var(--admin-accent)" />
            </div>
            <div className="stat-value">{totalPapers}</div>
            <div className="stat-trend up">Academic Catalog</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Active Student Researchers</span>
              <Users size={18} color="var(--admin-secondary)" />
            </div>
            <div className="stat-value">{totalUniqueResearchers}</div>
            <div className="stat-trend up">Active Read Sessions</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Accumulated Citations</span>
              <Award size={18} color="#00ff88" />
            </div>
            <div className="stat-value">{totalCitations}</div>
            <div className="stat-trend up" style={{ color: '#00ff88' }}>Global Impact Score</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Primary Domains</span>
              <Globe size={18} color="#fb5607" />
            </div>
            <div className="stat-value">{new Set(papers.map(p => p.domain)).size}</div>
            <div className="stat-trend up" style={{ color: '#fb5607' }}>Multidisciplinary</div>
          </div>
        </div>

        {/* Charts & Interactive Section */}
        <div className="admin-charts-grid" style={{ marginBottom: '2rem' }}>
          <div className="chart-container" style={{ gridColumn: 'span 2' }}>
            <div className="chart-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--admin-accent)" />
                <h3 style={{ margin: 0 }}>Citations & Student Engagement Distribution</h3>
              </div>
            </div>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '0.8rem' }} />
                  <YAxis stroke="rgba(255,255,255,0.4)" style={{ fontSize: '0.8rem' }} />
                  <Tooltip 
                    contentStyle={{ background: '#030e1b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--admin-accent)' }}
                    labelStyle={{ color: '#fff', fontWeight: 700 }}
                  />
                  <Bar dataKey="citations" fill="url(#colorCitations)" name="Citations" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="readers" fill="url(#colorReaders)" name="Student Readers" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="colorCitations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--admin-accent)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--admin-accent)" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorReaders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--admin-secondary)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--admin-secondary)" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Directory Controls */}
        <div className="admin-table-controls" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div className="global-search-wrapper" style={{ width: '400px' }}>
            <Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search by publication title, author, or domain..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <button className="admin-btn">
            <Filter size={18} /> FILTER BY DOMAIN
          </button>
        </div>

        {/* Publications Grid */}
        <div className="chart-container" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem' }}>
          <div className="chart-header" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Publications Catalogue</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>ID</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', width: '35%' }}>Title</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Authors</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Domain</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Citations</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Active Readers</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPapers.length > 0 ? (
                filteredPapers.map((paper, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="table-row-hover">
                    <td style={{ padding: '1.2rem 1.5rem', fontWeight: 600, color: 'var(--admin-accent)' }}>{paper.id}</td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{paper.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>Source: {paper.source} ({paper.year})</span>
                        {paper.pdfAttached && (
                          <span style={{ color: 'var(--admin-accent)', background: 'rgba(0, 245, 255, 0.08)', padding: '1px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>
                            📁 {paper.pdfAttached}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                      {paper.authors.join(", ")}
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span style={{ 
                        background: 'rgba(0, 245, 255, 0.08)', 
                        color: 'var(--admin-accent)', 
                        padding: '0.3rem 0.8rem', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700 
                      }}>{paper.domain}</span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, color: '#00ff88' }}>
                      {paper.citations}
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, textAlign: 'center' }}>
                      {paper.researchers.length}
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <button 
                        className="admin-btn" 
                        onClick={() => setSelectedPaperForReaders(paper)}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                      >
                        <Users size={14} style={{ marginRight: '4px' }} /> View Readers
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
                    No research publications match the active criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Sidebar Slide-Over Reader Panel */}
        {selectedPaperForReaders && (
          <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'flex-end', zIndex: 1000 }}>
            <div className="research-modal-content chart-container" style={{ width: '480px', height: '100vh', borderRadius: 0, padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="font-mono" style={{ color: 'var(--admin-accent)', fontSize: '0.75rem', fontWeight: 700 }}>STUDENT ENGAGEMENT PORTAL</span>
                  <h2 className="gradient-text" style={{ fontSize: '1.5rem', marginTop: '5px', marginBottom: 0 }}>Active Researchers</h2>
                </div>
                <button style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer' }} onClick={() => setSelectedPaperForReaders(null)}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '0.95rem' }}>{selectedPaperForReaders.title}</h4>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Authors: {selectedPaperForReaders.authors.join(", ")}</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} color="var(--admin-accent)" /> 
                  Reading History Matrix ({selectedPaperForReaders.researchers.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedPaperForReaders.researchers.length > 0 ? (
                    selectedPaperForReaders.researchers.map((res, i) => (
                      <div key={i} style={{
                        background: 'rgba(255,255,255,0.01)',
                        border: '1px solid rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{res.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{res.id} // {res.dept}</div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ 
                            background: res.action === 'Downloaded PDF' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(0, 245, 255, 0.1)',
                            color: res.action === 'Downloaded PDF' ? '#00ff88' : '#00f5ff',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '20px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {res.action === 'Downloaded PDF' ? <Download size={10} /> : <Eye size={10} />}
                            {res.action}
                          </span>
                          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{res.date}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.2)' }}>
                      <Eye size={36} style={{ display: 'block', margin: '0 auto 10px', opacity: 0.3 }} />
                      No students have read or researched this paper yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ULTRA-PREMIUM DUAL-PANEL PUBLISH MODAL */}
        {showAddModal && (
          <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 12, 0.85)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="research-modal-content chart-container" style={{ width: '820px', padding: '2.5rem', position: 'relative', border: '1px solid rgba(0, 245, 255, 0.25)', boxShadow: '0 0 40px rgba(0, 245, 255, 0.15)', borderRadius: '20px', background: 'radial-gradient(circle at top left, #05162a 0%, #030c17 100%)' }}>
              <button 
                style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }} 
                onClick={() => { setShowAddModal(false); resetForm(); }}
                onMouseEnter={(e) => e.target.style.color = '#ff4d4d'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
              >
                <X size={24} />
              </button>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <span className="font-mono" style={{ color: 'var(--admin-accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', display: 'block' }}>PUBLISHING SYSTEMS v4.0</span>
                <h2 className="gradient-text" style={{ fontSize: '1.8rem', margin: '4px 0 0 0' }}>Publish Research Volume</h2>
              </div>
              
              <form onSubmit={handleAddPaper} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div style={{ display: 'flex', gap: '2rem' }}>
                  
                  {/* Left Column: Metadata Inputs */}
                  <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Publication Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Deep Neural Networks for Quantum Simulation" 
                        required 
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s' }}
                        value={newPaper.title}
                        onChange={(e) => setNewPaper({...newPaper, title: e.target.value})}
                        onFocus={(e) => e.target.style.borderColor = 'var(--admin-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Authors (comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Dr. Robert, Prof. Anita" 
                        required 
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s' }}
                        value={newPaper.authors}
                        onChange={(e) => setNewPaper({...newPaper, authors: e.target.value})}
                        onFocus={(e) => e.target.style.borderColor = 'var(--admin-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Academic Domain</label>
                        <select 
                          style={{ background: 'rgba(3, 14, 27, 0.98)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                          value={newPaper.domain}
                          onChange={(e) => setNewPaper({...newPaper, domain: e.target.value})}
                        >
                          <option value="AI/ML">AI/ML</option>
                          <option value="Cloud Computing">Cloud Computing</option>
                          <option value="Blockchain">Blockchain</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Data Science">Data Science</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Year</label>
                        <input 
                          type="number" 
                          min="2000" 
                          max="2030" 
                          required 
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                          value={newPaper.year}
                          onChange={(e) => setNewPaper({...newPaper, year: e.target.value})}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Publish Source</label>
                        <input 
                          type="text" 
                          placeholder="e.g. IEEE Transactions" 
                          required
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                          value={newPaper.source}
                          onChange={(e) => setNewPaper({...newPaper, source: e.target.value})}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Pre-seeded Citations</label>
                        <input 
                          type="number" 
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                          value={newPaper.citations}
                          onChange={(e) => setNewPaper({...newPaper, citations: e.target.value})}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Right Column: PDF Digital Asset & Abstract Upload Zone */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Digital Volume (PDF Upload)</label>
                      
                      {/* Hidden Input */}
                      <input 
                        type="file" 
                        accept=".pdf" 
                        id="pdf-upload-input" 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange} 
                      />

                      {/* Interactive Drag Zone */}
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("pdf-upload-input")?.click()}
                        style={{
                          height: '140px',
                          border: isDragging ? '2px dashed var(--admin-accent)' : '2px dashed rgba(255, 255, 255, 0.1)',
                          background: isDragging ? 'rgba(0, 245, 255, 0.05)' : 'rgba(255,255,255,0.01)',
                          borderRadius: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          gap: '8px',
                          padding: '1rem',
                          textAlign: 'center',
                          transition: 'all 0.2s',
                          boxShadow: isDragging ? '0 0 15px rgba(0, 245, 255, 0.1)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (!isDragging) e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isDragging) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      >
                        {isUploading ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <Loader2 className="animate-spin" size={32} color="var(--admin-accent)" />
                            <div>
                              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--admin-accent)' }}>Extracting Metadata... {uploadProgress}%</span>
                              <div style={{ width: '120px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                                <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--admin-accent)', transition: 'width 0.1s' }} />
                              </div>
                            </div>
                          </div>
                        ) : uploadedFile ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle size={32} color="#00ff88" />
                            <div>
                              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', wordBreak: 'break-all', maxWidth: '220px' }}>{uploadedFile.name}</div>
                              <div style={{ fontSize: '0.7rem', color: 'rgba(0, 255, 136, 0.8)' }}>AI Parsing Done (Autofilled!)</div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <UploadCloud size={32} className="text-muted" style={{ color: 'rgba(255,255,255,0.3)' }} />
                            <div>
                              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', display: 'block' }}>Drag & Drop PDF</span>
                              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginTop: '2px' }}>or click to browse local files</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Abstract / Summary</label>
                      <textarea 
                        rows="4" 
                        placeholder="Enter abstract summary..." 
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', resize: 'none', fontFamily: 'inherit', fontSize: '0.85rem', outline: 'none' }}
                        value={newPaper.abstract}
                        onChange={(e) => setNewPaper({...newPaper, abstract: e.target.value})}
                        onFocus={(e) => e.target.style.borderColor = 'var(--admin-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>

                  </div>

                </div>

                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                  <button type="button" className="admin-btn" onClick={() => { setShowAddModal(false); resetForm(); }} style={{ flex: 1, padding: '0.8rem' }}>CANCEL</button>
                  <button type="submit" className="admin-btn primary" style={{ flex: 1, padding: '0.8rem' }}>SAVE & PUBLISH VOLUME</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .table-row-hover:hover {
            background: rgba(255,255,255,0.01);
        }
        
        .animate-spin {
          animation: spin-kf 1s linear infinite;
        }

        @keyframes spin-kf {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default ResearchManagement;
