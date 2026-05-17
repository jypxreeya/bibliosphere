import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Mail,
  UserCheck,
  TrendingUp,
  Percent,
  Sliders,
  Bell,
  Sparkles
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  ReferenceLine 
} from "recharts";
import "../../styles/AdminDashboard.css";
import AdminSidebar from "../../components/AdminSidebar";

const AdminAttendance = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [threshold, setThreshold] = useState(75);
  const [activeTab, setActiveTab] = useState("all"); // "all" or "low"
  const [alertMessage, setAlertMessage] = useState("");

  const [students, setStudents] = useState([
    { id: "S-501", name: "Jayapriya", dept: "M.Tech CSE", status: "Active", attendance: 84, classesAttended: 42, totalClasses: 50 },
    { id: "S-502", name: "Rahul Sharma", dept: "B.Tech IT", status: "Active", attendance: 92, classesAttended: 46, totalClasses: 50 },
    { id: "S-503", name: "Anita Roy", dept: "M.Sc Physics", status: "Blocked", attendance: 45, classesAttended: 22, totalClasses: 50 },
    { id: "S-504", name: "Kevin Vasan", dept: "B.Tech CSE", status: "Active", attendance: 88, classesAttended: 44, totalClasses: 50 },
    { id: "S-505", name: "Suresh Kumar", dept: "B.Tech ECE", status: "Active", attendance: 62, classesAttended: 31, totalClasses: 50 },
    { id: "S-506", name: "Meera Nair", dept: "M.Sc Chemistry", status: "Active", attendance: 71, classesAttended: 35, totalClasses: 50 },
    { id: "S-507", name: "Abhishek Singh", dept: "B.Tech ME", status: "Active", attendance: 95, classesAttended: 47, totalClasses: 50 },
  ]);

  // Handle Search and Tab Filtering
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.dept.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === "all") {
      return matchesSearch;
    } else {
      return matchesSearch && student.attendance < threshold;
    }
  });

  // Calculate statistics
  const totalStudents = students.length;
  const averageAttendance = Math.round(
    students.reduce((acc, curr) => acc + curr.attendance, 0) / totalStudents
  );
  const lowAttendanceCount = students.filter(s => s.attendance < threshold).length;

  const triggerAlert = (studentName) => {
    setAlertMessage(`⚠️ Attendance warning email dispatched to ${studentName}!`);
    setTimeout(() => setAlertMessage(""), 4000);
  };

  const triggerBulkAlert = () => {
    const names = students.filter(s => s.attendance < threshold).map(s => s.name).join(", ");
    setAlertMessage(`🚨 Bulk alerts dispatched to all students below ${threshold}% attendance: ${names}`);
    setTimeout(() => setAlertMessage(""), 5000);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      {/* Main Content */}
      <main className="admin-main">
        {/* Floating Toast Notification */}
        {alertMessage && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(3, 14, 27, 0.95)',
            border: '2px solid var(--admin-accent)',
            color: '#fff',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            backdropFilter: 'blur(10px)',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <Bell size={20} color="var(--admin-accent)" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{alertMessage}</span>
          </div>
        )}

        <header className="admin-header">
          <div className="header-left-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="back-btn glass-card" onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem', borderRadius: '10px', cursor: 'pointer' }}>
                <ArrowLeft size={18} />
            </button>
            <div className="admin-title">
                <h1 className="gradient-text">STUDENT ATTENDANCE MATRIX</h1>
                <p>Monitor student tracking logs and identify low-attendance alerts</p>
            </div>
          </div>

          <div className="quick-actions-bar">
            {lowAttendanceCount > 0 && (
              <button className="admin-btn primary" onClick={triggerBulkAlert} style={{ background: 'rgba(255, 77, 77, 0.8)', color: '#fff', border: '1px solid #ff4d4d' }}>
                <Mail size={18} /> ALERT ALL DEFAULTERS
              </button>
            )}
          </div>
        </header>

        {/* Dashboard Stats */}
        <div className="admin-stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Monitored Students</span>
              <UserCheck size={18} color="var(--admin-accent)" />
            </div>
            <div className="stat-value">{totalStudents}</div>
            <div className="stat-trend up">100% Tracking Active</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Average Attendance</span>
              <Percent size={18} color="var(--admin-secondary)" />
            </div>
            <div className="stat-value">{averageAttendance}%</div>
            <div className="stat-trend up" style={{ color: averageAttendance >= 75 ? '#00ff88' : '#ff4d4d' }}>
              {averageAttendance >= 75 ? 'Healthy Average' : 'Action Needed'}
            </div>
          </div>

          <div className="stat-card" style={{ 
            background: lowAttendanceCount > 0 ? 'rgba(255, 77, 77, 0.05)' : 'var(--admin-card-bg)',
            borderColor: lowAttendanceCount > 0 ? 'rgba(255, 77, 77, 0.2)' : 'rgba(255,255,255,0.05)'
          }}>
            <div className="stat-header">
              <span className="stat-label">Attendance Defaulters</span>
              <AlertTriangle size={18} color="#ff4d4d" />
            </div>
            <div className="stat-value" style={{ color: lowAttendanceCount > 0 ? '#ff4d4d' : '#fff' }}>
              {lowAttendanceCount}
            </div>
            <div className="stat-trend down" style={{ color: '#ff4d4d' }}>
              Attendance &lt; {threshold}%
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Threshold Configuration</span>
              <Sliders size={18} color="#fb5607" />
            </div>
            <div className="stat-value">{threshold}%</div>
            <div className="stat-trend" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
              <input 
                type="range" 
                min="50" 
                max="90" 
                value={threshold} 
                onChange={(e) => setThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#fb5607', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Charts & Interactive Section */}
        <div className="admin-charts-grid" style={{ marginBottom: '2rem' }}>
          <div className="chart-container" style={{ gridColumn: 'span 2' }}>
            <div className="chart-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--admin-accent)" />
                <h3 style={{ margin: 0 }}>Visual Attendance Analysis Matrix</h3>
              </div>
              <span className="font-mono text-muted text-xs">THRESHOLD: {threshold}%</span>
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={students} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '0.85rem' }} />
                  <YAxis stroke="rgba(255,255,255,0.4)" domain={[0, 100]} style={{ fontSize: '0.85rem' }} />
                  <Tooltip 
                    contentStyle={{ background: '#030e1b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--admin-accent)' }}
                    labelStyle={{ color: '#fff', fontWeight: 700 }}
                  />
                  <ReferenceLine y={threshold} stroke="#ff4d4d" strokeDasharray="5 5" label={{ value: `Limit (${threshold}%)`, fill: '#ff4d4d', position: 'top' }} />
                  <Bar dataKey="attendance" radius={[6, 6, 0, 0]}>
                    {students.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.attendance < threshold ? "url(#colorLow)" : "url(#colorNormal)"} 
                      />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--admin-accent)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--admin-accent)" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Search, Filter, and Defaulters Alerts Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
          <div className="global-search-wrapper" style={{ width: '400px' }}>
            <Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search by student name, ID, or department..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button 
              className="admin-btn" 
              onClick={() => setActiveTab("all")}
              style={{
                background: activeTab === "all" ? 'rgba(0, 245, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: activeTab === "all" ? 'var(--admin-accent)' : 'rgba(255, 255, 255, 0.1)',
                color: activeTab === "all" ? 'var(--admin-accent)' : '#fff'
              }}
            >
              All Records ({students.length})
            </button>
            <button 
              className="admin-btn" 
              onClick={() => setActiveTab("low")}
              style={{
                background: activeTab === "low" ? 'rgba(255, 77, 77, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: activeTab === "low" ? '#ff4d4d' : 'rgba(255, 255, 255, 0.1)',
                color: activeTab === "low" ? '#ff4d4d' : '#fff'
              }}
            >
              🚨 Low Attendance Alerts ({lowAttendanceCount})
            </button>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="chart-container" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>ID</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Name</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Department</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Lec. Attended</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Total Lec.</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Attendance Rate</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Alert Status</th>
                <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, i) => {
                  const isLow = student.attendance < threshold;
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="table-row-hover">
                      <td style={{ padding: '1.2rem 1.5rem', fontWeight: 600, color: 'var(--admin-accent)' }}>{student.id}</td>
                      <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700 }}>{student.name}</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'rgba(255,255,255,0.7)' }}>{student.dept}</td>
                      <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 600 }}>{student.classesAttended}</td>
                      <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>{student.totalClasses}</td>
                      <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, color: isLow ? '#ff4d4d' : '#00ff88' }}>
                        {student.attendance}%
                      </td>
                      <td style={{ padding: '1.2rem 1.5rem' }}>
                        <span style={{ 
                          color: isLow ? '#ff4d4d' : '#00ff88',
                          background: isLow ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 255, 136, 0.1)',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          {isLow ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
                          {isLow ? 'Low Attendance' : 'Compliant'}
                        </span>
                      </td>
                      <td style={{ padding: '1.2rem 1.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                          <button 
                            title="Dispatch warning alert" 
                            onClick={() => triggerAlert(student.name)}
                            disabled={!isLow}
                            style={{ 
                              background: 'transparent', 
                              border: 'none', 
                              color: isLow ? '#ff4d4d' : 'rgba(255,255,255,0.15)', 
                              cursor: isLow ? 'pointer' : 'not-allowed',
                              transition: 'color 0.3s'
                            }}
                          >
                            <Mail size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
                    <XCircle size={32} style={{ display: 'block', margin: '0 auto 10px', color: 'rgba(255,255,255,0.2)' }} />
                    No student records match the active criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .table-row-hover:hover {
            background: rgba(255,255,255,0.01);
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default AdminAttendance;
