import React from "react";
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  BookOpen, 
  UserCheck, 
  Radio, 
  FileText, 
  Bell, 
  BarChart2, 
  Database, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin-dashboard" },
    { name: "Manage Books", icon: <Book size={20} />, path: "/admin/manage-books" },
    { name: "Manage Students", icon: <Users size={20} />, path: "/admin/manage-students" },
    { name: "Borrowed Books", icon: <BookOpen size={20} />, path: "/admin/borrowed-books" },
    { name: "Attendance", icon: <UserCheck size={20} />, path: "/admin/attendance" },
    { name: "Research Papers", icon: <FileText size={20} />, path: "/admin/research" },
    { name: "Notifications", icon: <Bell size={20} />, path: "/admin/notifications" },
    { name: "Analytics", icon: <BarChart2 size={20} />, path: "/admin/analytics" },
    { name: "Digital Resources", icon: <Database size={20} />, path: "#" },
    { name: "Reports", icon: <FileText size={20} />, path: "#" },
    { name: "Settings", icon: <Settings size={20} />, path: "#" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="branding">
        <h2 className="brand-name">BIBLIOSPHERE</h2>
        <span className="brand-tagline">Admin Console v4.0</span>
      </div>

      <nav className="admin-nav-scroll">
        {sidebarItems.map((item, index) => (
          <div 
            key={index} 
            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => item.path !== "#" && navigate(item.path)}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-nav-item logout" onClick={() => navigate("/")}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
