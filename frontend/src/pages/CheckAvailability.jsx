import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Search, 
  MapPin, 
  BookOpen, 
  Filter, 
  ChevronRight, 
  Maximize2,
  Navigation,
  Bookmark,
  Bell
} from "lucide-react";
import "../styles/CheckAvailability.css";

const CheckAvailability = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setBooks([]); // Clear previous results
    
    try {
      // 1. Search Open Library API
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`
      );
      
      const openLibraryBooks = res.data.docs.slice(0, 12).map((doc, index) => ({
        id: doc.key,
        title: doc.title,
        author: doc.author_name ? doc.author_name[0] : "Unknown Author",
        available: Math.random() > 0.3, // Mock availability
        shelfLocation: `Sect-${Math.floor(Math.random() * 9) + 1}`,
        rowNumber: String.fromCharCode(65 + Math.floor(Math.random() * 6)), // Row A-F
        cover_i: doc.cover_i,
        publish_year: doc.first_publish_year || "N/A",
        subject: doc.subject ? doc.subject.slice(0, 5).join(", ") : "General",
        pages: doc.number_of_pages_median || "N/A",
        isbn: doc.isbn ? doc.isbn[0] : "N/A"
      }));

      setBooks(openLibraryBooks);
    } catch (err) {
      console.error("❌ Error fetching books from OpenLibrary:", err);
      alert("Failed to fetch books from Open Library. Please check your connection.");
    }
    setLoading(false);
  };

  return (
    <div className="search-page-container">
      {/* Modal for Book Details */}
      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <motion.div 
            className="book-modal glass-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal" onClick={() => setSelectedBook(null)}>&times;</button>
            <div className="modal-content">
              <div className="modal-visual">
                {selectedBook.cover_i ? (
                  <img src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`} alt={selectedBook.title} />
                ) : (
                  <div className="neon-orb" />
                )}
              </div>
              <div className="modal-info">
                <div className="modal-header-row">
                  <h2 className="gradient-text">{selectedBook.title}</h2>
                  <div className={`status-pill ${selectedBook.available ? 'available' : 'checked-out'}`}>
                    {selectedBook.available ? 'AVAILABLE' : 'CHECKED OUT'}
                  </div>
                </div>
                <p className="modal-author">By {selectedBook.author}</p>
                
                {!selectedBook.available && (
                  <button className="remind-btn glass-card" onClick={async () => {
                    try {
                      const userEmail = prompt("Enter your email for the reminder:", "jayapriyakalidas@gmail.com");
                      if (!userEmail) return;
                      
                      await axios.post("http://127.0.0.1:5000/api/books/remind", {
                        email: userEmail,
                        bookTitle: selectedBook.title
                      });
                      alert("Reminder set! A confirmation email has been sent to " + userEmail);
                    } catch (err) {
                      console.error("Reminder error:", err);
                      const errorMsg = err.response?.data?.message || err.message;
                      alert("Reminder System Error: " + errorMsg + "\n\nPlease ensure your backend is running on port 5000.");
                    }
                  }}>
                    <Bell size={16} /> Remind Me when Available
                  </button>
                )}

                <div className="modal-stats">
                  <div className="m-stat"><span>PUBLISHED</span><strong>{selectedBook.publish_year}</strong></div>
                  <div className="m-stat"><span>PAGES</span><strong>{selectedBook.pages}</strong></div>
                  <div className="m-stat"><span>ISBN</span><strong>{selectedBook.isbn}</strong></div>
                </div>
                <div className="modal-about">
                  <h3>ABOUT THE BOOK</h3>
                  <p>Subjects: {selectedBook.subject}</p>
                  <p>This work is part of the global academic archives. Use the physical location below to find it in our library sectors or access the digital version if available.</p>
                </div>
                <div className="modal-location">
                  <div className="loc-box">
                    <span>SHELF LOCATION</span>
                    <strong>{selectedBook.shelfLocation} // {selectedBook.rowNumber}</strong>
                  </div>
                  <button className="navigate-btn">NAVIGATE TO SHELF</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <header className="search-header">
        <h1 className="gradient-text font-mono">BIBLIOSPHERE ARCHIVES</h1>
        <div className="user-nav">
          <button className="glass-card nav-btn">Researcher Console</button>
        </div>
      </header>

      <div className="search-layout">
        {/* Main Search Area */}
        <div className="main-search-section">
          <div className="search-console glass-card">
            <span className="console-label font-mono">CENTRAL INTELLIGENCE SEARCH</span>
            <div className="search-controls">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Query Omni-search metadata..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <button className="execute-search-btn highlight" onClick={handleSearch}>
                SEARCH ARCHIVES
              </button>

              <div className="filter-group glass-card">
                <span className="filter-label">FILTER BY</span>
                <button 
                  className={`filter-btn ${searchType === 'title' ? 'active' : ''}`}
                  onClick={() => setSearchType('title')}
                >Title</button>
                <button 
                  className={`filter-btn ${searchType === 'author' ? 'active' : ''}`}
                  onClick={() => setSearchType('author')}
                >Author</button>
              </div>
            </div>
          </div>

          <div className="results-header">
            <h2 className="results-count font-mono">Search Results ({books.length} Matches)</h2>
            <div className="view-toggle">
              <button className="glass-card toggle-btn active"><Maximize2 size={16} /></button>
              <button className="glass-card toggle-btn"><Filter size={16} /></button>
            </div>
          </div>

          <div className="results-grid">
            {books.map((book, i) => (
              <motion.div 
                key={i} 
                className="book-result-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="book-visual">
                  <div className="book-cover-placeholder">
                    {book.cover_i ? (
                      <img 
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} 
                        alt={book.title}
                        className="book-cover-img"
                      />
                    ) : (
                      <div className="neon-orb" />
                    )}
                  </div>
                  <div className={`status-badge ${book.available ? 'available' : 'checked-out'}`}>
                    {book.available ? 'AVAILABLE' : 'CHECKED OUT'}
                  </div>
                  <Bookmark className="bookmark-icon" size={16} />
                </div>
                <div className="book-details">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author} • 2024</p>
                  <div className="book-meta">
                    <div className="location-tag">
                      <span className="meta-label">LOCATION</span>
                      <span className="meta-value">{book.shelfLocation || 'Sect-7'} // {book.rowNumber || 'Row-D'}</span>
                    </div>
                    <button className="view-btn" onClick={() => setSelectedBook(book)}>VIEW</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spatial Map Sidebar */}
        <aside className="spatial-sidebar">
          <div className="map-card glass-card">
            <h3 className="map-title"><MapPin size={18} /> Library Spatial Map</h3>
            <div className="blueprint-container">
              <div className="blueprint-grid">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`sector ${i === 1 ? 'target' : ''}`}>
                    <span className="sector-label">SECT {i + 1}</span>
                  </div>
                ))}
                <div className="radar-circle" />
                <MapPin className="target-pin" size={24} />
              </div>
            </div>
            <div className="map-info">
              <p className="current-target">CURRENT TARGET: <strong>Section 7: Theoretical Physics</strong></p>
              <div className="travel-time font-mono">Est. Travel Time: 02:45 MIN</div>
              <button className="navigate-btn">
                <Navigation size={18} /> NAVIGATE TO BOOK
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckAvailability;
