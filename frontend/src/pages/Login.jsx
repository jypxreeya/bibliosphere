import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-buttons">
        <Link to="/student-login">
          <button>Login as Student</button>
        </Link>
        <Link to="/staff-login">
          <button>Login as Staff</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
