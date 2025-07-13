import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null; // Don't show navbar on login/register pages
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-brand">
            SecureAuth
          </Link>
          
          <div className="navbar-menu">
            <Link to="/dashboard" className="btn btn-secondary">
              Dashboard
            </Link>
            
            {isAdmin && (
              <Link to="/admin" className="btn btn-secondary">
                Admin Panel
              </Link>
            )}
            
            <div className="navbar-user">
              <span>Welcome, {user?.username}</span>
              <span className="user-role">{user?.role}</span>
              <button 
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 