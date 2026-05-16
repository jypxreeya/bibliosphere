import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  BookOpen, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  ArrowLeft,
  LogOut,
  Filter,
  DollarSign,
  Radio,
  BarChart2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

import AdminSidebar from "../../components/AdminSidebar";

const BorrowManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    { id: "T-801", book: "Quantum Computing", student: "Jayapriya", borrowDate: "2026-05-10", dueDate: "2026-05-24", status: "Borrowed", fine: 0 },
    { id: "T-802", book: "Digital Electronics", student: "Rahul Sharma", borrowDate: "2026-04-15", dueDate: "2026-04-29", status: "Overdue", fine: 250 },
    { id: "T-803", book: "React Essentials", student: "Anita Roy", borrowDate: "2026-05-01", dueDate: "2026-05-15", status: "Returned", fine: 0 },
    { id: "T-804", book: "Data Structures", student: "Kevin Vasan", borrowDate: "2026-05-12", dueDate: "2026-05-26", status: "Borrowed", fine: 0 },
  ];

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
                <h1 className="gradient-text">BORROW & RETURN</h1>
                <p>Track loan history, due dates, and fine calculations</p>
            </div>
          </div>

          <div className="quick-actions-bar">
            <button className="admin-btn">
                <DollarSign size={18} /> FINE LOGS
            </button>
            <button className="admin-btn primary">
              <CheckCircle size={18} /> RECORD RETURN
            </button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '2rem' }}>
            <div className="stat-card">
                <span className="stat-label">Currently Borrowed</span>
                <div className="stat-value">1,245</div>
            </div>
            <div className="stat-card">
                <span className="stat-label">Pending Returns</span>
                <div className="stat-value">84</div>
            </div>
            <div className="stat-card">
                <span className="stat-label">Overdue Items</span>
                <div className="stat-value" style={{ color: '#ff4d4d' }}>42</div>
            </div>
            <div className="stat-card">
                <span className="stat-label">Total Fines Collected</span>
                <div className="stat-value" style={{ color: '#00ff88' }}>₹ 12,450</div>
            </div>
        </div>

        {/* Search and Filters */}
        <div className="admin-table-controls" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div className="global-search-wrapper" style={{ width: '400px' }}>
                <Search size={18} className="text-muted" />
                <input 
                    type="text" 
                    placeholder="Search by student, book title, or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="admin-btn">
                <Filter size={18} /> FILTERS
            </button>
        </div>

        {/* Transactions Table */}
        <div className="chart-container" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>TXN ID</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Book Title</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Student</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Borrow Date</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Due Date</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Fine</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="table-row-hover">
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 600, color: 'var(--admin-accent)' }}>{txn.id}</td>
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700 }}>{txn.book}</td>
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>{txn.student}</td>
                            <td style={{ padding: '1.2rem 1.5rem', color: 'rgba(255,255,255,0.5)' }}>{txn.borrowDate}</td>
                            <td style={{ padding: '1.2rem 1.5rem', color: txn.status === 'Overdue' ? '#ff4d4d' : 'rgba(255,255,255,0.5)' }}>{txn.dueDate}</td>
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, color: txn.fine > 0 ? '#ff4d4d' : 'inherit' }}>{txn.fine > 0 ? `₹ ${txn.fine}` : '-'}</td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {txn.status === 'Borrowed' && <Clock size={14} color="#00f5ff" />}
                                    {txn.status === 'Overdue' && <AlertTriangle size={14} color="#ff4d4d" />}
                                    {txn.status === 'Returned' && <CheckCircle size={14} color="#00ff88" />}
                                    <span style={{ 
                                        color: txn.status === 'Returned' ? '#00ff88' : txn.status === 'Overdue' ? '#ff4d4d' : '#00f5ff',
                                        fontSize: '0.8rem',
                                        fontWeight: 700
                                    }}>
                                        {txn.status}
                                    </span>
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

export default BorrowManagement;
