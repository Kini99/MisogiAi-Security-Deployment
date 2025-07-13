import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome to your secure dashboard</p>
        </div>
        
        <div className="users-table">
          <div style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#2d3748' }}>Your Profile</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div>
                <h3 style={{ marginBottom: '0.5rem', color: '#4a5568' }}>Username</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>{user?.username}</p>
              </div>
              
              <div>
                <h3 style={{ marginBottom: '0.5rem', color: '#4a5568' }}>Email</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>{user?.email}</p>
              </div>
              
              <div>
                <h3 style={{ marginBottom: '0.5rem', color: '#4a5568' }}>Role</h3>
                <span className="user-role" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                  {user?.role}
                </span>
              </div>
              
              <div>
                <h3 style={{ marginBottom: '0.5rem', color: '#4a5568' }}>Status</h3>
                <span style={{ 
                  backgroundColor: user?.is_active ? '#c6f6d5' : '#fed7d7',
                  color: user?.is_active ? '#276749' : '#c53030',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {user?.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#4a5568' }}>Account Created</h3>
              <p style={{ fontSize: '1rem', color: '#718096' }}>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f7fafc', borderRadius: '6px' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#4a5568' }}>Security Information</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  ✅ Password is securely hashed using bcrypt
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  ✅ JWT token expires in 30 minutes
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  ✅ Role-based access control is active
                </li>
                {user?.role === 'admin' && (
                  <li style={{ marginBottom: '0.5rem' }}>
                    ✅ Admin privileges enabled
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 