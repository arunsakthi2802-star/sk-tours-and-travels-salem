import React, { useState, useEffect, useRef } from 'react';
import { 
  Plane, Compass, Globe, Sparkles, ChevronRight, 
  MapPin, Shield, Luggage, Navigation, ArrowRight
} from 'lucide-react';
import './AirplaneIntroLoader.css';

export default function AirplaneIntroLoader({ onComplete, isPageTransition = false }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [flightPhase, setFlightPhase] = useState('Preparing Flight Manifest');
  const [currentCity, setCurrentCity] = useState('Salem, India');
  const canvasRef = useRef(null);

  const CITIES = [
    { name: 'Salem Hub, Tamil Nadu', tag: 'Departure HQ', flag: '🇮🇳' },
    { name: 'Srinagar, Kashmir', tag: 'Paradise on Earth', flag: '🏔️' },
    { name: 'Manali & Kasol', tag: 'Himachal Highlands', flag: '❄️' },
    { name: 'Munnar & Alleppey', tag: 'Kerala Backwaters', flag: '🌴' },
    { name: 'Leh & Nubra Valley', tag: 'Roof of the World', flag: '🏍️' },
    { name: 'Jaipur & Udaipur', tag: 'Royal Rajasthan', flag: '🏰' },
    { name: 'Dubai & Singapore', tag: 'Global Metropolises', flag: '✨' },
    { name: 'Paris & Swiss Alps', tag: 'European Dreams', flag: '🗼' }
  ];

  // City rotation along flight path
  useEffect(() => {
    const cityIndex = Math.min(Math.floor((progress / 100) * CITIES.length), CITIES.length - 1);
    setCurrentCity(CITIES[cityIndex].name);

    if (progress < 25) {
      setFlightPhase('🛫 Flight SK-777 Boarding at Salem Hub');
    } else if (progress < 50) {
      setFlightPhase('🌍 Cruising Across Incredible India & Himalayas');
    } else if (progress < 75) {
      setFlightPhase('✨ Navigating 50+ Global Luxury Circuits');
    } else if (progress < 95) {
      setFlightPhase('🛬 Final Descent Cleared! Entering SK Tours Experience');
    } else {
      setFlightPhase('🎉 Welcome Aboard SK Tours & Travels Salem!');
    }
  }, [progress]);

  // Smooth progress ticker & auto-enter
  useEffect(() => {
    const totalDuration = isPageTransition ? 2200 : 5200; // 5.2s cinematic experience
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(currentPct);

      const remainingSecs = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));
      setCountdown(remainingSecs);

      if (currentPct >= 100) {
        clearInterval(interval);
        handleEnterWebsite();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isPageTransition]);

  const handleEnterWebsite = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  // Canvas Starfield, Flight Arcs & Floating Travel Clouds
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }));

    // Floating Clouds
    const clouds = Array.from({ length: 6 }, (_, i) => ({
      x: (canvas.width / 6) * i + Math.random() * 100,
      y: canvas.height * 0.25 + Math.random() * (canvas.height * 0.45),
      size: Math.random() * 80 + 70,
      speed: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.12 + 0.05
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Twinkling Stars
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.alpha) * 0.8})`;
        ctx.fill();
      });

      // 2. Draw Soft Travel Clouds drifting
      clouds.forEach(c => {
        c.x += c.speed;
        if (c.x > canvas.width + 150) c.x = -150;

        const grad = ctx.createRadialGradient(c.x, c.y, 10, c.x, c.y, c.size);
        grad.addColorStop(0, `rgba(224, 242, 254, ${c.opacity})`);
        grad.addColorStop(0.7, `rgba(56, 189, 248, ${c.opacity * 0.4})`);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // 3. Draw Golden Orbital Flight Arcs
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.45;
      const rx = Math.min(canvas.width * 0.44, 320);
      const ry = rx * 0.44;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-16 * (Math.PI / 180));

      // Golden outer ring
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([8, 8]);
      ctx.stroke();

      // Cyan inner glow ring
      ctx.beginPath();
      ctx.ellipse(0, 0, rx * 0.88, ry * 0.88, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 12]);
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`airplane-intro-overlay ${isExiting ? 'fade-out-warp' : ''}`}>
      {/* Background Motion Canvas (Stars, Clouds, Flight Arcs) */}
      <canvas ref={canvasRef} className="intro-canvas-backdrop" />

      {/* Atmospheric Color Auroras */}
      <div className="intro-aurora aurora-cyan" />
      <div className="intro-aurora aurora-gold" />

      {/* Top Telemetry & Control Bar */}
      <div className="intro-top-bar">
        <div className="telemetry-badge">
          <span className="live-radar-ping" />
          <div className="telemetry-details">
            <span className="telemetry-route">
              <span className="hub-tag">ORIGIN</span> <strong>SALEM (SXV)</strong> ➔ <span className="hub-tag">CURRENT</span> <strong>{currentCity}</strong>
            </span>
          </div>
        </div>

        {/* Enter Website Immediately CTA */}
        <button
          onClick={handleEnterWebsite}
          className="intro-enter-btn"
          title="Enter website now"
        >
          <span>ENTER WEBSITE</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Main Cinematic Video Stage */}
      <div className="travel-motion-stage">
        {/* Floating Travel Elements & Landmarks in Motion */}
        <div className="floating-landmarks-wrapper">
          {/* Paris Eiffel Tower Silhouette */}
          <div className="landmark-item landmark-eiffel" title="Paris">
            <span>🗼</span>
          </div>

          {/* Agra Taj Mahal Silhouette */}
          <div className="landmark-item landmark-taj" title="Taj Mahal, Agra">
            <span>🕌</span>
          </div>

          {/* Himalayan Peaks */}
          <div className="landmark-item landmark-mountain" title="Kashmir & Ladakh">
            <span>🏔️</span>
          </div>

          {/* Palm & Beach */}
          <div className="landmark-item landmark-palm" title="Kerala & Bali">
            <span>🌴</span>
          </div>

          {/* Floating Travel Luggage */}
          <div className="floating-travel-prop prop-luggage" title="Ready to Travel">
            <Luggage size={22} color="#f3c64f" />
          </div>

          {/* Floating Compass Rose */}
          <div className="floating-travel-prop prop-compass" title="Navigation">
            <Compass size={24} color="#38bdf8" />
          </div>
        </div>

        {/* 3D Illuminated Rotating Globe */}
        <div className="world-globe-assembly">
          {/* Outer Ethereal Atmosphere Halo */}
          <div className="globe-atmosphere-glow" />

          {/* Spherical Earth Body */}
          <div className="globe-sphere-body">
            {/* Rotating Continents Map Layer */}
            <div className="globe-continents-texture" />

            {/* Latitude & Longitude Coordinate Lines */}
            <div className="globe-lat-long-mesh" />

            {/* Sunlight Specular Rim & Night Terminator Shadow */}
            <div className="globe-specular-highlight" />
            <div className="globe-shadow-terminator" />

            {/* Salem Tamil Nadu Radar Beacon */}
            <div className="salem-origin-beacon">
              <div className="beacon-waves wave-1" />
              <div className="beacon-waves wave-2" />
              <div className="beacon-center-dot" />
              <div className="beacon-tooltip">
                <MapPin size={10} color="#d4af37" />
                <span>SALEM HUB</span>
              </div>
            </div>
          </div>

          {/* Dynamic 3D Airplane Flight Orbit */}
          <div className="airplane-3d-orbit">
            <div className="airplane-flying-unit">
              {/* Dual Contrail Jet Streams */}
              <div className="contrail-stream stream-left" />
              <div className="contrail-stream stream-right" />

              {/* High-Detail Jet Airliner SVG */}
              <svg
                viewBox="0 0 120 120"
                className="airliner-motion-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="45%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                  <linearGradient id="goldDecal" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <filter id="engineGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Main Wings with Sweepback */}
                <path
                  d="M 60 52 L 8 82 L 13 88 L 60 67 L 107 88 L 112 82 Z"
                  fill="url(#bodyGradient)"
                  stroke="#64748b"
                  strokeWidth="0.8"
                />

                {/* Winglets Gold Trim */}
                <path d="M 8 82 L 4 75 L 11 78 Z" fill="url(#goldDecal)" />
                <path d="M 112 82 L 116 75 L 109 78 Z" fill="url(#goldDecal)" />

                {/* Tail Stabilizers */}
                <path
                  d="M 60 92 L 36 106 L 39 110 L 60 102 L 81 110 L 84 106 Z"
                  fill="url(#bodyGradient)"
                />

                {/* Vertical Tail Fin */}
                <path d="M 58 84 L 60 74 L 62 84 Z" fill="url(#goldDecal)" />

                {/* Main Fuselage */}
                <ellipse cx="60" cy="60" rx="8" ry="46" fill="url(#bodyGradient)" />

                {/* Gold Speed Racing Stripe */}
                <path d="M 58.5 22 L 61.5 22 L 61.5 98 L 58.5 98 Z" fill="url(#goldDecal)" />

                {/* Cockpit Windshield */}
                <path d="M 56 20 Q 60 15 64 20 L 64 25 Q 60 22 56 25 Z" fill="#0f172a" />

                {/* Jet Engines with Cyan Afterburner Flare */}
                <rect x="38" y="70" width="7" height="15" rx="3.5" fill="#334155" />
                <rect x="75" y="70" width="7" height="15" rx="3.5" fill="#334155" />
                
                {/* Engine Flame Glow */}
                <circle cx="41.5" cy="87" r="3.5" fill="#38bdf8" filter="url(#engineGlow)" />
                <circle cx="78.5" cy="87" r="3.5" fill="#38bdf8" filter="url(#engineGlow)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand Shield & Official Logo Presentation */}
        <div className="travel-brand-presentation">
          <div className="brand-logo-pod">
            <div className="pod-gold-ring" />
            <img
              src="/sk-logo.png"
              alt="SK Tours & Travels Salem Logo"
              className="brand-logo-graphic"
              onError={(e) => { e.target.src = '/logo/sk logo.png'; }}
            />
          </div>

          <div className="brand-text-block">
            <h1 className="brand-cinematic-title">
              <span className="brand-name-gold">SK TOURS & TRAVELS</span>
              <span className="brand-salem-tag">SALEM</span>
            </h1>
            <p className="brand-cinematic-subtitle">
              Your Gateway from Salem to World Horizons, Group & Luxury Tours
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Flight Dashboard & Progress Deck */}
      <div className="flight-progress-deck">
        <div className="flight-status-row">
          <div className="flight-phase-indicator">
            <Plane size={15} className="airplane-pulse-icon" />
            <span className="flight-phase-text">{flightPhase}</span>
          </div>

          <div className="flight-pct-counter">
            <span className="pct-num">{progress}%</span>
            <span className="auto-enter-note">
              {countdown > 0 ? `Auto-entering in ${countdown}s` : 'Entering website...'}
            </span>
          </div>
        </div>

        {/* Dynamic Flight Progress Track */}
        <div className="progress-runway-track">
          <div
            className="progress-runway-fill"
            style={{ width: `${progress}%` }}
          >
            <div className="runway-jet-nose">
              <Plane size={14} fill="#ffffff" color="#ffffff" />
            </div>
          </div>
        </div>

        {/* Global Hubs Flight Boarding Strip */}
        <div className="flight-board-strip">
          <span className="board-hub active">📍 SALEM</span>
          <span className="board-sep">➔</span>
          <span className="board-hub">KASHMIR</span>
          <span className="board-sep">➔</span>
          <span className="board-hub">MANALI</span>
          <span className="board-sep">➔</span>
          <span className="board-hub">KERALA</span>
          <span className="board-sep">➔</span>
          <span className="board-hub">LADAKH</span>
          <span className="board-sep">➔</span>
          <span className="board-hub">DUBAI</span>
          <span className="board-sep">➔</span>
          <span className="board-hub">WORLD</span>
        </div>
      </div>
    </div>
  );
}
