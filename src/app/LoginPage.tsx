import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authStore from './stores/authStore';
import './style/LoginPage.css'; 

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await authStore.login(email, password); // Await login method
    } catch (error) {
      setError("Failed to login. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-page">
         <div className="login-container"> {/* Apply styles using CSS class */}
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field" // Apply styles to input fields
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field" // Apply styles to input fields
      />
      {error && <p className="error-message">{error}</p>} {/* Apply styles to error message */}
      <button onClick={handleLogin} className="login-button">Login</button> {/* Apply styles to login button */}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
    </div>
 
  );
};

export default LoginPage;
