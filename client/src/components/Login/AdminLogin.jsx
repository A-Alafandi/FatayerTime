import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/auth';
import './AdminLogin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      console.log('✅ Login successful');
      navigate('/admin');
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Login mislukt');
    }
  };

  return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Admin Login</h1>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Gebruikersnaam</label>
              <input
                  id="username"
                  type="text"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Voer uw gebruikersnaam in"
                  required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Wachtwoord</label>
              <input
                  id="password"
                  type="password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Voer uw wachtwoord in"
                  required
              />
            </div>
            {error && <div className="login-error">{error}</div>}
            <button type="submit" className="login-button">
              Inloggen
            </button>
          </form>
        </div>
      </div>
  );
}