import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  BookOpen, 
  Search, 
  UserPlus, 
  Edit2, 
  Lock, 
  Unlock, 
  History,
  LogOut,
  ArrowLeft,
  Filter,
  Radio,
  BarChart2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

import AdminSidebar from "../../components/AdminSidebar";

const StudentManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    { id: "S-501", name: "Jayapriya", dept: "M.Tech CSE", status: "Active", history: 12, attendance: "84%" },
    { id: "S-502", name: "Rahul Sharma", dept: "B.Tech IT", status: "Active", history: 8, attendance: "92%" },
    { id: "S-503", name: "Anita Roy", dept: "M.Sc Physics", status: "Blocked", history: 2, attendance: "45%" },
    { id: "S-504", name: "Kevin Vasan", dept: "B.Tech CSE", status: "Active", history: 15, attendance: "88%" },
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
                <h1 className="gradient-text">STUDENT MANAGEMENT</h1>
                <p>Monitor student activity, history, and access control</p>
            </div>
          </div>

          <div className="quick-actions-bar">
            <button className="admin-btn primary">
              <UserPlus size={18} /> REGISTER NEW STUDENT
            </button>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="admin-table-controls" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div className="global-search-wrapper" style={{ width: '400px' }}>
                <Search size={18} className="text-muted" />
                <input 
                    type="text" 
                    placeholder="Search by name, ID, or department..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="admin-btn">
                <Filter size={18} /> FILTERS
            </button>
        </div>

        {/* Students Table */}
        <div className="chart-container" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Student ID</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Full Name</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Department</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Reading Hist.</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Attendance</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="table-row-hover">
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 600, color: 'var(--admin-accent)' }}>{student.id}</td>
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700 }}>{student.name}</td>
                            <td style={{ padding: '1.2rem 1.5rem', color: 'rgba(255,255,255,0.7)' }}>{student.dept}</td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                                <span style={{ 
                                    color: student.status === 'Active' ? '#00ff88' : '#ff4d4d',
                                    background: student.status === 'Active' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                }}>
                                    {student.status}
                                </span>
                            </td>
                            <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center' }}>{student.history} Books</td>
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700 }}>{student.attendance}</td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                    <button title="View History" style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><History size={16} /></button>
                                    <button title="Edit" style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><Edit2 size={16} /></button>
                                    <button title={student.status === 'Active' ? 'Block' : 'Unblock'} style={{ background: 'transparent', border: 'none', color: student.status === 'Active' ? 'rgba(255,77,77,0.4)' : '#00ff88', cursor: 'pointer' }}>
                                        {student.status === 'Active' ? <Lock size={16} /> : <Unlock size={16} />}
                                    </button>
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

export default StudentManagement;
