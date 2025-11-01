import React from "react";
import { motion } from "framer-motion";
import "../styles/StudentProfile.css";

export default function StudentProfile() {
  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="profile-card">
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Profile"
          className="profile-pic"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        <h2 className="profile-name">Jayapriya</h2>

        <div className="profile-details">
          <p><strong>Register Number:</strong> 2303412555922014</p>
          <p><strong>Roll Number:</strong> 4</p>
          <p><strong>Department:</strong> MTEC CSE</p>
          <p><strong>CGPA:</strong> 9.0</p>
          <p><strong>Library Attendance:</strong> 84%</p>
        </div>

        <div className="profile-buttons">
          <motion.button
            className="save-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>

          <motion.button
            className="ok-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            OK
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
