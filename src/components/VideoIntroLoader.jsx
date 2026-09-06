import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import './VideoIntroLoader.css';

export default function VideoIntroLoader({ onComplete }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video playback automatically
    video.play().catch(err => {
      console.warn('Autoplay waiting for touch:', err.message);
    });
  }, []);

  const handleEnterWebsite = () => {
    if (isExiting) return;
    setIsExiting(true);
    const video = videoRef.current;
    if (video) video.pause();
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);
  };

  const toggleSound = (e) => {
    e.stopPropagation(); // Don't trigger enter on sound button click
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div
      className={`video-fullscreen-overlay ${isExiting ? 'video-fade-out' : ''}`}
      onClick={handleEnterWebsite}
      title="Click or tap anywhere to enter website"
    >
      {/* 100% Fullscreen Video - Edge to Edge without timer or lines */}
      <video
        ref={videoRef}
        src="/sk_intro.mp4"
        className="video-fullscreen-player"
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        onEnded={handleEnterWebsite}
        onError={(e) => {
          console.error('Video load error:', e);
          handleEnterWebsite();
        }}
      />

      {/* Floating Header Controls */}
      <div className="fullscreen-header-bar" onClick={(e) => e.stopPropagation()}>
        {/* Brand Logo & Title */}
        <div className="fullscreen-brand-pill" onClick={handleEnterWebsite}>
          <img
            src="/sk-logo.png"
            alt="SK Tours Logo"
            className="fullscreen-brand-logo"
            onError={(e) => { e.target.src = '/logo/sk logo.png'; }}
          />
          <div className="fullscreen-brand-text">
            <span className="fullscreen-brand-title">SK TOURS & TRAVELS</span>
            <span className="fullscreen-brand-sub">SALEM • LUXURY HOLIDAYS</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="fullscreen-action-group">
          {/* Sound Toggle */}
          <button
            type="button"
            className="fullscreen-glass-btn"
            onClick={toggleSound}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} color="#f3c64f" />}
            <span className="btn-text-desktop">{isMuted ? 'Muted' : 'Sound'}</span>
          </button>

          {/* Enter Website Button */}
          <button
            type="button"
            className="fullscreen-enter-btn"
            onClick={handleEnterWebsite}
            title="Enter website now"
          >
            <span>ENTER WEBSITE</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Touch / Click to Enter Hint */}
      <div className="fullscreen-touch-hint">
        <span>Tap anywhere to enter website</span>
      </div>
    </div>
  );
}
