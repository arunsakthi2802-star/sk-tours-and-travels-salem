import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, Globe, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { adminLogin, navigate } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(async () => {
      const res = await adminLogin(username, password);
      if (!res.success) {
        setError(res.error || 'Invalid credentials. Access denied.');
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 350);
  };

  return (
    <div className="admin-login-page">
      {/* Background Decor */}
      <div className="admin-login-glow-1"></div>
      <div className="admin-login-glow-2"></div>

      <div className="admin-login-container">
        {/* Brand Header */}
        <div className="admin-login-header">
          <div className="admin-login-logo-img-wrapper">
            <img 
              src="/sk-logo.png" 
              alt="SK Tours Logo" 
              className="admin-login-custom-logo" 
            />
          </div>
          <h1 className="admin-login-title">
            SK <span>TOURS</span> CRM
          </h1>
          <p className="admin-login-subtitle">
            Salem Tour Operations • Executive Admin Portal
          </p>
          <div className="admin-login-badge">
            <ShieldCheck size={14} color="#d4af37" />
            <span>Authorized Personnel Only</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="admin-login-card">
          {error && (
            <div className="admin-login-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label htmlFor="admin-username">Username</label>
              <div className="admin-input-wrapper">
                <User size={18} className="admin-input-icon" />
                <input
                  id="admin-username"
                  type="text"
                  placeholder="Enter administrator username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="admin-password">Password</label>
              <div className="admin-input-wrapper">
                <Lock size={18} className="admin-input-icon" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="admin-pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="admin-login-options">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember session</span>
              </label>

              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Encrypted Session
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-gold admin-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span>Authenticating Securely...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <button
              type="button"
              className="admin-back-btn"
              onClick={() => navigate('/')}
            >
              <Globe size={15} />
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
