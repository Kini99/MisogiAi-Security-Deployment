import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [updatingUser, setUpdatingUser] = useState(null);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await authService.getAllUsers();
      setUsers(userData);
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setError('');
      setSuccess('');
      setUpdatingUser(userId);
      
      await authService.updateUserRole(userId, newRole);
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      setSuccess('User role updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to update user role');
      setTimeout(() => setError(''), 3000);
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      setUpdatingUser(userId);
      
      await authService.deleteUser(userId);
      
      // Update local state
      setUsers(users.filter(user => user.id !== userId));
      
      setSuccess('User deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to delete user');
      setTimeout(() => setError(''), 3000);
    } finally {
      setUpdatingUser(null);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="container">
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Panel</h1>
          <p className="dashboard-subtitle">Manage users and their roles</p>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {success && (
          <div className="success-message">
            {success}
          </div>
        )}
        
        <div className="users-table">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <strong>{user.username}</strong>
                      {user.id === currentUser.id && (
                        <span style={{ 
                          marginLeft: '0.5rem', 
                          fontSize: '0.8rem', 
                          color: '#667eea',
                          fontWeight: '500'
                        }}>
                          (You)
                        </span>
                      )}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="role-select"
                        disabled={user.id === currentUser.id || updatingUser === user.id}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <span style={{ 
                        backgroundColor: user.is_active ? '#c6f6d5' : '#fed7d7',
                        color: user.is_active ? '#276749' : '#c53030',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="table-actions">
                        {user.id !== currentUser.id && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="btn btn-danger btn-sm"
                            disabled={updatingUser === user.id}
                          >
                            {updatingUser === user.id ? 'Deleting...' : 'Delete'}
                          </button>
                        )}
                        {user.id === currentUser.id && (
                          <span style={{ fontSize: '0.8rem', color: '#718096' }}>
                            Cannot delete self
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f7fafc', borderRadius: '6px' }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#4a5568' }}>Admin Panel Information</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              📊 Total Users: {users.length}
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              👥 Regular Users: {users.filter(u => u.role === 'user').length}
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              🔐 Administrators: {users.filter(u => u.role === 'admin').length}
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              ✅ Active Users: {users.filter(u => u.is_active).length}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 