import React from "react";
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  BookOpen, 
  AlertCircle, 
  Search, 
  TrendingUp, 
  Bell, 
  Settings, 
  LogOut,
  FileText,
  Radio,
  BarChart2,
  Database,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck
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
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import "../../styles/AdminDashboard.css";

import AdminSidebar from "../../components/AdminSidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Books", value: "24,512", trend: "+12%", up: true, icon: <Book size={20} /> },
    { label: "Total Students", value: "3,842", trend: "+5%", up: true, icon: <Users size={20} /> },
    { label: "Books Borrowed", value: "1,245", trend: "+18%", up: true, icon: <BookOpen size={20} /> },
    { label: "Available Books", value: "23,267", trend: "-2%", up: false, icon: <Book size={20} /> },
    { label: "Overdue Books", value: "42", trend: "+8%", up: false, icon: <AlertCircle size={20} /> },
    { label: "Active Users", value: "856", trend: "+24%", up: true, icon: <UserCheck size={20} /> },
    { label: "Research Papers", value: "12,400", trend: "+15%", up: true, icon: <FileText size={20} /> },
    { label: "Daily Visitors", value: "428", trend: "+10%", up: true, icon: <Users size={20} /> },
  ];

  const barData = [
    { name: "Mon", visitors: 400 },
    { name: "Tue", visitors: 300 },
    { name: "Wed", visitors: 600 },
    { name: "Thu", visitors: 800 },
    { name: "Fri", visitors: 500 },
    { name: "Sat", visitors: 200 },
    { name: "Sun", visitors: 150 },
  ];

  const lineData = [
    { name: "Jan", borrowed: 400 },
    { name: "Feb", borrowed: 300 },
    { name: "Mar", borrowed: 500 },
    { name: "Apr", borrowed: 450 },
    { name: "May", borrowed: 700 },
    { name: "Jun", borrowed: 600 },
  ];

  const pieData = [
    { name: "CS", value: 400 },
    { name: "Physics", value: 300 },
    { name: "Maths", value: 300 },
    { name: "Arts", value: 200 },
  ];

  const COLORS = ["#00f5ff", "#8338ec", "#ff006e", "#fb5607"];

  const activities = [
    { user: "Jayapriya", action: "borrowed 'Quantum Computing'", time: "2 mins ago" },
    { user: "Admin", action: "added 12 new volumes to CS section", time: "15 mins ago" },
    { user: "Rahul S.", action: "returned 'Advanced Algorithms'", time: "45 mins ago" },
    { user: "Security Gateway", action: "detected checkout mismatch: Book B-104", time: "1 hour ago" },
  ];

  return (
    <div className="admin-container">
      <AdminSidebar />

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-title">
            <h1 className="gradient-text">ADMIN DASHBOARD</h1>
            <p>System Overview // Academic Year 2026</p>
          </div>

          <div className="quick-actions-bar">
            <div className="global-search-wrapper" style={{ width: '300px' }}>
              <Search size={18} className="text-muted" />
              <input type="text" placeholder="Search records..." />
            </div>
            <button className="admin-btn primary" onClick={() => navigate("/admin/manage-books")}>
              <Plus size={18} /> ADD NEW BOOK
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="admin-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <span className="stat-label">{stat.label}</span>
                {stat.icon}
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-trend ${stat.up ? 'up' : 'down'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend} <span className="text-muted font-normal">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="admin-charts-grid">
          <div className="chart-container">
            <div className="chart-header">
              <h3>Library Traffic Intelligence</h3>
              <span className="font-mono text-muted text-xs">WEEKLY ANALYTICS</span>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip 
                    contentStyle={{ background: '#030e1b', border: '1px solid rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: '#00f5ff' }}
                  />
                  <Bar dataKey="visitors" fill="url(#colorVisit)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="colorVisit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h3>Resource Allocation</h3>
              <span className="font-mono text-muted text-xs">BY DEPARTMENT</span>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#030e1b', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                {pieData.map((entry, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px' }}>
                    <div style={{ width: 8, height: 8, background: COLORS[i], borderRadius: '50%' }} />
                    {entry.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="admin-charts-grid">
           <div className="chart-container">
            <div className="chart-header">
              <h3>Borrowing Trends</h3>
              <TrendingUp size={18} className="text-muted" />
            </div>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip 
                    contentStyle={{ background: '#030e1b', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <Line type="monotone" dataKey="borrowed" stroke="#8338ec" strokeWidth={3} dot={{ r: 4, fill: '#8338ec' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h3>Live Activity Logs</h3>
              <span className="text-active text-xs">● LIVE MONITORING</span>
            </div>
            <div className="activity-list">
              {activities.map((act, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-icon">
                    <UserCheck size={16} />
                  </div>
                  <div className="activity-info">
                    <p>{act.user} <span className="text-muted" style={{ fontWeight: 400 }}>{act.action}</span></p>
                    <span>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
