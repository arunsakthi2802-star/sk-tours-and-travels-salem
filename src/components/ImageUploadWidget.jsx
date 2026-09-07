import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, RefreshCw, X, Link2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ImageUploadWidget({
  value = '',
  onChange,
  label = 'Hero Image',
  placeholder = 'https://images.unsplash.com/... or upload photo'
}) {
  const { uploadImage } = useApp();
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef(null);

  // Compress image on client canvas to reduce upload time & optimize MongoDB storage
  const compressImage = (file, maxWidth = 1400, quality = 0.82) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Output as JPEG or WebP data URL
          const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const compressedDataUrl = canvas.toDataURL(mimeType, quality);
          resolve(compressedDataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image file'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      // 1. Client-side instant compression
      const compressedBase64 = await compressImage(file);

      // 2. Upload to MongoDB Atlas Cloud API
      const uploadedUrl = await uploadImage(compressedBase64, file.name);

      if (uploadedUrl) {
        onChange(uploadedUrl);
        setUploadSuccess('Image successfully converted & hosted to Cloud URL!');
      } else {
        // Fallback: use direct data URL
        onChange(compressedBase64);
        setUploadSuccess('Image converted to direct high-res Data URL!');
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      setUploadError('Error processing image. Please try again or paste a direct URL.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
        <label className="form-label" style={{ margin: 0, fontWeight: 700 }}>
          {label}
        </label>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            style={{
              padding: '0.2rem 0.6rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'upload' ? 'var(--color-primary)' : 'var(--color-bg-base)',
              color: activeTab === 'upload' ? '#ffffff' : 'var(--color-text-muted)'
            }}
          >
            <UploadCloud size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            style={{
              padding: '0.2rem 0.6rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'url' ? 'var(--color-primary)' : 'var(--color-bg-base)',
              color: activeTab === 'url' ? '#ffffff' : 'var(--color-text-muted)'
            }}
          >
            <Link2 size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            Paste URL
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div>
          {/* Dropzone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: dragActive ? '2px dashed var(--color-gold)' : '2px dashed var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.2rem',
              textAlign: 'center',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              background: dragActive ? 'rgba(212, 175, 55, 0.05)' : '#fafafa',
              transition: 'all 0.2s ease'
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
              disabled={isUploading}
            />

            {isUploading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <RefreshCw size={24} color="#d4af37" className="animate-spin" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                  Optimizing & Converting to Cloud URL...
                </span>
              </div>
            ) : (
              <div>
                <UploadCloud size={28} color="#0b132b" style={{ margin: '0 auto 0.4rem', display: 'block' }} />
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  Click to select photo or drag & drop here
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Supports JPG, PNG, WebP • Auto-compressed & permanently hosted in MongoDB Atlas
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* URL Input */
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="form-input"
            style={{ paddingRight: '2.5rem' }}
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94a3b8'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {/* Upload Messages */}
      {uploadError && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#b91c1c', marginTop: '0.4rem' }}>
          <AlertCircle size={14} />
          <span>{uploadError}</span>
        </div>
      )}
      {uploadSuccess && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#15803d', marginTop: '0.4rem' }}>
          <CheckCircle size={14} />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Live Preview Box */}
      {value && (
        <div style={{
          marginTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.6rem',
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <img
            src={value}
            alt="Preview"
            style={{
              width: '80px',
              height: '56px',
              objectFit: 'cover',
              borderRadius: '6px',
              border: '1px solid var(--color-border)'
            }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80';
            }}
          />
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                background: value.startsWith('/api/images') ? '#dcfce7' : '#e0f2fe',
                color: value.startsWith('/api/images') ? '#15803d' : '#0284c7',
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px'
              }}>
                {value.startsWith('/api/images') ? '☁️ MongoDB Cloud Hosted' : '🔗 Web Image URL'}
              </span>
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--color-text-muted)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginTop: '3px'
            }}>
              {value}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              background: '#fee2e2',
              color: '#b91c1c',
              border: 'none',
              borderRadius: '6px',
              padding: '0.35rem 0.6rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
