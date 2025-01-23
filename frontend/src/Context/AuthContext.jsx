import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');

    if (token && adminData) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAdmin(JSON.parse(adminData));
      setLoading(false);
    } else {
      setLoading(false);
    }

    const refreshInterval = setInterval(refreshToken, 25 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, []);

  const refreshToken = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await api.post('/admin/refresh-token');
      localStorage.setItem('adminToken', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    } catch (error) {
      console.error('Token refresh failed:', error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/admin/login', credentials);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminData', JSON.stringify(data));
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setAdmin(data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    delete api.defaults.headers.common['Authorization'];
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);