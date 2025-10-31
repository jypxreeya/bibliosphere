import React, { useState } from "react";
import "../styles/LoginPage.css";

import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [role, setRole] = useState("student"); // Default: Student

  return (
    <div className="login-container">
      {/* Background overlay */}
      <div className="background-overlay"></div>

      {/* Login Box */}
      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Login</h2>

        {/* Radio Buttons */}
        <div className="role-select">
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
            Student Login
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="staff"
              checked={role === "staff"}
              onChange={() => setRole("staff")}
            />
            Staff Login
          </label>
        </div>

        {/* Animate between Student/Staff forms */}
        <AnimatePresence mode="wait">
          {role === "student" ? (
            <motion.div
              key="student"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="form-content"
            >
              <input type="email" placeholder="Enter Student Email" />
              <input type="password" placeholder="Enter Password" />
              <button
                onClick={() => (window.location.href = "/student-dashboard")}
              >
                Login
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="staff"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="form-content"
            >
              <input type="email" placeholder="Enter Staff Email" />
              <input type="password" placeholder="Enter Password" />
              <button
                onClick={() => (window.location.href = "/staff-dashboard")}
              >
                Login
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        
      </motion.div>
    </div>
  );
}
