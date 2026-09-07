import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, User, Mail, Phone, Shield, MapPin, Key, Save, Database, 
  Eye, EyeOff, Upload, Trash2, Camera, RefreshCw, Sparkles, Link 
} from 'lucide-react';

export default function AdminProfileModal({ isOpen, onClose }) {
  const { adminProfile, updateAdminProfile, uploadImage, dbStatus, showToast } = useApp();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    id: 'admin-primary',
    username: 'sk@admin',
    password: 'sk@admin28',
    name: 'Sakthivel C',
    role: 'Super Admin',
    email: 'admin@sktours.com',
    phone: '+91 99946 44744',
    branch: 'Salem HQ (Fairlands)',
    bio: 'Executive Director of SK Tours & Travels Salem. Leading luxury travel operations.',
    avatar: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    if (adminProfile) {
      setFormData({
        id: adminProfile.id || 'admin-primary',
        username: adminProfile.username || 'sk@admin',
        password: adminProfile.password || 'sk@admin28',
        name: adminProfile.name || 'Sakthivel C',
        role: adminProfile.role || 'Super Admin',
        email: adminProfile.email || 'admin@sktours.com',
        phone: adminProfile.phone || '+91 99946 44744',
        branch: adminProfile.branch || 'Salem HQ (Fairlands)',
        bio: adminProfile.bio || 'Executive Director of SK Tours & Travels Salem. Leading luxury travel operations.',
        avatar: adminProfile.avatar || ''
      });
    }
  }, [adminProfile, isOpen]);

  if (!isOpen) return null;

  // Direct device photo upload handler (mobile camera / gallery / desktop file)
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WEBP)', 'warning');
      return;
    }

    setIsUploadingPhoto(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const img = new Image();
      img.onload = async () => {
        try {
          // Client-side high-quality canvas compression (max 800px)
          const maxDim = 800;
          let width = img.width;
          let height = img.height;
          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedData = canvas.toDataURL('image/jpeg', 0.85);

          // Upload directly to MongoDB Atlas Image store
          if (uploadImage) {
            const hostedUrl = await uploadImage(compressedData, 'admin_profile_photo.jpg');
            setFormData(prev => ({ ...prev, avatar: hostedUrl || compressedData }));
          } else {
            setFormData(prev => ({ ...prev, avatar: compressedData }));
          }

          showToast('Profile photo updated & uploaded to MongoDB Atlas!');
        } catch (err) {
          console.error('Error uploading photo:', err);
          showToast('Failed to process image: ' + err.message, 'error');
        } finally {
          setIsUploadingPhoto(false);
          // Reset file input so same file can be picked again if needed
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Remove profile photo
  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, avatar: '' }));
    showToast('Profile photo removed. Showing gold initials monogram (SC).', 'info');
  };

  // Compute initials for monogram
  const getInitials = (nameStr) => {
    if (!nameStr) return 'SC';
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

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
        style={{ maxWidth: '620px', width: '94vw', maxHeight: '92vh', overflowY: 'auto' }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '0.9rem',
          marginBottom: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} color="#d4af37" />
              Admin Profile & Credentials
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '3px 0 0 0' }}>
              Direct MongoDB Atlas database synchronization
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* MongoDB Atlas Sync Status Pill */}
        <div style={{
          background: 'rgba(21, 128, 61, 0.08)',
          border: '1px solid rgba(21, 128, 61, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '0.55rem 0.85rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          flexWrap: 'wrap',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#15803d', fontWeight: 600 }}>
            <Database size={15} />
            <span>Collection: <code>admin_profiles</code> (MongoDB Atlas)</span>
          </div>
          <span style={{
            fontSize: '0.68rem',
            background: dbStatus === 'connected' ? '#dcfce7' : '#fee2e2',
            color: dbStatus === 'connected' ? '#15803d' : '#b91c1c',
            padding: '0.15rem 0.55rem',
            borderRadius: '9999px',
            fontWeight: 700
          }}>
            {dbStatus === 'connected' ? '● Atlas Connected' : '○ Local Synced'}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PROFILE PHOTO MANAGER: DIRECT UPLOAD & REMOVE */}
          <div style={{
            background: 'var(--color-bg-base)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap'
          }}>
            {/* Visual Avatar / Monogram */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--color-gold)',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.25)',
                    display: 'block'
                  }}
                />
              ) : (
                <div style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0b132b 0%, #162447 100%)',
                  border: '3px solid var(--color-gold)',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em'
                }}>
                  {getInitials(formData.name)}
                </div>
              )}
            </div>

            {/* Direct Upload & Remove Buttons */}
            <div style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '3px' }}>
                Profile Photo
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                {formData.avatar 
                  ? 'Custom photo active (synced to database).' 
                  : 'No photo selected. Using elegant gold initials badge (' + getInitials(formData.name) + ').'}
              </div>

              {/* Hidden file input for native device upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-gold btn-sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingPhoto}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  {isUploadingPhoto ? (
                    <>
                      <RefreshCw size={14} className="spin" />
                      <span>Compressing & Saving...</span>
                    </>
                  ) : (
                    <>
                      <Camera size={14} />
                      <span>Direct Upload Photo</span>
                    </>
                  )}
                </button>

                {formData.avatar && (
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={handleRemovePhoto}
                    style={{
                      background: '#fee2e2',
                      color: '#b91c1c',
                      border: '1px solid #fca5a5',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Trash2 size={14} />
                    <span>Remove Photo</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-gold-dark)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 6px'
                  }}
                >
                  <Link size={12} />
                  <span>{showUrlInput ? 'Hide URL' : 'Paste URL'}</span>
                </button>
              </div>

              {/* Optional URL Paste */}
              {showUrlInput && (
                <div style={{ marginTop: '0.6rem' }}>
                  <input
                    type="url"
                    className="form-input"
                    value={formData.avatar}
                    onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section: Basic Identity */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">
                <User size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Admin Full Name *
              </label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Sakthivel C"
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
                    placeholder="Enter password"
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
              ℹ️ Updating your username or password here directly updates your MongoDB Atlas credentials for immediate login.
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
            <label className="form-label">Bio & Signatory Note</label>
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
              {isSaving ? 'Saving to MongoDB Atlas...' : 'Update in MongoDB Atlas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
