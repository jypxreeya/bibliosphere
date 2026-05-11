import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [role, setRole] = useState("student");
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignup) {
        const res = await axios.post("http://localhost:5000/api/auth/signup", {
          email,
          password,
          name,
          role
        });
        alert("Account created! Please login.");
        setIsSignup(false);
      } else {
        // REAL Firebase Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("Logged in:", user.email);
        
        if (role === "student") navigate("/student-dashboard");
        else navigate("/staff-dashboard");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert(error.message || "Authentication failed");
    }
  };

  const handleForgotPassword = () => {
    alert("Password reset link sent to " + email);
  };

  return (
    <div className="login-container">
      <div className="background-overlay"></div>

      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>{isSignup ? "Create Account" : "Login"}</h2>

        <div className="role-select">
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="staff"
              checked={role === "staff"}
              onChange={() => setRole("staff")}
            />
            Staff
          </label>
        </div>

        <div className="form-content">
          {isSignup && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {!isSignup && (
            <button className="forgot-btn" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
          )}

          <button onClick={handleAuth}>
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p className="toggle-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Login here" : "Register here"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
