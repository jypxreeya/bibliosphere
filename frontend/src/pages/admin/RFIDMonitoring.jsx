import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  BookOpen, 
  Radio, 
  Shield, 
  AlertCircle, 
  History,
  ArrowLeft,
  LogOut,
  MapPin,
  Maximize2,
  BarChart2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

import AdminSidebar from "../../components/AdminSidebar";

const RFIDMonitoring = () => {
  const navigate = useNavigate();
  const [scans, setScans] = useState([
    { id: "SCAN-901", book: "Quantum Computing", location: "Exit Gate A", time: "Just now", status: "Authorized" },
    { id: "SCAN-902", book: "Digital Electronics", location: "Floor 2 - Section B", time: "5 mins ago", status: "Authorized" },
    { id: "SCAN-903", book: "React Essentials", location: "Exit Gate B", time: "12 mins ago", status: "Alert" },
    { id: "SCAN-904", book: "Data Structures", location: "Floor 1 - Section A", time: "20 mins ago", status: "Authorized" },
  ]);

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
                <h1 className="gradient-text">RFID MONITORING</h1>
                <p>Live tracking of physical volumes & unauthorized movement alerts</p>
            </div>
          </div>

          <div className="quick-actions-bar">
            <button className="admin-btn">
                <Maximize2 size={18} /> FULLSCREEN RADAR
            </button>
            <button className="admin-btn primary">
              <Shield size={18} /> ARMED MODE
            </button>
          </div>
        </header>

        {/* Live Radar Mock */}
        <div className="chart-container" style={{ height: '300px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="radar-sweep" />
            <div className="radar-circle" style={{ width: '100px', height: '100px' }} />
            <div className="radar-circle" style={{ width: '200px', height: '200px' }} />
            <div className="radar-circle" style={{ width: '400px', height: '400px' }} />
            
            {/* Mock Pings */}
            <div className="radar-ping" style={{ top: '30%', left: '40%' }} />
            <div className="radar-ping alert" style={{ top: '60%', left: '70%' }} />
            <div className="radar-ping" style={{ top: '20%', left: '80%' }} />
            
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem' }}>
                    <div style={{ width: 8, height: 8, background: '#00f5ff', borderRadius: '50%' }} />
                    Active Tags
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem' }}>
                    <div style={{ width: 8, height: 8, background: '#ff4d4d', borderRadius: '50%' }} />
                    Movement Alerts
                </div>
            </div>
        </div>

        {/* Scan History Table */}
        <div className="chart-container" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="chart-header" style={{ padding: '1.5rem' }}>
                <h3>Real-time Scan History</h3>
                <span className="text-active text-xs">● 842 TAGS ONLINE</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Scan ID</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Book Title</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Current Location</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Timestamp</th>
                        <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {scans.map((scan, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="table-row-hover">
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 600, color: 'var(--admin-accent)' }}>{scan.id}</td>
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700 }}>{scan.book}</td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={14} className="text-muted" />
                                    <span>{scan.location}</span>
                                </div>
                            </td>
                            <td style={{ padding: '1.2rem 1.5rem', color: 'rgba(255,255,255,0.5)' }}>{scan.time}</td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                                <span style={{ 
                                    color: scan.status === 'Authorized' ? '#00ff88' : '#ff4d4d',
                                    background: scan.status === 'Authorized' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                }}>
                                    {scan.status}
                                </span>
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
        
        .radar-circle {
            position: absolute;
            border: 1px solid rgba(0, 245, 255, 0.1);
            border-radius: 50%;
        }
        
        .radar-sweep {
            position: absolute;
            width: 500px;
            height: 500px;
            background: conic-gradient(from 0deg, rgba(0, 245, 255, 0.2) 0deg, transparent 90deg);
            border-radius: 50%;
            animation: sweep 4s linear infinite;
        }
        
        .radar-ping {
            position: absolute;
            width: 8px;
            height: 8px;
            background: var(--admin-accent);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--admin-accent);
            animation: pulse 2s infinite;
        }
        
        .radar-ping.alert {
            background: #ff4d4d;
            box-shadow: 0 0 15px #ff4d4d;
        }
        
        @keyframes sweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default RFIDMonitoring;
