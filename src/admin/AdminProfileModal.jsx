import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Mail, Phone, Shield, MapPin, Key, Check, Save, Database, Eye, EyeOff, RefreshCw } from 'lucide-react';
import ImageUploadWidget from '../components/ImageUploadWidget';

export default function AdminProfileModal({ isOpen, onClose }) {
  const { adminProfile, updateAdminProfile, dbStatus, showToast } = useApp();

  const [formData, setFormData] = useState({
    id: 'admin-primary',
    username: 'sk@admin',
    password: 'sk@admin28',
    name: 'Mr. S. Karthikeyan',
    role: 'Super Admin',
    email: 'admin@sktours.com',
    phone: '+91 99946 44744',
    branch: 'Salem HQ (Fairlands)',
    bio: 'Managing luxury travel itineraries and operations at SK Tours & Travels Salem.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (adminProfile) {
      setFormData({
        id: adminProfile.id || 'admin-primary',
        username: adminProfile.username || 'sk@admin',
        password: adminProfile.password || 'sk@admin28',
        name: adminProfile.name || 'Mr. S. Karthikeyan',
        role: adminProfile.role || 'Super Admin',
        email: adminProfile.email || 'admin@sktours.com',
        phone: adminProfile.phone || '+91 99946 44744',
        branch: adminProfile.branch || 'Salem HQ (Fairlands)',
        bio: adminProfile.bio || 'Managing luxury travel itineraries and operations at SK Tours & Travels Salem.',
        avatar: adminProfile.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
      });
    }
  }, [adminProfile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateAdminProfile(formData);
      showToast('Admin profile & credentials saved directly to MongoDB Atlas!');
      onClose();
    } catch (err) {
      console.error('Error updating admin profile in MongoDB Atlas:', err);
      showToast('Failed to save profile changes.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', width: '92%', maxHeight: '92vh', overflowY: 'auto' }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '1rem',
          marginBottom: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={20} color="#d4af37" />
                Admin Profile CRUD (MongoDB Atlas)
              </h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
              Update admin identity, login credentials & contact details stored in database
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* MongoDB Atlas Sync Banner */}
        <div style={{
          background: 'rgba(21, 128, 61, 0.08)',
          border: '1px solid rgba(21, 128, 61, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '0.65rem 0.9rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#15803d', fontWeight: 600 }}>
            <Database size={15} />
            <span>MongoDB Collection: <code>admin_profiles</code> (Database: <code>sk_tours</code>)</span>
          </div>
          <span style={{
            fontSize: '0.68rem',
            background: dbStatus === 'connected' ? '#dcfce7' : '#fee2e2',
            color: dbStatus === 'connected' ? '#15803d' : '#b91c1c',
            padding: '0.15rem 0.5rem',
            borderRadius: '9999px',
            fontWeight: 700
          }}>
            {dbStatus === 'connected' ? '● Atlas Connected' : '○ Local Synced'}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Avatar Uploader with Automatic Image-to-URL Converter */}
          <div style={{ marginBottom: '1.25rem' }}>
            <ImageUploadWidget
              label="Admin Profile Avatar (Upload Photo or Paste URL)"
              value={formData.avatar}
              onChange={(url) => setFormData(prev => ({ ...prev, avatar: url }))}
              placeholder="Upload profile photo or paste image URL"
            />
          </div>

          {/* Section: Basic Identity */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">
                <User size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Full Name *
              </label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Mr. S. Karthikeyan"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Shield size={14} style={{ display: 'inline', marginRight: '4px' }} />
                System Role *
              </label>
              <select
                className="form-select"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              >
                <option value="Super Admin">Super Admin (All Privileges)</option>
                <option value="Managing Director">Managing Director</option>
                <option value="Senior Tour Consultant">Senior Tour Consultant</option>
                <option value="Operations Lead">Operations Lead</option>
              </select>
            </div>
          </div>

          {/* Section: Login Credentials (Stored in MongoDB Atlas) */}
          <div style={{
            background: 'var(--color-bg-base)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Key size={14} color="#d4af37" />
              Admin Login Credentials (MongoDB Authentication)
            </div>

            <div className="form-grid-2">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Login Username *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="e.g. sk@admin"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Login Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="form-input"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter new password"
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748b'
                    }}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
              ℹ️ Updating your username or password here will save directly to MongoDB Atlas and update your portal login immediately.
            </div>
          </div>

          {/* Section: Contact & Office */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">
                <Mail size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Contact Email
              </label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="admin@sktours.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Phone size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Official Phone
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 99946 44744"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Branch / Office Location
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.branch}
              onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
              placeholder="Salem Head Office (Fairlands, Salem, Tamil Nadu)"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Bio & Itinerary Signature</label>
            <textarea
              rows={2}
              className="form-textarea"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Short bio or signature shown on quotes and itineraries..."
            />
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border)'
          }}>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-gold"
              disabled={isSaving}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Save size={16} />
              {isSaving ? 'Updating MongoDB Atlas...' : 'Update in MongoDB Atlas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
