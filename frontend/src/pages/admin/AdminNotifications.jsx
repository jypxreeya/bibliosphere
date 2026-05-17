import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Bell,
  CheckCheck,
  Trash2,
  Megaphone,
  UserCheck,
  BookOpen,
  Radio,
  Settings,
  Filter,
  Check,
  AlertTriangle,
  Send,
  X,
  Volume2
} from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/AdminDashboard.css";

const AdminNotifications = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  
  // Broadcast Announcement Form State
  const [broadcast, setBroadcast] = useState({
    title: "",
    message: "",
    audience: "All Students",
    priority: "MEDIUM"
  });

  // Pre-seeded interactive notifications
  const [notifications, setNotifications] = useState([
    {
      id: "N-101",
      title: "🚨 Attendance Alert: Defaulter Triggered",
      message: "Student 'Jayapriya' (M.Tech CSE) attendance fell to 74.2% (below compliance threshold of 75%). Auto-alert generated.",
      type: "attendance",
      time: "2 minutes ago",
      read: false,
      priority: "HIGH"
    },
    {
      id: "N-102",
      title: "📚 Overdue Return Warning Issued",
      message: "Student 'Rahul Sharma' (B.Tech IT) return window for 'Introduction to Algorithms' has expired. Daily fine accumulated.",
      type: "borrow",
      time: "15 minutes ago",
      read: false,
      priority: "HIGH"
    },
    {
      id: "N-103",
      title: "🔄 Firebase Storage Synchronization Complete",
      message: "Digital archive backup sync successfully executed. 1,024 student records synced safely.",
      type: "system",
      time: "1 hour ago",
      read: true,
      priority: "LOW"
    },
    {
      id: "N-104",
      title: "📢 Broadcast: Research Submissions Extended",
      message: "Academic Announcement: The submission deadline for M.Tech final research paper catalog uploads has been extended to May 30.",
      type: "broadcast",
      time: "4 hours ago",
      read: true,
      priority: "MEDIUM"
    },
    {
      id: "N-105",
      title: "📚 Queue Reservation Request",
      message: "Student 'Meera Nair' has queued reservation request for 'Quantum Physics: Principles and Applications'.",
      type: "borrow",
      time: "6 hours ago",
      read: false,
      priority: "LOW"
    }
  ]);

  // Mark single notification as read
  const toggleReadStatus = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all as read
  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    alert("All notifications marked as read.");
  };

  // Clear system history
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to purge system log history?")) {
      setNotifications([]);
    }
  };

  // Send Admin Broadcast Announcement
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    const newAlert = {
      id: `N-${Math.floor(Math.random() * 1000 + 106)}`,
      title: `📢 Broadcast: ${broadcast.title}`,
      message: `${broadcast.message} [Target: ${broadcast.audience}]`,
      type: "broadcast",
      time: "Just now",
      read: false,
      priority: broadcast.priority
    };

    setNotifications([newAlert, ...notifications]);
    setShowBroadcastModal(false);
    setBroadcast({
      title: "",
      message: "",
      audience: "All Students",
      priority: "MEDIUM"
    });
    alert("System broadcast successfully dispatched to all active digital terminals!");
  };

  // Filter Logic
  const filteredAlerts = notifications.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  // Telemetry Counts
  const unreadCount = notifications.filter((n) => !n.read).length;
  const highPriorityCount = notifications.filter((n) => n.priority === "HIGH" && !n.read).length;

  return (
    <div className="admin-container">
      <AdminSidebar />

      {/* Main Panel Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="back-btn glass-card" onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem', borderRadius: '10px', cursor: 'pointer' }}>
              <ArrowLeft size={18} />
            </button>
            <div className="admin-title">
              <h1 className="gradient-text">SYSTEM NOTIFICATIONS</h1>
              <p>Broadcast student announcements and audit library telemetry triggers</p>
            </div>
          </div>

          <div className="quick-actions-bar" style={{ display: 'flex', gap: '10px' }}>
            <button className="admin-btn primary" onClick={() => setShowBroadcastModal(true)}>
              <Megaphone size={18} style={{ marginRight: '6px' }} /> NEW BROADCAST
            </button>
          </div>
        </header>

        {/* Telemetry Dashboard Stats */}
        <div className="admin-stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Pending Action Alerts</span>
              <Bell size={18} color="var(--admin-accent)" />
            </div>
            <div className="stat-value">{unreadCount}</div>
            <div className="stat-trend up">Action Required</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Critical Warnings</span>
              <AlertTriangle size={18} color="#ff4d4d" />
            </div>
            <div className="stat-value">{highPriorityCount}</div>
            <div className="stat-trend down" style={{ color: '#ff4d4d' }}>High Priority</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Dispatched Broadcasts</span>
              <Radio size={18} color="var(--admin-secondary)" />
            </div>
            <div className="stat-value">{notifications.filter(n => n.type === 'broadcast').length}</div>
            <div className="stat-trend up" style={{ color: 'var(--admin-secondary)' }}>System Announcements</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Logs Cached</span>
              <Settings size={18} color="#00ff88" />
            </div>
            <div className="stat-value">{notifications.length}</div>
            <div className="stat-trend up" style={{ color: '#00ff88' }}>Telemetry Safe</div>
          </div>
        </div>

        {/* Control and Filters Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.01)', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginRight: '8px', fontWeight: 600 }}>Filter Logs:</span>
            {["all", "attendance", "borrow", "broadcast", "system"].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  background: activeFilter === filter ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
                  border: activeFilter === filter ? '1px solid var(--admin-accent)' : '1px solid rgba(255,255,255,0.05)',
                  color: activeFilter === filter ? 'var(--admin-accent)' : 'rgba(255,255,255,0.6)',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: activeFilter === filter ? 700 : 500,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s'
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="admin-btn" onClick={handleMarkAllRead} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCheck size={14} /> MARK ALL READ
            </button>
            <button className="admin-btn" onClick={handleClearAll} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#ff4d4d', border: '1px solid rgba(255, 77, 77, 0.2)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trash2 size={14} /> PURGE LOGS
            </button>
          </div>
        </div>

        {/* Live Notification Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((item) => (
              <div 
                key={item.id}
                style={{
                  background: item.read ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)',
                  border: item.read ? '1px solid rgba(255, 255, 255, 0.03)' : '1px solid rgba(0, 245, 255, 0.15)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s',
                  boxShadow: item.read ? 'none' : '0 0 15px rgba(0, 245, 255, 0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Left Indicator Glow Line */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: item.priority === 'HIGH' ? '#ff4d4d' : item.type === 'broadcast' ? 'var(--admin-secondary)' : 'var(--admin-accent)'
                }} />

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingLeft: '10px' }}>
                  <div style={{
                    background: item.type === 'attendance' ? 'rgba(255, 77, 77, 0.08)' : item.type === 'borrow' ? 'rgba(0, 245, 255, 0.08)' : 'rgba(131, 56, 236, 0.08)',
                    padding: '0.6rem',
                    borderRadius: '10px',
                    color: item.type === 'attendance' ? '#ff4d4d' : item.type === 'borrow' ? 'var(--admin-accent)' : 'var(--admin-secondary)'
                  }}>
                    {item.type === 'attendance' ? <UserCheck size={20} /> : item.type === 'borrow' ? <BookOpen size={20} /> : <Megaphone size={20} />}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: item.read ? 'rgba(255,255,255,0.7)' : '#fff' }}>{item.title}</h4>
                      {!item.read && (
                        <span style={{ background: 'var(--admin-accent)', color: '#000', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>NEW</span>
                      )}
                      {item.priority === 'HIGH' && (
                        <span style={{ background: '#ff4d4d', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>CRITICAL</span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.message}</p>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px', fontFamily: 'monospace' }}>Alert ID: {item.id} // Dispatched {item.time}</span>
                  </div>
                </div>

                <div>
                  {!item.read ? (
                    <button 
                      onClick={() => toggleReadStatus(item.id)}
                      className="admin-btn"
                      style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', borderColor: 'var(--admin-accent)', color: 'var(--admin-accent)' }}
                    >
                      <Check size={12} style={{ marginRight: '4px' }} /> Resolve Alert
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#00ff88', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCheck size={14} /> Resolved
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '5rem', background: 'var(--admin-card-bg)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
              <Bell size={48} style={{ display: 'block', margin: '0 auto 1rem', opacity: 0.3 }} />
              <h3 style={{ margin: 0, color: '#fff' }}>Logs Archive Empty</h3>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>No system notifications are currently matching filters.</p>
            </div>
          )}
        </div>

        {/* BROADCAST POPUP MODAL */}
        {showBroadcastModal && (
          <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 12, 0.85)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="research-modal-content chart-container" style={{ width: '540px', padding: '2.5rem', position: 'relative', border: '1px solid rgba(131, 56, 236, 0.25)', boxShadow: '0 0 40px rgba(131, 56, 236, 0.15)', borderRadius: '20px', background: 'radial-gradient(circle at top left, #0e051e 0%, #03010b 100%)' }}>
              
              <button 
                style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }} 
                onClick={() => setShowBroadcastModal(false)}
                onMouseEnter={(e) => e.target.style.color = '#ff4d4d'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
              >
                <X size={24} />
              </button>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <span className="font-mono" style={{ color: 'var(--admin-secondary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', display: 'block' }}>BROADCAST CORE v4.0</span>
                <h2 className="gradient-text" style={{ fontSize: '1.6rem', margin: '4px 0 0 0', background: 'linear-gradient(135deg, #a26eff 0%, #8338ec 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Broadcast Announcement</h2>
              </div>

              <form onSubmit={handleSendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Announcement Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Research Papers Submissions Extended" 
                    required 
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                    value={broadcast.title}
                    onChange={(e) => setBroadcast({...broadcast, title: e.target.value})}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Target Audience</label>
                    <select 
                      style={{ background: 'rgba(3, 1, 11, 0.98)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                      value={broadcast.audience}
                      onChange={(e) => setBroadcast({...broadcast, audience: e.target.value})}
                    >
                      <option value="All Students">All Students</option>
                      <option value="Attendance Defaulters">Attendance Defaulters</option>
                      <option value="CSE Department">CSE Department</option>
                      <option value="Active Borrowers">Active Borrowers</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Alert Level</label>
                    <select 
                      style={{ background: 'rgba(3, 1, 11, 0.98)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                      value={broadcast.priority}
                      onChange={(e) => setBroadcast({...broadcast, priority: e.target.value})}
                    >
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Announcement Message</label>
                  <textarea 
                    rows="4" 
                    placeholder="Enter the full text alert that will display on student terminals..." 
                    required
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '10px', color: '#fff', fontSize: '0.85rem', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
                    value={broadcast.message}
                    onChange={(e) => setBroadcast({...broadcast, message: e.target.value})}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                  <button type="button" className="admin-btn" onClick={() => setShowBroadcastModal(false)} style={{ flex: 1, padding: '0.8rem' }}>CANCEL</button>
                  <button type="submit" className="admin-btn primary" style={{ flex: 1, padding: '0.8rem', background: 'var(--admin-secondary)', borderColor: 'var(--admin-secondary)' }}>
                    <Send size={16} style={{ marginRight: '6px' }} /> SEND BROADCAST
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminNotifications;
