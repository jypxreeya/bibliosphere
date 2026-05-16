import React from "react";
import "./styles/theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import CheckAvailability from "./pages/CheckAvailability";
import AuthorCategorization from "./pages/AuthorCategorization";
import MyCourse from "./pages/MyCourse";
import BorrowedBooks from "./pages/BorrowedBooks"; 
import ResearchPortal from "./pages/ResearchPortal";
import Attendance from "./pages/Attendance";
import NavigationPage from "./pages/Navigation";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BookManagement from "./pages/admin/BookManagement";
import StudentManagement from "./pages/admin/StudentManagement";
import BorrowManagement from "./pages/admin/BorrowManagement";
import RFIDMonitoring from "./pages/admin/RFIDMonitoring";
import AnalyticsDashboard from "./pages/admin/AnalyticsDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌟 Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* 🔐 Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🛠️ Admin Panel */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-books" element={<BookManagement />} />
        <Route path="/admin/manage-students" element={<StudentManagement />} />
        <Route path="/admin/borrowed-books" element={<BorrowManagement />} />
        <Route path="/admin/rfid-monitoring" element={<RFIDMonitoring />} />
        <Route path="/admin/analytics" element={<AnalyticsDashboard />} />

        {/* 🎓 Student Dashboard */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* 👤 Student Profile Page */}
        <Route path="/student-profile" element={<StudentProfile />} />


         <Route path="/check-availability" element={<CheckAvailability />} />

         
        <Route path="/author-categorization" element={<AuthorCategorization />} />

        <Route path="/mycourse" element={<MyCourse />} /> 
        <Route path="/borrowed-books" element={<BorrowedBooks />} />
        <Route path="/research-portal" element={<ResearchPortal />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/navigation" element={<NavigationPage />} />

      </Routes>
    </Router>
  );
}

export default App;


