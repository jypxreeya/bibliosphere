import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌟 Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* 🔐 Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🎓 Student Dashboard */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* 👤 Student Profile Page */}
        <Route path="/student-profile" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
