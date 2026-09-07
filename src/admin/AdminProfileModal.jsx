import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Mail, Phone, Shield, MapPin, Key, Check, Save } from 'lucide-react';
import ImageUploadWidget from '../components/ImageUploadWidget';

export default function AdminProfileModal({ isOpen, onClose }) {
  const { currentStaff, updateStaffProfile, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    branch: '',
    bio: '',
    avatar: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentStaff) {
      setFormData({
        name: currentStaff.name || 'Admin',
        email: currentStaff.email || 'admin@sktours.com',
        phone: currentStaff.phone || '+91 99946 44744',
        role: currentStaff.role || 'Super Admin',
        branch: currentStaff.branch || 'Salem HQ (Fairlands)',
        bio: currentStaff.bio || 'Managing luxury travel itineraries and operations at SK Tours & Travels Salem.',
        avatar: currentStaff.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
      });
    }
  }, [currentStaff, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateStaffProfile({
        ...currentStaff,
        ...formData
      });
      showToast('Admin profile updated successfully in MongoDB Atlas!');
      onClose();
    } catch (err) {
      console.error('Error updating admin profile:', err);
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
        style={{ maxWidth: '600px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} color="#d4af37" />
              Edit Administrator Profile
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Update your account details, contact info, and profile avatar
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

        <form onSubmit={handleSubmit}>
          {/* Avatar Uploader */}
          <div style={{ marginBottom: '1.5rem' }}>
            <ImageUploadWidget
              label="Profile Photo / Avatar"
              value={formData.avatar}
              onChange={(url) => setFormData(prev => ({ ...prev, avatar: url }))}
              placeholder="Upload profile photo or paste image URL"
            />
          </div>

          <div className="form-grid-2">
            {/* Full Name */}
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

            {/* Role / Designation */}
            <div className="form-group">
              <label className="form-label">
                <Shield size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Role / Title *
              </label>
              <select
                className="form-select"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Managing Director">Managing Director</option>
                <option value="Senior Tour Manager">Senior Tour Manager</option>
                <option value="Travel Consultant">Travel Consultant</option>
                <option value="Operations Lead">Operations Lead</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            {/* Email Address */}
            <div className="form-group">
              <label className="form-label">
                <Mail size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Email Address *
              </label>
              <input
                type="email"
                required
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="admin@sktours.com"
              />
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label">
                <Phone size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Contact Phone *
              </label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 99946 44744"
              />
            </div>
          </div>

          {/* Branch / Office */}
          <div className="form-group">
            <label className="form-label">
              <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Branch Office Location
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.branch}
              onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
              placeholder="e.g. Salem Head Office (Fairlands, Salem)"
            />
          </div>

          {/* Bio / Notes */}
          <div className="form-group">
            <label className="form-label">Profile Bio / Signature</label>
            <textarea
              rows={2}
              className="form-textarea"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Short bio or signature on tour quotes..."
            />
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '1.5rem',
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
              {isSaving ? 'Saving to Database...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
