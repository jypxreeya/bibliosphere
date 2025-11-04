import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import CheckAvailability from "./pages/CheckAvailability";
import AuthorCategorization from "./pages/AuthorCategorization";
import MyCourse from "./pages/MyCourse";
import BorrowedBooks from "./pages/BorrowedBooks"; 

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


         <Route path="/check-availability" element={<CheckAvailability />} />

         
        <Route path="/author-categorization" element={<AuthorCategorization />} />

        <Route path="/mycourse" element={<MyCourse />} /> 
        <Route path="/borrowed-books" element={<BorrowedBooks />} />

      </Routes>
    </Router>
  );
}

export default App;


