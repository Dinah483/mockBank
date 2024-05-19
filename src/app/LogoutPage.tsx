import React from 'react';
import { useNavigate } from 'react-router-dom';
import authStore from './stores/authStore';
import './style/LogoutButton.css'; 

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
