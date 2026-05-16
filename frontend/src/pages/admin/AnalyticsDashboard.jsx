import React from "react";
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  BookOpen, 
  BarChart2, 
  TrendingUp, 
  PieChart as PieIcon,
  Activity,
  ArrowLeft,
  LogOut,
  Radio,
  Cpu
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from "recharts";
import "../../styles/AdminDashboard.css";

import AdminSidebar from "../../components/AdminSidebar";

const AnalyticsDashboard = () => {
  const navigate = useNavigate();

  const trendData = [
    { name: "Quantum Physics", count: 450 },
    { name: "React JS", count: 380 },
    { name: "Machine Learning", count: 520 },
    { name: "Linguistics", count: 210 },
    { name: "Economics", count: 180 },
  ];

  const readingTrends = [
    { month: "Jan", hours: 1200 },
    { month: "Feb", hours: 1500 },
    { month: "Mar", hours: 1800 },
    { month: "Apr", hours: 1400 },
    { month: "May", hours: 2200 },
    { month: "Jun", hours: 2500 },
  ];

  const COLORS = ["#00f5ff", "#8338ec", "#ff006e", "#fb5607", "#ffbe0b"];

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
                <h1 className="gradient-text">AI ANALYTICS HUB</h1>
                <p>Advanced predictive insights & student interest mapping</p>
            </div>
          </div>

          <div className="quick-actions-bar">
            <button className="admin-btn primary">
              <Cpu size={18} /> RE-TRAIN AI MODEL
            </button>
          </div>
        </header>

        {/* AI Insight Cards */}
        <div className="admin-stats-grid" style={{ marginBottom: '2rem' }}>
            <div className="stat-card" style={{ background: 'rgba(0, 245, 255, 0.05)', borderColor: 'rgba(0, 245, 255, 0.2)' }}>
                <div className="stat-header">
                    <span className="stat-label">Predicted Peak Hours</span>
                    <Activity size={18} color="#00f5ff" />
                </div>
                <div className="stat-value">14:00 - 16:00</div>
                <div className="stat-trend up">92% Accuracy</div>
            </div>
            <div className="stat-card">
                <div className="stat-header">
                    <span className="stat-label">Top Research Domain</span>
                    <TrendingUp size={18} color="#8338ec" />
                </div>
                <div className="stat-value">Deep Learning</div>
                <div className="stat-trend up">+15% interest</div>
            </div>
             <div className="stat-card">
                <div className="stat-header">
                    <span className="stat-label">Churn Risk (Low Activity)</span>
                    <Users size={18} color="#ff4d4d" />
                </div>
                <div className="stat-value">12 Students</div>
                <div className="stat-trend down">Action Recommended</div>
            </div>
             <div className="stat-card">
                <div className="stat-header">
                    <span className="stat-label">Book Demand Forecast</span>
                    <Book size={18} color="#fb5607" />
                </div>
                <div className="stat-value">+45 Volumes</div>
                <div className="stat-trend up">Next 30 Days</div>
            </div>
        </div>

        <div className="admin-charts-grid">
            <div className="chart-container">
                <div className="chart-header">
                    <h3>Most Searched Research Topics</h3>
                    <BarChart2 size={18} className="text-muted" />
                </div>
                <div style={{ width: '100%', height: 350 }}>
                    <ResponsiveContainer>
                        <BarChart data={trendData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis type="number" stroke="rgba(255,255,255,0.3)" />
                            <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.3)" width={120} />
                            <Tooltip 
                                contentStyle={{ background: '#030e1b', border: '1px solid rgba(255,255,255,0.1)' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="count" fill="url(#colorBar)" radius={[0, 4, 4, 0]} />
                            <defs>
                                <linearGradient id="colorBar" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="5%" stopColor="#8338ec" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0.8}/>
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="chart-container">
                <div className="chart-header">
                    <h3>Total Reading Hours Trend</h3>
                    <Activity size={18} className="text-muted" />
                </div>
                <div style={{ width: '100%', height: 350 }}>
                    <ResponsiveContainer>
                        <LineChart data={readingTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
                            <YAxis stroke="rgba(255,255,255,0.3)" />
                            <Tooltip 
                                contentStyle={{ background: '#030e1b', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                            <Line type="monotone" dataKey="hours" stroke="#00f5ff" strokeWidth={3} dot={{ r: 6, fill: '#00f5ff' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
