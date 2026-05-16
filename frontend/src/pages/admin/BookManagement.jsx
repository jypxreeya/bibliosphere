import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  BookOpen, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Upload, 
  Filter,
  FileText,
  LogOut,
  ArrowLeft,
  Radio,
  BarChart2
} from "lucide-react";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar";

const BookManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    shelf: "",
    status: "Available"
  });

  const [books, setBooks] = useState([
    { id: "B-1024", title: "Quantum Computing for Dummies", author: "Dr. Thorne", category: "Science", shelf: "A-12", status: "Available" },
    { id: "B-1025", title: "Advanced React Patterns", author: "Kent Dodds", category: "Programming", shelf: "B-04", status: "Borrowed" },
    { id: "B-1026", title: "Theoretical Physics", author: "Richard Feynman", category: "Science", shelf: "A-01", status: "Available" },
    { id: "B-1027", title: "Digital Fortress", author: "Dan Brown", category: "Fiction", shelf: "F-12", status: "Overdue" },
  ]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/books", newBook);
      setBooks([...books, { id: res.data.id || `B-${Math.floor(Math.random() * 1000)}`, ...newBook }]);
      setShowModal(false);
      setNewBook({ title: "", author: "", category: "", shelf: "", status: "Available" });
      alert("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book");
    }
  };

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
                <h1 className="gradient-text">BOOK MANAGEMENT</h1>
                <p>Add, Edit, and Organize library volumes</p>
            </div>
          </div>

          <div className="quick-actions-bar">
            <button className="admin-btn">
                <Upload size={18} /> BULK UPLOAD CSV
            </button>
            <button className="admin-btn primary" onClick={() => setShowModal(true)}>
              <Plus size={18} /> ADD NEW BOOK
            </button>
          </div>
        </header>


        {/* MODAL */}
        {showModal && (
          <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="modal-content chart-container" style={{ width: '400px', padding: '2rem' }}>
              <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>Add New Volume</h2>
              <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Book Title" 
                  required 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '10px', color: '#fff' }}
                  value={newBook.title}
                  onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Author" 
                  required 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '10px', color: '#fff' }}
                  value={newBook.author}
                  onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Category" 
                  required 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '10px', color: '#fff' }}
                  value={newBook.category}
                  onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Shelf Location (e.g. A-12)" 
                  required 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '10px', color: '#fff' }}
                  value={newBook.shelf}
                  onChange={(e) => setNewBook({...newBook, shelf: e.target.value})}
                />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" className="admin-btn" onClick={() => setShowModal(false)} style={{ flex: 1 }}>CANCEL</button>
                  <button type="submit" className="admin-btn primary" style={{ flex: 1 }}>SAVE BOOK</button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* Search and Filters */}
        <div className="admin-table-controls" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div className="global-search-wrapper" style={{ width: '400px' }}>
                <Search size={18} className="text-muted" />
                <input 
                    type="text" 
                    placeholder="Search by title, author, or ISBN..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="admin-btn">
                <Filter size={18} /> FILTERS
            </button>
        </div>

        {/* Books Table */}
        <div className="chart-container" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Book ID</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Title</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Author</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Category</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Location</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="table-row-hover">
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 600, color: 'var(--admin-accent)' }}>{book.id}</td>
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700 }}>{book.title}</td>
                            <td style={{ padding: '1.2rem 1.5rem', color: 'rgba(255,255,255,0.7)' }}>{book.author}</td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                                <span style={{ background: 'rgba(131, 56, 236, 0.1)', color: '#8338ec', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>{book.category}</span>
                            </td>
                            <td style={{ padding: '1.2rem 1.5rem', fontFamily: 'monospace' }}>{book.shelf}</td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                                <span style={{ 
                                    color: book.status === 'Available' ? '#00ff88' : book.status === 'Borrowed' ? '#00f5ff' : '#ff4d4d',
                                    fontSize: '0.8rem',
                                    fontWeight: 700
                                }}>
                                    ● {book.status}
                                </span>
                            </td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                    <button style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><Edit2 size={16} /></button>
                                    <button style={{ background: 'transparent', border: 'none', color: 'rgba(255,77,77,0.4)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .table-row-hover:hover {
            background: rgba(255,255,255,0.01);
        }
      `}} />
    </div>
  );
};

export default BookManagement;
